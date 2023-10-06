import express      from 'express';
import usuarioRouter from '../modules/v1/usuario/usuario.router.js';
import alertaRouter from '../modules/v1/alerta/alerta.router.js';
import asistenteRouter from '../modules/v1/asistente/asistente.router.js';
import notificacionRouter from '../modules/v1/notificacion/notificacion.router.js';

const routerV1 = express.Router();

routerV1.use('/usuario' , usuarioRouter);
routerV1.use('/alerta' , alertaRouter);
routerV1.use('/asistente' , asistenteRouter);
routerV1.use('/notificacion' , notificacionRouter);

export default routerV1;