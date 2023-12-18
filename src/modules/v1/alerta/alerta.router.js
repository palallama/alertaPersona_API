import express from 'express';
import * as controller from './alerta.controller.js';

const alertaRouter = express.Router();

alertaRouter.post('/cierre', controller.cerrarAlerta);

alertaRouter.get('/', controller.getAlertas);
alertaRouter.get('/:alertaId', controller.getAlerta);

alertaRouter.post('/', controller.insertAlerta);
alertaRouter.patch('/:alertaId', controller.updateAlerta);
alertaRouter.delete('/:alertaId', controller.deleteAlerta);





/*
// alertaRouter.patch('/:alertaId, :usuarioId', controller.marcarAlertaAsistente)
alertaRouter.post('/estadoCerrar', ) 
alertaRouter.post('/estadoCancelar', )
alertaRouter.post('/estadoSolucionar', )
*/

export default alertaRouter;