import express from 'express';
import * as controller from './notificacion.controller.js';

import { createValidationMiddleware as validator} from '../../../helper/middleware/createValidationMiddleware.js';
import { createCacheMiddleware as cache} from '../../../helper/middleware/cacheMiddleware.js';
import { ONE_MINUTE_IN_SECONDS } from '../../../helper/time.js';
import { validarId, validar, validacionParcial } from './entorno.validator.js';

const notificacionRouter = express.Router();

notificacionRouter.get(
    '/enviarNotificacion',
    controller.enviarNotificacion
);

notificacionRouter.get(
    '/',
    cache(ONE_MINUTE_IN_SECONDS),
    controller.getNotificaciones
);
notificacionRouter.get(
    '/:notificacionId',
    validator({ params: validarId }),
    controller.getNotificacion
);

notificacionRouter.post(
    '/',
    validator({ body: validar }),
    controller.insertNotificacion
);
notificacionRouter.patch(
    '/:notificacionId',
    validator({ params: validarId }),
    validator({ body: validacionParcial }),
    controller.updateNotificacion
);
notificacionRouter.delete(
    '/:notificacionId',
    validator({ params: validarId }),
    controller.deleteNotificacion
);

notificacionRouter.get(
    '/leer/:notificacionId',
    validator({ params: validarId }),
    controller.marcarLeidaNotificacion
); 




export default notificacionRouter;