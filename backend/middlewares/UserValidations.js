import { body } from 'express-validator';

export const createUserValidation = () => {
    return [
        body('name')
            .isString()
            .withMessage('Defina um nome válido!')
            .trim()
            .isLength({ min: 5 })
            .withMessage('Defina um nome válido!'),
        body('user_name')
            .isString()
            .withMessage('Defina um username válido!')
            .trim()
            .isLength({ min: 5, max: 25 })
            .withMessage('O username definido precisa ter entre 5 e 25 caracteres.'),
        body('email')
            .isEmail()
            .trim()
            .withMessage('Defina um email válido!'),
        body('password')
            .isString()
            .withMessage('Defina uma senha válida!')
            .isLength({ min: 6 })
            .withMessage('A senha precisa ter no mínimo 6 caracteres.'),
        body('confirm_password')
            .isString()
            .withMessage('As senhas precisam ser iguais!')
            .custom((value, { req }) => {
                if (req.body.password !== value)
                    throw new Error('As senhas precisam ser iguais!');

                return true
            })
    ]
}

export const loginValidations = () => {
    return [
        body('login')
            .isString()
            .withMessage('Defina um Login válido!')
            .trim()
            .isLength({ min: 4 })
            .withMessage('Defina um Login válido!'),

        body('password')
            .isString()
            .withMessage('Defina uma senha válida!')
            .isLength({ min: 6 })
            .withMessage('A senha precisa ter no mínimo 6 caracteres. aaaaaaaaaaaaaaaaaaaaa')
    ]
}