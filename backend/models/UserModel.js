import { Schema, model } from "mongoose";

const UserModel = new Schema(
    {
        name: String,
        user_name: String,
        email: String,
        password: String,
        profile_picture: String,
        cover_image: String,
        friends: Array,
        friend_requests: Array,
        friend_requests_sent: Array,
        favorite_movies: Array
    },
    { timestamps: true }
);

const User = model('User', UserModel);

export default User;