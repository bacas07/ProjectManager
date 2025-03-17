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
}