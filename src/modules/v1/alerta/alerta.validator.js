import z from 'zod';

const latitud_regex = '^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$';
const longitud_regex = '^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$';


/** 
{
    "id": 1,                //* id de la alerta
    "usuario": 1,           //* id del usuario
    "ubicacion": {
        "latitud": "lat",   //* Latitud
        "longitud": "long"  //* Latitud
    },
    "estado": "",           //* estado de la alerta
    "emision": "",          //* fecha de emision
    "cierre": ""            //* fecha de cierre
}
**/

const alertaEsquema = z.object({
    id: z.number().positive().optional(),
    usuario: z.number().positive(),
    ubicacion: z.object({
        latitud: z.string().regex(latitud_regex),
        longitud: z.string().regex(longitud_regex)
    }),
    estado: z.string().length(2).optional(),
    emision: z.string().datetime().optional(),
    cierre: z.string().datetime().optional()
});

export const validarAlerta = (input) => {
    return alertaEsquema.safeParse(input);
}

export const validacionParcialAlerta = (input) => {
    return alertaEsquema.partial().safeParse(input);
}