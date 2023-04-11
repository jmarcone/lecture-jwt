import Jwt from "jsonwebtoken";
import AuthUser from "../models/AuthUser.js";

const verifyJWTToken = async (req, res, next) => {
    const { headers: { authorization } } = req;
    // console.log(authorization);
    if(!authorization)
        res.status(401).json({error: "please login"})

    const token = authorization.split(" ")[1];
    // console.log(token);

    const {_id} = await Jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await AuthUser.findById(_id);
    if(!user)
        next("User does not exist");
    
    req.user = user;

    next();
}

export default verifyJWTToken;