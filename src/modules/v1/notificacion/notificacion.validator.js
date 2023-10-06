import z from 'zod';

/** 
{
    "id": row.notiId,
    "usuario": row.notiUsuario,
    "estado": row.notiEstado
    "motivo": a definir bien - si es notificacion aviso etc
}
**/

const notificacionEsquema = z.object({
    id: z.number().positive().optional(),
    usuario: z.number().positive(),
    estado: z.string().length(1),
    motivo:  z.string().length(1).optional(),
});

export const validarNotificacion = (input) => {
    return notificacionEsquema.safeParse(input);
}

export const validacionParcialNotificacion = (input) => {
    return notificacionEsquema.partial().safeParse(input);
}