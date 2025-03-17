import Project, {IProject} from '../schemas/projectSchema.js';
import { FilterQuery } from 'mongoose';

class ProjectModel {
    async findAll (): Promise<IProject[] | null> {
        try {
            return await Project.find();
        } catch (error) {
            console.error('Error Project find: ', error);
            return null;
        }
    }

    async findByID (project_id: string): Promise<IProject[] | null> {
        try {
            return await Project.findById(project_id);
        } catch (error) {
            console.error('Error Project findByID: ', error);
            return null;
        }
    }

    async findByUserID (user_id: FilterQuery<IProject>): Promise<IProject[] | null> {
        try {
            return await Project.findOne(user_id);
        } catch (error) {
            console.error('Error Project findByUserID: ', error);
            return null;
        }
    }

    async findOne (filter: FilterQuery<IProject>): Promise<IProject[] | null> {
        try {
            return await Project.findOne(filter);
        } catch (error) {
            console.error('Error Project findOne: ', error)
            return null;
        }
    }

    async create (data: Partial<IProject>): Promise<IProject | null> { // No se retorna un array de IProject, solo la instacia creada
        try {
            const newProject = new Project(data);
            return await newProject.save();
        } catch (error) {
            console.error('Error Project create: ', error);
            return null;
        }
    }
}