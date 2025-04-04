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
    console.error('Error user controller: ', error);
    next(error);
  }
};


