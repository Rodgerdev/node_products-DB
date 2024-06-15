import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import ejs from 'ejs';

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const config = {
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
};

function createTransporter(config: any) {
    return nodemailer.createTransport(config);
}

export async function sendEmail(to: string, subject: string, templateName: string, context: any) {
    const transporter = createTransporter(config);
    await transporter.verify();

    ejs.renderFile(path.resolve(__dirname, `../../Templates/${templateName}.ejs`), context, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const messageOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            html: data
        };

        transporter.sendMail(messageOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    });
}
