import z from 'zod';


/** 
{
    "alerta": 1,                //* id de la alerta
    "usuario": 1,               //* id del usuario
    "observaciones": "obs",     //* alguna observacion
}
**/

const asistenteEsquema = z.object({
    alerta: z.number().positive(),
    usuario: z.number().positive(),
    observaciones: z.string().max(200),
    estado: z.string().length(1).optional()
});

export const validarAsistente = (input) => {
    return asistenteEsquema.safeParse(input);
}

export const validacionParcialAsistente = (input) => {
    return asistenteEsquema.partial().safeParse(input);
}