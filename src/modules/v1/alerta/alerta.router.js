import express from 'express';
import * as controller from './alerta.controller.js';

import { createValidationMiddleware as validator} from '../../../helpers/middleware/createValidationMiddleware.js';
import { createCacheMiddleware as cache} from '../../../helpers/middleware/cacheMiddleware.js';
import { ONE_MINUTE_IN_SECONDS } from '../../../helpers/time.js';
import { validarId, validar, validacionParcial } from './alerta.validator.js';

const alertaRouter = express.Router();

alertaRouter.post(
    '/cierre',
    validator({ body: validacionParcial }),
    controller.cerrarAlerta
);

alertaRouter.get(
    '/',
    cache(ONE_MINUTE_IN_SECONDS),
    controller.getAlertas
);
alertaRouter.get(
    '/:alertaId',
    validator({ params: validarId }),
    controller.getAlerta
);

alertaRouter.post(
    '/',
    validator({ body: validar }),
    controller.insertAlerta
);
alertaRouter.patch(
    '/:alertaId',
    validator({ params: validarId }),
    controller.updateAlerta
);
alertaRouter.delete(
    '/:alertaId',
    validator({ params: validarId }),
    controller.deleteAlerta
);

export default alertaRouter;