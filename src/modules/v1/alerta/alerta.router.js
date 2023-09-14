import express from 'express';
import * as controller from './alerta.controller.js';

const alertaRouter = express.Router();


alertaRouter.get('/getAlertas', controller.getAlertas);
alertaRouter.get('/:aleId', controller.getAlerta);




alertaRouter.post('/', controller.insertAlerta);
alertaRouter.put('/', controller.updateAlerta);
alertaRouter.delete('/:aleId', controller.deleteAlerta);

export default alertaRouter;