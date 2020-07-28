import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

class Server {
    public express: express.Application;
    public constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware() {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        
    }

    private routes() {
        this.express.use('/api', routes)
    }
}

export default new Server().express;