import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import { makeRequestTMDB } from "../utils/request.js";
import { Types } from "mongoose";
import User from "../models/UserModel.js";
import Uuid from "../models/UuidModel.js";

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

const updateUserProfile = async (req, res) => {
    try {
        const profile_picture = req.files?.profile_picture?.[0].filename;
        const cover_image = req.files?.cover_image?.[0].filename;
        const { name, bio, user_name } = req.body;

        const user = await User.findById(req.user._id)
            .select('email user_name name profile_picture cover_image bio');

        if (profile_picture)
            user.profile_picture = profile_picture;

        if (cover_image)
            user.cover_image = cover_image;

        if (name !== user.name)
            user.name = name;

        if (bio !== undefined && bio !== user.bio)
            user.bio = bio;

        if (user_name !== user.user_name)
            user.user_name = user_name;

        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: ['Ocorreu um erro inesperado no servidor, tente novamente mais tarde!'] });
    }
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
    const user = await User.findById(req.user._id)
        .select('friends friends_requests');

    const users = await User.find()
        .where('_id').ne(user._id) // avoid getting the same user
        .nin(user.friends.concat(user.friend_requests)) // avoid bringing users added or who sent requests
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
    try {
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
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: ['Ocorreu um erro inesperado no servidor, tente novamente mais tarde!'] });
    }
}

const updateFavoriteMovies = async (req, res) => {
    try {
        const { id_movie, action } = req.body;

        if (action === 'add') {
            const dataMovie = await makeRequestTMDB('/movie/' + id_movie);
            const isInvalidId = !id_movie || (dataMovie?.id !== id_movie);

            if (isInvalidId)
                return res.status(422).json({ errors: ['ID do filme inválido.'] });

            const user = await User.findById(req.user._id);

            if (user.favorite_movies.includes(id_movie))
                return res.status(422).json({ errors: ['Filme já adicionado aos favoritos.'] });

            user.favorite_movies.push(id_movie);
            await user.save();
            return res.status(200).json({ favorite_movies: user.favorite_movies });
        }

        if (action === 'delete') {
            const favorite_movies = req.user.favorite_movies;

            if (!favorite_movies.includes(id_movie))
                return res.status(404).json({ errors: ['O ID do filme não foi encontrado na lista de favoritos.'] });

            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                { $pull: { favorite_movies: id_movie } },
                { new: true }
            );
            return res.status(200).json({ favorite_movies: updatedUser.favorite_movies });
        }

        return res.status(422).json({ errors: ['A ação não foi definida corretamente'] });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: ['Ocorreu um erro inesperado no servidor, tente novamente mais tarde!'] });
    }
}

const sendFriendRequest = async (req, res) => {
    try {
        const user_id = req.user._id;
        const { id_recipient_user } = req.body;
        const isInvalidId = !isValidObjectId(id_recipient_user) || id_recipient_user === user_id.toString();

        if (isInvalidId)
            return res.status(400).json({ errors: ['Não foi possível completar a requisição.'] });

        const recipientUser = await User.findById(id_recipient_user);

        if (!recipientUser)
            return res.status(422).json({ errors: ['Usuário não foi encontrado.'] });

        const requestAlreadySent = recipientUser.friends.includes(user_id) || recipientUser.friend_requests.includes(user_id) || recipientUser.friend_requests_sent.includes(user_id);

        if (requestAlreadySent)
            return res.status(422).json({ errors: ['Não é possível realizar a solicitação duas vezes.'] });

        const user = await User.findById(user_id);
        user.friend_requests_sent.push(recipientUser._id);
        recipientUser.friend_requests.push(user._id);
        await user.save();
        await recipientUser.save();

        return res.status(200).json({
            friends: user.friends,
            friend_requests: user.friend_requests,
            friend_requests_sent: user.friend_requests_sent
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: ['Ocorreu um erro inesperado no servidor, tente novamente mais tarde!'] });
    }
}

const acceptFriendRequest = async (req, res) => {
    try {
        const friend_requests = req.user.friend_requests;
        const { id_user_request } = req.body;

        if (!friend_requests.includes(id_user_request))
            return res.status(400).json({ errors: ['ID enviado não corresponde com as solicitações de amizade.'] });

        const user = await User.findById(req.user._id);
        const userWithRequest = await User.findById(id_user_request);
        // removes user id received from friend requests and add to friends array
        user.friend_requests = friend_requests.filter(id => id.toString() !== userWithRequest._id.toString());
        user.friends.push(userWithRequest._id);
        // removes the current user id from the sent friend requests array and adds it to the friends array
        userWithRequest.friend_requests_sent = userWithRequest.friend_requests_sent.filter(id => id.toString() !== user._id.toString())
        userWithRequest.friends.push(user._id);
        // salve the changes
        await user.save()
        await userWithRequest.save();

        return res.status(200).json({
            friends: user.friends,
            friend_requests: user.friend_requests,
            friend_requests_sent: user.friend_requests_sent
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: ['Ocorreu um erro inesperado no servidor, tente novamente mais tarde!'] });
    }
}

const rejectFriendRequest = async (req, res) => {
    try {
        const friend_requests = req.user.friend_requests;
        const { id_user_request } = req.body;

        if (!friend_requests.includes(id_user_request))
            return res.status(400).json({ errors: ['ID enviado não corresponde com as solicitações de amizade.'] });

        const user = await User.findById(req.user._id);
        const userWithRequest = await User.findById(id_user_request);
        // removes user id received from friend requests array
        user.friend_requests = friend_requests.filter(id => id.toString() !== userWithRequest._id.toString());
        userWithRequest.friend_requests_sent = userWithRequest.friend_requests_sent.filter(id => id.toString() !== user._id.toString());
        // save the changes
        await user.save();
        await userWithRequest.save();

        return res.status(200).json({
            friends: user.friends,
            friend_requests: user.friend_requests,
            friend_requests_sent: user.friend_requests_sent
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: ['Ocorreu um erro inesperado no servidor, tente novamente mais tarde!'] });
    }
}

const UserController = {
    Register,
    Login,
    getCurrentProfile,
    updateUserProfile,
    getUserFriends,
    getUsers,
    getUserById,
    getFavoriteMovies,
    updateFavoriteMovies,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest
};

export default UserController;
