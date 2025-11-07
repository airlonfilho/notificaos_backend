import express from 'express';
import { router } from './routes.js';
import { connectDatabase } from '../infra/database/connects.js';

const app = express();

async function startServer(){
    try {
        await connectDatabase();
        app.use(express.json());
        app.use(router);

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

startServer();