import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import bcrypt from 'bcrypt';
import mssql from 'mssql';
import { poolPromise } from '../Config';
import { User } from '../Models/authModels';
import { generateToken } from '../Helpers';
import { sendEmail } from '../nodemailer';
import Joi from 'joi';

const userSchema = Joi.object({
    Email: Joi.string().email().required(),
    Name: Joi.string().required(),
    Password: Joi.string().min(6).required(),
});

export const register = async (req: Request, res: Response) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const { Email, Name, Password } = req.body;
    const Id = uid();
    const hashedPassword = await bcrypt.hash(Password, 10);

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('Id', mssql.VarChar, Id)
            .input('Email', mssql.VarChar, Email)
            .input('Name', mssql.VarChar, Name)
            .input('Password', mssql.VarChar, hashedPassword)
            .execute('addUser');

        const token = generateToken({ Sub: Id, Name });

        // Send welcome email
        sendEmail(Email, "Welcome to T2G Library", "register", { name: Name });

        res.status(201).send({ message: 'User registered successfully', token });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const login = async (req: Request, res: Response) => {
    const { Email, Password } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Email', mssql.VarChar, Email)
            .execute('getUser');

        const user: User = result.recordset[0];
        if (!user) return res.status(404).send({ message: 'User not found' });

        const validPassword = await bcrypt.compare(Password, user.Password);
        if (!validPassword) return res.status(401).send({ message: 'Invalid password' });

        const token = generateToken({ Sub: user.Id, Name: user.Name });

        res.status(200).send({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const getUser = async (req: Request, res: Response) => {
    const { Email } = req.params;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Email', mssql.VarChar, Email)
            .execute('getUser');

        const user: User = result.recordset[0];
        if (!user) return res.status(404).send({ message: 'User not found' });

        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ error: err });
    }
};
