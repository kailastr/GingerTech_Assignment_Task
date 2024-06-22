import express from "express";
import bcrypt from 'bcrypt';

//model
import User from "../../model/user.model.js";

//jwt generating fn
import generateJWTandSetCookies from "../../utils/generatToken.js";

const router = express.Router();

/*
Route : /user/signup
Method : POST
Description : Create new user
Access : Public
Parameter : none
*/
router.post('/signup', async (req, res) => {
    // console.log("signUp route");
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password doesn't match" });
        }

        const user = await User.findOne({ userName });

        if (user) {
            return res.status(400).json({ error: "User already exist with this username" });
        }

        //hash password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //gender specific profile avatar
        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? maleProfilePic : femaleProfilePic,
        });

        if (newUser) {

            generateJWTandSetCookies(newUser.id, res);

            await newUser.save();

            return res.status(200).json({
                _id: newUser.id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic,
            });
        }

    } catch (error) {
        console.log("SignUp Route error : ", error.message);
        res.status(400).json({ error: error.message });
    }
});

/*
Route : /user/signin
Method : POST
Description : Authenticate user login
Access : Public
Parameter : none
*/
router.post('/signin', async (req, res) => {
    // console.log("signIn route");
    try {
        const { userName, password } = req.body;

        const validUser = await User.findOne({ userName });
        const isPasswordValid = await bcrypt.compare(password, validUser?.password || "");

        if (!validUser) {
            return res.status(400).json({ error: "Invalid UserName " });
        }

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid UserName " });
        }

        return res.status(200).json({
            _id: validUser._id,
            fullName: validUser.fullName,
            userName: validUser.userName,
            profilePic: validUser.profilePic
        });

    } catch (error) {
        console.log("SignIn error : ", error.message);
        return res.status(400).json({ error: error.message });
    }
});

/*
Route : /user/logout
Method : POST
Description : User logout
Access : Public
Parameter : none
*/
router.post('/logout', async (req, res) => {
    try {

        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.log("Logout error : ", error.message);
        return res.status(400).json({ error: error.message });
    }
});

export default router;