import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;