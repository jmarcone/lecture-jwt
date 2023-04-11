import Jwt from "jsonwebtoken";

const verifyJWTToken = (req, res, next) => {
    const { headers: { authorization } } = req;
    // console.log(authorization);
    if(!authorization)
        res.status(401).json({error: "please login"})


    const token = authorization.split(" ")[1];
    // console.log(token);

    const payload = Jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload)
    
    //now I would load the user from DB usign _id that was on the payload
    const userLoadedFromDB = {
        name: "my user name from DB",
        _id: payload._id
    }
    req.user = userLoadedFromDB

    next();
}

export default verifyJWTToken;