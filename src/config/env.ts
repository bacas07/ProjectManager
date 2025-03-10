import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default('5000'),
    MONGO_URL: z.string().min(10)
});

const getEnvVariable = (key: keyof z.infer<typeof envSchema>) => {
    const parsedEnv = envSchema.safeParse(process.env);

    if (!parsedEnv.success) {
        console.error('Error in environment variables: ', parsedEnv.error.format());
        process.exit(1);
    }

    return parsedEnv.data[key];
}

export const env = {
    PORT: getEnvVariable('PORT'),
    MONGO_URL: getEnvVariable('MONGO_URL'),
}