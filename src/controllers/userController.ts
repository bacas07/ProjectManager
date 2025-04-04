import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { userInputSchema } from '../validators/userValidator.js';

// Funcion para obtener todos los usarios
export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await User.findAll();
    return res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

// Funcion para obtener todos los usuarios innactivos
export const getAllUnactiveUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUnactiveUsers = await User.findAllUnactive();
    return res.status(200).json(allUnactiveUsers);
  } catch (error) {
    next(error);
  }
};

// Funcion para obtner un usuario por su id
export const getUserByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findByID(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
