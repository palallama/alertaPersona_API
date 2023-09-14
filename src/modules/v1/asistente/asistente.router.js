import express from 'express';
import * as controller from './asistente.controller.js';

const asistenteRouter = express.Router();


asistenteRouter.get('/getAsistentes', controller.getAsistentes);
asistenteRouter.get('/:alerta/:usuario', controller.getAsistente);


asistenteRouter.post('/', controller.insertAsistente);
asistenteRouter.put('/', controller.updateAsistente);
asistenteRouter.delete('/:asistenteId', controller.deleteAsistente);

export default asistenteRouter;