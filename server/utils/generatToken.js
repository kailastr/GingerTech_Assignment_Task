import jwt from "jsonwebtoken";

const generateJWTandSetCookies = (userId, res) => {
    //create jwt which expires in 15days
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
};

export default generateJWTandSetCookies;