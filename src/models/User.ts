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

    async find (filter: FilterQuery<IUser>): Promise<IUser | null> { // Problemas de tipado por mongoose, FilterQuery para definir filtro de busqueda
        try {
            return await User.findOne(filter);
        } catch (error) {
            console.error('Error User find: ', error);
            return null;
        }
    }
}

export default new UserModel();