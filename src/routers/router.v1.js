import express      from 'express';
import usuarioRouter from '../modules/v1/usuario/usuario.router.js';

const routerV1 = express.Router();

routerV1.use('/usuario' , usuarioRouter);

export default routerV1;