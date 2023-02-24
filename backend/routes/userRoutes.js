import { Router } from "express";
import { createUserValidation, loginValidations } from "../middlewares/UserValidations.js";
import UserController from "../controllers/UserController.js";
import handleValidations from "../middlewares/handleValidations.js";
import authGuard from "../middlewares/authGuard.js";

const userRoutes = Router();

userRoutes.get('/profile', authGuard, UserController.CurrentProfile);

userRoutes.post('/register', createUserValidation(), handleValidations, UserController.Register);
userRoutes.post('/login', loginValidations(), handleValidations, UserController.Login);

export default userRoutes;