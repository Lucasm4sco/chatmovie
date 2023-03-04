import { validationResult } from "express-validator";
import fs from 'fs/promises';

const handleValidations = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (errors.isEmpty())
            return next();

        if (req.files?.profile_picture)
            await fs.unlink(req.files.profile_picture?.[0]?.path)

        if (req.files?.cover_image)
            await fs.unlink(req.files.cover_image?.[0]?.path)

        const errorMessages = errors.array().map(({ msg }) => msg);
        return res.status(422).json({ errors: errorMessages });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ errors: ['Ocorreu um erro inesperado no servidor, tente novamente mais tarde!'] });
    }
}

export default handleValidations