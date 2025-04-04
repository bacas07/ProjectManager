import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'dev';
  status: boolean;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
      maxlength: 50,
      match: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, // No se como funciona JAJAJA
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 150,
    },
    role: {
      type: String,
      required: false,
      enum: ['admin', 'user', 'dev'],
      default: 'user',
    },
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);

export default User;
