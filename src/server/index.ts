import express from 'express';
import { router } from './routes.js';
import { connectDatabase } from '../infra/database/connects.js';
import { cors } from './middlewares/CORS.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { apiReference } from '@scalar/express-api-reference';
import { openApiDocument } from './docs/openapi.js';

const scalarConfig = {
    spec: {
        content: openApiDocument,
    },
} as const;

const app = express();

async function startServer(){
    try {
        await connectDatabase();
        app.use(cors);
        app.use(express.json());
        app.use(router);

        app.get('/openapi.json', (_req, res) => {
            res.json(openApiDocument);
        });

        app.use('/docs', apiReference(scalarConfig as any));

        app.use(errorHandler);

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