import z from 'zod';

/** 
{
    "id": row.notiId,
    "usuario": row.notiUsuario,
    "estado": row.notiEstado
}
**/

const notificacionEsquema = z.object({
    id: z.number().positive().optional(),
    usuario: z.number().positive(),
    estado: z.string().length(1)
});

export const validarNotificacion = (input) => {
    return notificacionEsquema.safeParse(input);
}

export const validacionParcialNotificacion = (input) => {
    return notificacionEsquema.partial().safeParse(input);
}