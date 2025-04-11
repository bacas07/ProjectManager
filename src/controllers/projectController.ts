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
    return res.status(200).json({
      message: `Query succesful: ${allProjects?.length} project(s) found`,
      projects: allProjects,
    });
  } catch (error) {
    next(error);
  }
};

// Funcion para obtener todos los proyectos inactivos
export const getAllUnactiveProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUnactiveProjects = await Project.findAllUnactive();
    return res.status(200).json({
      message: `Query sucessful: ${allUnactiveProjects?.length} unactive project(s) found`,
      projects: allUnactiveProjects,
    });
  } catch (error) {
    next(error);
  }
};

// Funcion para obtener un proyecto por id
export const getProjectByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const project = await Project.findByID(id);

    if (!project) {
      return res
        .status(404)
        .json({ message: `Bad query: project with id ${id} not found` });
    }

    return res.status(200).json({
      message: `Query sucessful: project with id ${id} found`,
      project: project,
    });
  } catch (error) {
    next(error);
  }
};

// Funcion para obtener proyectos por el Id del usuario
export const getProjectByUserID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const projects = await Project.findByUserID(id);

    if (!projects) {
      return res.status(404).json({
        message: `Bad query: projects with user id ${id} not found`,
      });
    }

    return res.status(200).json({
      message: `Query sucessful: ${projects?.length} project(s) with user id ${id} found`,
      projects: projects,
    });
  } catch (error) {
    next(error);
  }
};

// Funcion para realizar consultas complejas a la base de datos
export const getOneProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter } = req.body;
    const project = await Project.findOne(filter);

    if (!project) {
      return res.status(404).json({
        message: `Bad query: project with filter: ${filter} not found`,
      });
    }

    return res.status(200).json({
      message: `Query succesful: project with filter ${filter} found`,
      project: project,
    });
  } catch (error) {
    next(error);
  }
};

// Funcion para crear proyectos

// Funcion para modificar proyectos

// Funcion para cambiar proyecto a un estado innactivo

// Funcion para eliminar permanentemente un proyecto