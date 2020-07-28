import express from 'express'
import ProteinsController from './controllers/ProteinsController';

const routes = express.Router()

routes.get('/proteins', ProteinsController.index);
routes.get('/proteins/:id', ProteinsController.show );

export default routes;