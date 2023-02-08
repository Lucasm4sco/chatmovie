import { Router } from "express";
import userRoutes from "./userRoutes.js";
import movieRoutes from "./movieRoutes.js";

const router = Router();

router.get('/', (req, res) => res.send('API Working'));

router.use('/api/users', userRoutes);
router.use('/api/movies', movieRoutes);

export default router;