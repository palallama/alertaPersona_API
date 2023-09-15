import express from 'express';
import * as controller from './asistente.controller.js';

const asistenteRouter = express.Router();


asistenteRouter.get('/getAsistentes', controller.getAsistentes);
asistenteRouter.get('/:alerta/:usuario', controller.getAsistente);

asistenteRouter.post('/', controller.insertAsistente);
asistenteRouter.patch('/:alerta/:usuario', controller.updateAsistente);
asistenteRouter.delete('/:alerta/:usuario', controller.deleteAsistente);

export default asistenteRouter;