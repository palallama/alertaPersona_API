import express from 'express';
import * as controller from './notificacion.controller.js';

const notificacionRouter = express.Router();

notificacionRouter.get('/enviarNotificacion', controller.enviarNotificacion);

notificacionRouter.get('/', controller.getNotificaciones);
notificacionRouter.get('/:notificacionId', controller.getNotificacion);

notificacionRouter.post('/', controller.insertNotificacion);
notificacionRouter.patch('/:notificacionId', controller.updateNotificacion);
notificacionRouter.delete('/:notificacionId', controller.deleteNotificacion);

notificacionRouter.get('/leer/:notificacionId', controller.marcarLeidaNotificacion ); 




export default notificacionRouter;