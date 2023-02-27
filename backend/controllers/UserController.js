import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import User from "../models/UserModel.js";
import Uuid from "../models/UuidModel.js";
import { Types } from "mongoose";

const turnIntoHash = data => bcrypt.hashSync(data, bcrypt.genSaltSync())

const isValidObjectId = id => Types.ObjectId.isValid(id) ? (String)(new Types.ObjectId(id)) === id : false

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
            password: turnIntoHash(password)
        });

        await Uuid.create({ _id_user: newUser._id })

        const userData = {
            _id: newUser._id,
            email: newUser.email,
            user_name: newUser.user_name,
            name: newUser.name,
            profile_picture: newUser.profile_picture,
            cover_image: newUser.cover_image,
            bio: newUser.bio
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
            cover_image: user.cover_image,
            bio: user.bio
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

const getCurrentProfile = async (req, res) => {
    const user = req.user;
    return res.status(200).json(user);
}

const getUserFriends = async (req, res) => {
    const user = req.user;
    const friends = {
        friends: user.friends,
        friend_requests: user.friend_requests,
        friend_requests_sent: user.friend_requests_sent
    }
    return res.status(200).json(friends);
}

const getUsers = async (req, res) => {
    const users = await User.find()
        .where('_id').ne(req.user._id) // avoid getting the same user
        .nin(req.user.friends.concat(req.user.friend_requests)) // avoid bringing users added or who sent requests
        .sort({ createdAt: 'descending' }) // sort the query by newest
        .select('name user_name bio profile_picture cover_image')
        .exec()

    return res.status(200).json(users);
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const isInvalidId = !isValidObjectId(id);

        if (isInvalidId)
            return res.status(400).json({ errors: ['Não foi possível completar a requisição.'] });

        const userProfile = await User.findById(id)
            .select('email user_name name profile_picture cover_image bio');
        return res.status(200).json(userProfile);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: ['Ocorreu um erro inesperado no servidor, tente novamente mais tarde!'] });
    }
}

const getFavoriteMovies = async (req, res) => {
    const { id } = req.params;
    const page = Number(req.query.page || 1);
    const isInvalidPage = isNaN(page);
    const isInvalidId = !isValidObjectId(id);

    if (isInvalidId || isInvalidPage)
        return res.status(400).json({ errors: ['Não foi possível completar a requisição.'] });

    const { favorite_movies } = await User.findById(id).select('favorite_movies');

    if (!favorite_movies)
        return res.status(400).json({ errors: ['Não foi possível completar a requisição.'] });

    const indicePage = (page === 1 ? 0 : (page - 1) * 10);
    const movies = favorite_movies.slice(indicePage, indicePage + 10);
    return res.status(200).json({ movies, page });
}

const UserController = {
    Register,
    Login,
    getCurrentProfile,
    getUserFriends,
    getUsers,
    getUserById,
    getFavoriteMovies
};

export default UserController;
