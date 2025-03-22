import Project, { IProject } from '../schemas/projectSchema.js';
import { FilterQuery } from 'mongoose';

class ProjectModel {
  async findAll(): Promise<IProject[] | null> {
    try {
      return await Project.find();
    } catch (error) {
      console.error('Error Project find: ', error);
      return null;
    }
  }

  async findByID(projectID: string): Promise<IProject[] | null> {
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

  async delete(projectID: string): Promise<IProject | null> {
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
