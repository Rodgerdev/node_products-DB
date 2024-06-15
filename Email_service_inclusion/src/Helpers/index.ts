import jwt from 'jsonwebtoken';

export const generateToken = (payload: any): string => {
    return jwt.sign(payload, process.env.SECRET as string, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, process.env.SECRET as string);
};
