import { Router } from "express";
import UserController from "../controllers/UserController.js";

const userRoutes = Router();

userRoutes.post('/register', UserController.Register);
userRoutes.post('/login', UserController.Login);

export default userRoutes;