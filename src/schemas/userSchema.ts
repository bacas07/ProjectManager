import { Schema, Document, model } from "mongoose";

interface IUSer extends Document {
    username: string,
    email: string,
    password: string,
    role: 'admin' | 'user' | 'dev',
};

const userSchema = new Schema<IUSer>({
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 150
    },
    role: {
        type: String,
        enum: [
            'admin',
            'user',
            'dev'
        ]
    }
}, {
    timestamps: true
});

const User = model<IUSer>('User', userSchema);

export default User;