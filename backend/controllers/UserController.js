import bcrypt from "bcrypt";
import { generateToken } from "../utils/crypto.js";
import User from "../models/UserModel.js";

const turnIntoHash = (data) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(data, salt);
    return hash;
}

const Register = async (req, res) => {
    const { name, user_name, email, password } = req.body;

    try {
        const isUserRegistered = await User.findOne(
            {
                $or: [{ email }, { user_name }]
            },
            {
                email: 1, user_name: 1
            }
        );

        if (isUserRegistered?.email === email)
            return res.status(500).json({ errors: ['Não é possível usar esse e-mail, por favor tente com outro!'] });

        if (isUserRegistered?.user_name === user_name)
            return res.status(400).json({ errors: ['Nome de usuário já cadastrado, tente outro!'] });

        const newUser = await User.create({
            name,
            user_name,
            email,
            password: turnIntoHash(password),
            profile_picture: '',
            cover_image: ''
        });

        const userData = {
            _id: newUser._id,
            email: newUser.email,
            user_name: newUser.user_name,
            name: newUser.name,
            profile_picture: newUser.profile_picture,
            cover_image: newUser.cover_image
        }

        return res.status(201).json({
            user: userData,
            token: generateToken(userData)
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: ['Ocorreu um erro inesperado no servidor, tente novamente mais tarde!'] });
    }
}

const Login = async (req, res) => {
    const { login, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email: login }, { user_name: login }] });

        if (!user)
            return res.status(403).json({ errors: ['Credenciais enviadas são incorretas!'] });

        const isPasswordCorrect = bcrypt.compare(password, user.password);

        if (!isPasswordCorrect)
            return res.status(403).json({ errors: ['senha Credenciais enviadas são incorretas!'] });

        const userData = {
            _id: user._id,
            email: user.email,
            user_name: user.user_name,
            name: user.name,
            profile_picture: user.profile_picture,
            cover_image: user.cover_image
        }

        return res.status(200).json({
            user: userData,
            token: generateToken(userData)
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: ['Ocorreu um erro inesperado no servidor, tente novamente mais tarde!'] });
    }
}

const UserController = {
    Register,
    Login
};

export default UserController;
