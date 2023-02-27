import { Schema, model } from "mongoose";

const UserModel = new Schema(
    {
        name: String,
        user_name: String,
        email: String,
        password: String,
        bio: {
            type: String,
            default: ''
        },
        profile_picture: {
            type: String,
            default: ''
        },
        cover_image: {
            type: String,
            default: ''
        },
        friends: Array,
        friend_requests: Array,
        friend_requests_sent: Array,
        favorite_movies: Array
    },
    { timestamps: true }
);

const User = model('User', UserModel);

export default User;