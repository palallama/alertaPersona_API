import z from 'zod';
/** 
{
    "id": row.notiId,
    "usuario": row.notiUsuario,
    "estado": row.notiEstado
    "motivo": a definir bien - si es notificacion aviso etc
}
**/

const esquema = z.object({
    usuario: z.number().positive(),
    estado: z.string().length(1),
    motivo:  z.string().length(1).optional(),
});

export const validarId = (input) => {
    return z.object({ notificacionId: z.number().positive() }).safeParse(input);
}
export const validar = (input) => {
    return esquema.safeParse(input);
}
export const validacionParcial = (input) => {
    return esquema.partial().safeParse(input);
}