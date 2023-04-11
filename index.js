import Express from "express";
// import authRouter from "./routes/authRouter.js";
import JWTRoutes from "./routes/JWTRoutes.js";
import verifyJWTToken from "./middlewares/verifyJWTToken.js";
import morgan from "morgan";
import "./db/mongooseClient.js"

const app = Express();

if(process.env.NODE_ENV !== "prod"){
    app.use(morgan('dev'));
}

app.use(Express.json());
// app.use("/auth", authRouter);
app.use("/jwt", JWTRoutes);


app.get("*", verifyJWTToken, (req, res) => {
    res.json({ message: `hello ${req.user.name} welcome back` });
})

app.listen(3030, () => {
    console.log("Server running on 3030");
})