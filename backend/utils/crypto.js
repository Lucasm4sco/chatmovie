import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const JWT_KEY = process.env.JWT_KEY;

export const generateToken = (data) => {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 10), // 10 days
        data
      }, JWT_KEY);
    return token
}