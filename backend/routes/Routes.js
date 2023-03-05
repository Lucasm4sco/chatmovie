import { Router } from "express";
import userRoutes from "./userRoutes.js";

const router = Router();

router.get('/', (req, res) => res.send('API Working'));

router.use('/api/users', userRoutes);

export default router;