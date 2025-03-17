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
}