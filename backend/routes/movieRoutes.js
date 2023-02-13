import { Router } from "express";
import MovieController from "../controllers/MovieController.js";

const movieRoutes = Router();

movieRoutes.get('/', MovieController.getMoviesHome);

export default movieRoutes;