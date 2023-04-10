import User from "../models/UserModel.js";
import { verifyToken } from "../utils/token.js";
import { CustomErrors } from "../utils/errors.js";

export const getAuthenticateUser = async (authorization) => {
    try {
        const token = authorization?.split(' ')[1];

        if (!token)
            throw new CustomErrors('Acesso negado!', 401);

        const userId = verifyToken(token).data._id;
        const user = await User.findById(userId)
            .select('email user_name name profile_picture cover_image bio');

        if (!user)
            throw new CustomErrors('Usuário não encontrado!', 400);

        return user;
    } catch (error) {
        if (error instanceof CustomErrors)
            return error

        return new CustomErrors('Token inválido!', 401);
    }
}