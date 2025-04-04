import User, { IUser } from '../schemas/userSchema.js';
import { FilterQuery } from 'mongoose';

class UserModel {
  async findAll(): Promise<IUser[] | null> {
    try {
      return await User.find({ status: true });
    } catch (error) {
      console.error('Error User findAll: ', error);
      return null;
    }
  }

  async findAllUnactive(): Promise<IUser[] | null> {
    try {
      return await User.find({ status: false });
    } catch (error) {
      console.error('Error User findAllUnactive: ', error);
      return null;
    }
  }

  async findByID(userID: string): Promise<IUser | null> {
    try {
      return await User.findById(userID);
    } catch (error) {
      console.error('Error User findByID: ', error);
      return null;
    }
  }
  // Metodo para buscar por un campo expecifico, querry mas compleja
  async findOne(filter: FilterQuery<IUser>): Promise<IUser | null> {
    // FilterQuery para definir filtro de busqueda de mongoose.
    try {
      return await User.findOne(filter);
    } catch (error) {
      console.error('Error User find: ', error);
      return null;
    }
  }

  // Metodo para buscar usuario por su username
  async findByUsername(username: string): Promise<IUser | null> {
    try {
      return await User.findOne({ username });
    } catch (error) {
      console.error('Error User findByUsername: ', error);
      return null;
    }
  }

  // Metodo para buscar usuario por su email
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.error('Error User findByEmail: ', error);
      return null;
    }
  }

  async create(data: Partial<IUser>): Promise<IUser | null> {
    try {
      const newUser = new User(data);
      return await newUser.save();
    } catch (error) {
      console.error('Error User create: ', error);
      return null;
    }
  }

  async update(userID: string, data: Partial<IUser>): Promise<IUser | null> {
    try {
      return await User.findByIdAndUpdate(userID, data, { new: true });
    } catch (error) {
      console.error('Error User update: ', error);
      return null;
    }
  }

  // No elimina, solo cambia a un estado innactivo.
  async softDelete(userID: string): Promise<IUser | null> {
    try {
      return await User.findByIdAndUpdate(
        userID,
        { status: false },
        { new: true }
      );
    } catch (error) {
      console.error('Error User softDelete: ', error);
      return null;
    }
  }

  // Metodo de eliminacion real
  async delete(userID: string): Promise<IUser | null> {
    try {
      return await User.findByIdAndDelete(userID);
    } catch (error) {
      console.error('Error User delete: ', error);
      return null;
    }
  }
}

export default new UserModel();
