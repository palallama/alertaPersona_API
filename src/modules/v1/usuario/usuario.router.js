import express from 'express';
import * as controller from './usuario.controller.js';
import { verificarToken } from '../../../helpers/middleware/jwtMiddleware.js'

import { createValidationMiddleware as validator} from '../../../helper/middleware/createValidationMiddleware.js';
import { createCacheMiddleware as cache} from '../../../helper/middleware/cacheMiddleware.js';
import { ONE_MINUTE_IN_SECONDS } from '../../../helper/time.js';
import { validarId, validar, validacionParcial } from './entorno.validator.js';

const usuarioRouter = express.Router();


usuarioRouter.get(
    '/iniciarSesion',
    controller.iniciarSesion
);
usuarioRouter.patch(
    '/:usuarioId/cambiarContrasena',
    validator({ params: validarId }),
    // validator({ body: validacionParcial }),
    controller.cambiarContrasena
);
usuarioRouter.get(
    '/:usuarioId/enviarEmail'
);

usuarioRouter.get(
    '/',
    cache(ONE_MINUTE_IN_SECONDS),
    controller.getUsuarios
);
usuarioRouter.get(
    '/:usuarioId',
    validator({ params: validarId }),
    controller.getUsuario
);
usuarioRouter.get(
    '/:usuarioId/historial',
    validator({ params: validarId }),
    controller.verHistorial
);

usuarioRouter.post(
    '/:usuarioId/setNotificacionToken',
    validator({ params: validarId }),
    validator({ body: validacionParcial }),
    controller.setTokenNotificacionUsuario
);
usuarioRouter.post(
    '/',
    validator({ body: validar }),
    controller.insertUsuario
);
usuarioRouter.patch(
    '/:usuarioId',
    validator({ params: validarId }),
    validator({ body: validacionParcial }),
    controller.updateUsuario
);
usuarioRouter.delete(
    '/:usuarioId',
    validator({ params: validarId }),
    controller.deleteUsuario
);

export default usuarioRouter;