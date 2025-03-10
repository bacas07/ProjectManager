import { env } from "./config/env.js";
import { connectDB } from "./config/database.js";
import server from "./server.js";

const PORT = env.PORT;

const startServer = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`> Server running on: http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error('Error: Unable to connect to database', error);
        process.exit(1);
    }
};

startServer();