import Jwt from "jsonwebtoken";
import AuthUser from "../models/AuthUser.js";
import bcrypt from "bcrypt";

const saltRounds = Number(process.env?.SALT_ROUNDS) || 10;

export const OldSignInUser = (req, res) => {
    //let us pretend that we validated user credentials and get the _id from DB
    const user = {
        _id: "123456789",
        here: "anything you want"
    }

    const token = Jwt.sign(user, process.env.JWT_SECRET);

    res.json(token);
}

export const signInUser = async (req, res) => {
    //GEt credentials from JSON body
    const { body: { email, password } } = req;
    //check if the user exists
    const user = await AuthUser.findOne({ email: email }).select("+password");
    if (!user)
        return res.json({ error: "User not registered" });

    //hash the password and compare
    const match = bcrypt.compare(password, user.password);
    if (!match)
        return res.json({ error: "wrong password!" });

    //sign a token with the user _id
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    //return the token
    res.json(token);
}

export const signUpUser = async (req, res) => {
    //Get JSON body
    const { body: { email, password, name } } = req;

    //check if email exist in db
    const exists = await AuthUser.exists({
        email: email
    })

    if (exists)
        return res.json({ error: "email exists in DB" })
    //hash password
    const hash = await bcrypt.hash(password, saltRounds);

    //create new user on DB
    const { _id } = await AuthUser.create({ name, email, password: hash })

    //sign a token with user Id
    const token = Jwt.sign({ id: _id }, process.env.JWT_SECRET)

    //return token
    res
        .status(201)
        .json(token);
}

export const getUser = (req, res) => {
    //this route is guarded by our verify token middleware

    //return user
    res.json(req.user);
}