import express from "express";

const router = express.Router();

router.post('/signin', (req, res) => {
    console.log("signIn route");
});

router.post('/signup', (req, res) => {
    console.log("signUp route");
});

export default router;