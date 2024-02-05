import fs from "node:fs";
import express from 'express';
import morgan  from "morgan";
import cors    from 'cors';
import helmet  from 'helmet';

import { initializeApp, applicationDefault } from 'firebase-admin/app';

import https from 'https';

import routerV1 from './routers/router.v1.js';

initializeApp({
    credential: applicationDefault()
})


const app = express();
const options = {
    key: fs.readFileSync('./cert/localhost+2-key.pem'),
    cert: fs.readFileSync('./cert/localhost+2.pem')
}

const ACCEPTED_ORIGINS =[
    'http://localhost:8100',
    'https://localhost'
]

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
// app.use(cors({
//     origin: (origin, callback) => {
//         console.log("origen: ", origin)
//         if (ACCEPTED_ORIGINS.includes(origin)){
//             return callback(null, true);
//         }
//         if (!origin){
//             return callback(null, true);
//         }

//         return callback(new Error("Not allowed by CORS"))
//     },
//     credentials: true,
//     methods: ['GET', 'PATCH','PUT', 'POST', 'DELETE', 'OPTIONS']
// }));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Rutas
app.use('/api/v1', routerV1);

// app.options = options;

const server = https.createServer(options, app);

// export default server;
export default app;