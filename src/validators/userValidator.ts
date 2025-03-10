import { z } from "zod";

export const userInputSchema = z.object({
    username: z.string().min(1, 'Username required').max(50),
    email: z.string().email('Must be a valid email'),
    password: z.string().min(1, 'Password is required').max(255),
    role: z.string().max(15, 'Role is required').default('user'),
    status: z.boolean().default(true)
});