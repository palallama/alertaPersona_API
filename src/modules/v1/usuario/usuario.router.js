import express from 'express';
import * as controller from './usuario.controller.js';
import { verificarToken } from '../../../helpers/token.validator.js'

const usuarioRouter = express.Router();


usuarioRouter.get('/iniciarSesion', controller.iniciarSesion);
usuarioRouter.patch('/:usuarioId/cambiarContrasena', controller.cambiarContrasena); 

usuarioRouter.get('/', controller.getUsuarios);
usuarioRouter.get('/:usuarioId', controller.getUsuario);

usuarioRouter.post('/setNotificacionToken', controller.setTokenNotificacionUsuario);

usuarioRouter.post('/', controller.insertUsuario);
usuarioRouter.patch('/:usuarioId', controller.updateUsuario);
usuarioRouter.delete('/:usuarioId', controller.deleteUsuario);

export default usuarioRouter;