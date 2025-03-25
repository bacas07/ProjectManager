import Project, { IProject } from '../schemas/projectSchema.js';
import { FilterQuery } from 'mongoose';

// Enum para validar si la etapa buscada es permitida
enum Stages {
  pending = 'pending',
  inProgress = 'in-progress',
  done = 'done',
}

class ProjectModel {
  async findAll(): Promise<IProject[] | null> {
    try {
      return await Project.find();
    } catch (error) {
      console.error('Error Project find: ', error);
      return null;
    }
  }

  async findByID(projectID: String): Promise<IProject[] | null> {
    try {
      return await Project.findById(projectID);
    } catch (error) {
      console.error('Error Project findByID: ', error);
      return null;
    }
  }

  async findByUserID(
    userID: FilterQuery<IProject>
  ): Promise<IProject[] | null> {
    try {
      return await Project.findOne(userID);
    } catch (error) {
      console.error('Error Project findByUserID: ', error);
      return null;
    }
  }

  async findOne(filter: FilterQuery<IProject>): Promise<IProject[] | null> {
    try {
      return await Project.findOne(filter);
    } catch (error) {
      console.error('Error Project findOne: ', error);
      return null;
    }
  }

  async create(data: Partial<IProject>): Promise<IProject | null> {
    // No se retorna un array de IProject, solo la instacia creada
    try {
      const newProject = new Project(data);
      return await newProject.save();
    } catch (error) {
      console.error('Error Project create: ', error);
      return null;
    }
  }

  // Metodo para buscar proyecto por su etapa actual
  async findByStage(stage: string): Promise<IProject[] | null> {
    try {
      stage.toLowerCase();
      // Primero se verifica que el stage ingresado sea valido
      if (!Object.values(Stages).includes(stage as Stages)) {
        console.error(
          'Error Project findByStage: El stage proporcionado no es válido'
        );
        return null;
      }
      return await Project.find({ stage });
    } catch (error) {
      console.error('Error Project findByStage');
      return null;
    }
  }

  async update(
    projectID: String,
    data: Partial<IProject>
  ): Promise<IProject | null> {
    try {
      return await Project.findByIdAndUpdate(projectID, data, { new: true });
    } catch (error) {
      console.error('Error Project update: ', error);
      return null;
    }
  }

  async delete(projectID: String): Promise<IProject | null> {
    try {
      return await Project.findByIdAndUpdate(
        projectID,
        { status: false },
        { new: true }
      );
    } catch (error) {
      console.error('Error Project delete: ', error);
      return null;
    }
  }
}

export default new ProjectModel();
