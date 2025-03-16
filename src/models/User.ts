import { error } from "console";
import User, { IUser } from "../schemas/userSchema";
import {FilterQuery} from 'mongoose'

class UserModel {
    async findAll (): Promise<IUser[] | null> {
        try {
            return await User.find();
        } catch (error) {
            console.error('Error User findd: ', error);
            return null;
        }
    }

    async findByID (user_id: string): Promise<IUser[] | null> {
        try {
            return await User.findById(user_id);
        } catch (error) {
            console.error('Error User findByID: ', error);
            return null;
        }
    }

    async find (filter: FilterQuery<IUser>): Promise<IUser | null> { // FilterQuery para definir filtro de busqueda de mongoose
        try {
            return await User.findOne(filter);
        } catch (error) {
            console.error('Error User find: ', error);
            return null;
        }
    }

    async create (data: Partial<IUser>): Promise<IUser | null> {
        try {
            const newUser = new User(data);
            return await newUser.save();
        } catch (error) {
            console.error('Error User create: ', error);
            return null;
        }
    }

    async update (user_id: string, data: Partial<IUser>): Promise<IUser | null> {
        try {
            return await User.findByIdAndUpdate(user_id, data, { new: true });
        } catch (error) {
            console.error('Error User update: ', error);
            return null;
        }
    }

    async delete (user_id: string): Promise<IUser | null> {
        try {
            return await User.findByIdAndUpdate(user_id, { status: false }, { new: true });
        } catch (error) {
            console.error('Error User delete: ', error);
            return null;
        }
    }
}

export default new UserModel();