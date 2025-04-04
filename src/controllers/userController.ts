import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { userInputSchema } from '../validators/userValidator.js';
import { parse } from 'valibot'

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

// Funcion para obtener un usuario por su id
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

// Funcion para obtener un usuario por un campo expecifico
export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter } = req.body;
    const user = await User.findOne(filter);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Funcion para obtener un usuario por su username
export const getUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    const user = await User.findByUsername(username);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Funcion para obtener un usuario por su email
export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//Funcion para crear un usuario
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
        // Validacion de datos con valibot
        const validatedData = parse(userInputSchema, req.body)
        // Verificacion de existencia de username y email
        const existingUser = await User.findOne({
            $or: [{ email: validatedData.email }, { username: validatedData.username }]
        })

        if (existingUser) {
            return res.status(400).json({ message: 'Email or username is alredy taken' })
        }

        // Creacion del nuevo usuario
        const newUser = await User.create(validatedData)
        res.status(201).json({ message: 'User registered successfully', user: newUser })
    } catch (error) {
        next(error)
    }
};