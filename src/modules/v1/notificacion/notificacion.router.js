import express from 'express';
import * as controller from './notificacion.controller.js';

const notificacionRouter = express.Router();

usuarioRouter.get('/', controller.getNotificaciones);
usuarioRouter.get('/:notiId', controller.getNotificacion);

usuarioRouter.post('/', controller.insertNotificacion);
usuarioRouter.patch('/:notiId', controller.updateNotificacion);
usuarioRouter.delete('/:notiId', controller.deleteNotificacion);

export default notificacionRouter;