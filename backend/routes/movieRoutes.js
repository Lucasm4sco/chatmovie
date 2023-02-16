import { Router } from "express";
import MovieController from "../controllers/MovieController.js";

const movieRoutes = Router();

movieRoutes.get('/', MovieController.getMoviesHome);
movieRoutes.get('/:id', MovieController.getDetailsMovie);
movieRoutes.get('/:id/recommendations', MovieController.getRecommendedMovies);

export default movieRoutes;