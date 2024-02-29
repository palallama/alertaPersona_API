import z from 'zod';

// const latitud_regex = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
// const longitud_regex = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

const latitud_regex =  /^[-]?[0-9]{1,10}\.[0-9]{6,14}?$/; 
const longitud_regex = /^[-]?[0-9]{1,10}\.[0-9]{6,16}?$/;

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

const esquema = z.object({
    id: z.number().positive().optional(),
    usuario: z.number().positive(),
    ubicacion: z.object({
        latitud: z.string().regex(latitud_regex),
        longitud: z.string().regex(longitud_regex)
    }),
    estado: z.string().max(2).optional(),
    emision: z.string().datetime().optional(),
    cierre: z.string().datetime().optional(),
    cerrada: z.boolean().optional()
});

export const validarId = (input) => {
    return z.object({ alertaId: z.number().positive() }).safeParse(input);
}
export const validar = (input) => {
    return esquema.safeParse(input);
}
export const validacionParcial = (input) => {
    return esquema.partial().safeParse(input);
}