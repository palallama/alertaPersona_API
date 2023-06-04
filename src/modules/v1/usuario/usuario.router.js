import express from 'express';
import * as controller from './usuario.controller.js';

const usuarioRouter = express.Router();

usuarioRouter.get('/', controller.getUsuarios);

export default usuarioRouter;