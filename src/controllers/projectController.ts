import { Request, Response, NextFunction } from 'express';
import Project from '../models/Project.js';
import { projectInputSchema } from '../validators/projectValidator.js';
import { parse } from 'valibot';

// Funcion para obtener todos los proyecto
export const getAllProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProjects = await Project.findAll();
    return res
      .status(200)
      .json({
        message: `Query succesful: ${allProjects?.length} project(s) found`,
        projects: allProjects,
      });
  } catch (error) {
    next(error);
  }
};
