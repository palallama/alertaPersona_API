import z from 'zod';


/** 
{
    "alerta": 1,                //* id de la alerta
    "usuario": 1,               //* id del usuario
    "observaciones": "obs",     //* alguna observacion
}
**/

const esquema = z.object({
    alerta: z.string(),
    usuario: z.number().positive(),
    observaciones: z.string().max(200),
    estado: z.string().length(1).optional()
});

export const validarId = (input) => {
    return z.object({ alerta: z.number().positive(), usuario: z.number().positive() }).safeParse(input);
}
export const validar = (input) => {
    return esquema.safeParse(input);
}
export const validacionParcial = (input) => {
    return esquema.partial().safeParse(input);
}