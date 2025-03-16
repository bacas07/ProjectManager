import User, { IUser } from "../schemas/userSchema";

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
}

export default new UserModel();