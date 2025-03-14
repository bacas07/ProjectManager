import { Schema, Document, model } from "mongoose";

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: "admin" | "user" | "dev";
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 50,
        match: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/ // No se como funciona JAJAJA
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 150
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user", "dev"]
    }
}, {
    timestamps: true
});

const User = model<IUser>("User", userSchema);

export default User;
