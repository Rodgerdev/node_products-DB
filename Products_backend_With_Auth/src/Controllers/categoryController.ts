import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import mssql from 'mssql';
import { poolPromise } from '../Config';
import { Category } from '../Models/category';

export const addCategory = async (req: Request, res: Response) => {
    try {
      const pool = await poolPromise;
      const { Name } = req.body;
      const Id = uid();
      await pool.request()
        .input('Id', mssql.VarChar, Id)
        .input('Name', mssql.VarChar, Name)
        .execute('addCategory');
      res.status(201).json({ message: 'Category created successfully', category: { Id, Name } });
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getCategories = async (req: Request, res: Response) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().execute('getCategories');
      res.status(200).json(result.recordset);
    } catch (err) {
    //   const error = err as Error;
      res.status(500).json({ error: err });
    }
  };
