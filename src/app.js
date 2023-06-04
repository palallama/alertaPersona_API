import express from 'express';
import morgan  from "morgan";
import cors    from 'cors';

import routerV1 from './routers/router.v1.js';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Rutas
app.use('/api/v1', routerV1);

export default app;