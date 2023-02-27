import User from "../models/UserModel.js"
import { verifyToken } from "../utils/token.js";

const authGuard = async (req, res, next) => {
    try {
        const authorization = req.header('Authorization');
        const token = authorization?.split(' ')[1];

        if (!token)
            return res.status(401).json({ errors: ['Acesso negado!'] });

        const userId = verifyToken(token).data._id;
        req.user = await User.findById(userId)
            .select('email user_name name profile_picture cover_image bio');
        next();
    } catch (error) {
        return res.status(401).json({ errors: ['Token inválido.'] });
    }
    
}

export default authGuard;