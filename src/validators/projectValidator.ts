import { z } from "zod";

const stagesJSONSchema = z.object({
    name: z.string().min(1, 'Name stage is required').max(100),
    description: z.string().min(1, 'Description stage is required').max(1000),
    estimatedTime: z.number().positive(),
    status: z.enum(['pending', 'in-progress', 'done'])
});


export const projectInputSchema = z.object({
    name: z.string().min(1, 'Name project is required').max(100),
    description: z.string().min(1, 'Description project is required').max(2000),
    technologies: z.string().min(1, 'technologies project is required').max(50),
    stages: z.array(stagesJSONSchema),
    createdBy: z.string().min(1, 'User ID project is required').max(100),
    deadline: z.union([z.date(), z.string().datetime()])
});