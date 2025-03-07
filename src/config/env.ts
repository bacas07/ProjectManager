import dotenv from "dotenv";

dotenv.config();

const getEnvVariable = (key: string, required: boolean) => {
    const value = process.env[key];

    if (required && !value) {
        console.error(`Error: The environment variable ${key} is required`);
        process.exit(1);
    }

    return value || '';
}

export const env = {
    PORT: getEnvVariable('PORT', false),
    MONGO_URL: getEnvVariable('MONGO_URL', true)
};