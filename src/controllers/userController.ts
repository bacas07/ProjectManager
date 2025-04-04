import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { userInputSchema } from '../validators/userValidator.js';
import { parse } from 'valibot';

// Funcion para obtener todos los usarios
export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await User.findAll();
    return res.status(200).json({
      message: `Query succesful: ${allUsers?.length} user(s) found`,
      users: allUsers,
    });
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
    return res.status(200).json({
      message: `Query succesful: ${allUnactiveUsers?.length} unactive user(s) found`,
      users: allUnactiveUsers,
    });
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
      return res
        .status(404)
        .json({ message: `Bad query: user with id ${id} not found` });
    }

    return res.status(200).json({
      message: `Query sucessful: user with id ${id} found`,
      user: user,
    });
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
      return res.status(404).json({
        message: `Bad query: user with filter ${filter} not found`,
      });
    }

    return res.status(200).json({
      message: `Query sucessful: user with ${filter} found`,
      user: user,
    });
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
      return res.status(404).json({
        message: `Bad query: user with username ${username} not found`,
      });
    }

    return res.status(200).json({
      message: `Query sucessful: user with username ${username} found`,
      user: user,
    });
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
      return res.status(404).json({
        message: `Bad query: user with email ${email} not found`,
      });
    }

    return res.status(200).json({
      message: `Query sucessful: user with email ${email} found`,
      user: user,
    });
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
    const validatedData = parse(userInputSchema, req.body);
    // Verificacion de existencia de username y email
    const existingUser = await User.findOne({
      $or: [
        { email: validatedData.email },
        { username: validatedData.username },
      ],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Email or username is alredy taken' });
    }

    // Creacion del nuevo usuario
    const newUser = await User.create(validatedData);
    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    next(error);
  }
};

// Funcion para modificar un usuario, cualquier campo
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedUser = await User.update(id, data);

    if (!updatedUser) {
      return res.status(404).json({
        message: `Bad query: user not found with id ${id} or bad data ${data}`,
      });
    }

    return res
      .status(200)
      .json({ message: 'User updated sucessfully', user: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const softDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.softDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({
          message: `Bad query: user not found with id ${id} or deletion failed`,
        });
    }

    return res.status(200).json({ message: 'User soft deleted sucessfully' });
  } catch (error) {
    next(error);
  }
};
