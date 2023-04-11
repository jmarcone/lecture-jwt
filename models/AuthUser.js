import mongoose from "mongoose";
const { Schema, model } = mongoose

const AuthUserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"]
    },
    password: {
        type: String,
        required: [true, "PAssword is required!"],
        select: false
    },
});

export default model("AuthUser", AuthUserSchema);