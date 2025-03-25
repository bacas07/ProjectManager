import Project, { IProject } from '../schemas/projectSchema.js';
import { FilterQuery } from 'mongoose';

// Enum para validar si la etapa buscada es permitida
enum Status {
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

  async findByID(projectID: string): Promise<IProject | null> {
    try {
      return await Project.findById(projectID);
    } catch (error) {
      console.error('Error Project findByID: ', error);
      return null;
    }
  }

  async findByUserID(userID: string): Promise<IProject[] | null> {
    try {
      return await Project.find({ userID });
    } catch (error) {
      console.error('Error Project findByUserID: ', error);
      return null;
    }
  }

  // El filtrado de este metodo y para hacer querrys complejas
  async findOne(filter: FilterQuery<IProject>): Promise<IProject[] | null> {
    try {
      return await Project.findOne(filter);
    } catch (error) {
      console.error('Error Project findOne: ', error);
      return null;
    }
  }

  // Metodo para buscar proyecto por su etapa actual
  async findByStatus(status: string): Promise<IProject[] | null> {
    try {
      status = status.toLowerCase();
      // Primero se verifica que el stage ingresado sea valido
      if (!Object.values(Status).includes(status as Status)) {
        console.error(
          'Error Project findByStage: El stage proporcionado no es válido'
        );
        return null;
      }
      return await Project.find({ status });
    } catch (error) {
      console.error('Error Project findByStage: ', error);
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

  async update(
    projectID: string,
    data: Partial<IProject>
  ): Promise<IProject | null> {
    try {
      return await Project.findByIdAndUpdate(projectID, data, { new: true });
    } catch (error) {
      console.error('Error Project update: ', error);
      return null;
    }
  }

  // Cambio del nombre del metodo ya que este solo simula el borrado
  async softDelete(projectID: string): Promise<IProject | null> {
    try {
      return await Project.findByIdAndUpdate(
        projectID,
        { status: false },
        { new: true }
      );
    } catch (error) {
      console.error('Error Project softDelete: ', error);
      return null;
    }
  }

  // Metodo de borrado real, elimina todo registro
  async delete(projectID: string): Promise<IProject | null> {
    try {
      return await Project.findByIdAndDelete(projectID);
    } catch (error) {
      console.error('Error Project delete: ', error);
      return null;
    }
  }
}

export default new ProjectModel();
