import express from 'express';
import * as controller from './notificacion.controller.js';

const notificacionRouter = express.Router();

usuarioRouter.get('/', controller.getNotis);
usuarioRouter.get('/:notiId', controller.getNoti);

usuarioRouter.post('/', controller.insertNoti);
usuarioRouter.put('/', controller.updateNoti);
usuarioRouter.delete('/:notiId', controller.deleteNoti);

export default notificacionRouter;