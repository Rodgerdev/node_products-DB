import express from 'express';
import { register, login, getUser } from '../Controllers/authController';
import { verifyToken } from '../Middlewares';

const router = express.Router();

router.post('', register);
router.post('', login);
router.get('/user/:Email', verifyToken, getUser);

export default router;
