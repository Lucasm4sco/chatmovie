import { Router } from "express";
import { createUserValidation, loginValidations, updateUserValidations } from "../middlewares/UserValidations.js";
import UserController from "../controllers/UserController.js";
import handleValidations from "../middlewares/handleValidations.js";
import imageUploadValidation from "../middlewares/imageUpload.js";
import authGuard from "../middlewares/authGuard.js";

const userRoutes = Router();

userRoutes.get('/', authGuard, UserController.getUsers);
userRoutes.get('/profile', authGuard, UserController.getCurrentProfile);
userRoutes.get('/friends', authGuard, UserController.getUserFriends);
userRoutes.get('/:id', authGuard, UserController.getUserById);
userRoutes.get('/:id/movies', authGuard, UserController.getFavoriteMovies);

userRoutes.post('/register', createUserValidation(), handleValidations, UserController.Register);
userRoutes.post('/login', loginValidations(), handleValidations, UserController.Login);
userRoutes.post('/friends', authGuard, UserController.sendFriendRequest);
userRoutes.post('/friends/accept', authGuard, UserController.acceptFriendRequest);
userRoutes.post('/friends/reject', authGuard, UserController.rejectFriendRequest);

userRoutes.put('/profile', authGuard, imageUploadValidation, UserController.updateUserProfile);

userRoutes.patch('/movies', authGuard, UserController.updateFavoriteMovies);

export default userRoutes;