import app from './app.js';

import { PORT } from './config.js';

// Iniciar
app.listen(PORT, () => {
    console.log("Server iniciado en: " +PORT);
});