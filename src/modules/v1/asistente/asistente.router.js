import express from 'express';
import * as controller from './asistente.controller.js';

import { createValidationMiddleware as validator} from '../../../helpers/middleware/createValidationMiddleware.js';
import { createCacheMiddleware as cache} from '../../../helpers/middleware/cacheMiddleware.js';
import { ONE_MINUTE_IN_SECONDS } from '../../../helpers/time.js';

import { validarId, validar, validacionParcial } from './asistente.validator.js';

const asistenteRouter = express.Router();


asistenteRouter.get(
    '/getAsistentes',
    cache(ONE_MINUTE_IN_SECONDS),
    controller.getAsistentes
);
asistenteRouter.get(
    '/:alerta/:usuario',
    validator({ params: validarId }),
    controller.getAsistente
);

asistenteRouter.post(
    '/',
    validator({ body: validar }),
    controller.insertAsistente
);
asistenteRouter.patch(
    '/:alerta/:usuario',
    validator({ params: validarId }),
    validator({ body: validacionParcial }),
    controller.updateAsistente
);
asistenteRouter.delete(
    '/:alerta/:usuario',
    validator({ params: validarId }),
    controller.deleteAsistente
);

export default asistenteRouter;