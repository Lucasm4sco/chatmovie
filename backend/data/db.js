import mongoose from 'mongoose';
import { config } from 'dotenv';

config();
mongoose.set("strictQuery", false);

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const connectionDB = async () => {
    try {
        const conn = await mongoose
            .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@moviechat.dncvz92.mongodb.net/moviechat?retryWrites=true&w=majority`)
            .then(() => {
                console.log('Conectou ao banco!')
            });

        return conn;
    } catch (error) {
        console.log(error.message);
    }
}

export default connectionDB;