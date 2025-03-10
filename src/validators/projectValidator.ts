import { string, z } from "zod";

const stagesJSONSchema = z.object({
    name: z.string().min(1, 'Name stage is required').max(100),
    description: z.string().min(1, 'Description stage is required').max(1000),
    stimatedTime: z.number().positive(),
    status: z.enum([
        'pending',
        'in-progress',
        'done'
    ])
});

export const projectInputSchema = z.object({
    name: z.string().min(1, 'Name project is required').max(100),
    description: z.string().min(1, 'Description projecti is required').max(2000),
    stack: z.string().min(1, 'Stack project is required').max(50),
    stages: stagesJSONSchema,
    createdBy: z.string().min(1, 'User ID project is required').max(100),
    deadline: z.date()
});