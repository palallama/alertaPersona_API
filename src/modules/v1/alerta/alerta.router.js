import express from 'express';
import * as controller from './alerta.controller.js';

const alertaRouter = express.Router();


alertaRouter.get('/', controller.getAlertas);
alertaRouter.get('/:alertaId', controller.getAlerta);

alertaRouter.post('/', controller.insertAlerta);
alertaRouter.patch('/:alertaId', controller.updateAlerta);
alertaRouter.delete('/:alertaId', controller.deleteAlerta);


export default alertaRouter;