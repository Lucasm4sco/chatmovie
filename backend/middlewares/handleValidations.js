import { validationResult } from "express-validator";

const handleValidations = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty())
        return next();

    const errorMessages = errors.array().map(({ msg }) => msg);
    return res.status(422).json({ errors: errorMessages });
}

export default handleValidations