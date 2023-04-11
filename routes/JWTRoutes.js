import { Router } from "express";

import { signInUser, getUser, signUpUser } from "../controller/JWTController.js";
import verifyJWTToken from "../middlewares/verifyJWTToken.js";

const JWTRoutes = Router();

JWTRoutes.post("/signup", signUpUser)
JWTRoutes.post("/signin", signInUser)
JWTRoutes.get("/me", verifyJWTToken, getUser)



export default JWTRoutes;