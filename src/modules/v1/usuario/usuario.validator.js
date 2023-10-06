import z from 'zod';


/** 
    {
    "nombre": "julian",             //* nombre del usuario
    "apellido": "torossian",        //* apellido del usuario
    "dni": 99999999,                //* dni del usuario
    "telefono": "2944909090",       //* telefono del usuario
    "nroTramite": "12345678901",    //* nro de tramite del usuario
    "mail": "mail@mail.com",        //* mail del usuario
    "password": "123"               //* password del usuario
}
**/

const usuarioEsquema = z.object({
    nombre: z.string().max(45),
    apellido: z.string().max(60),
    dni: z.string().length(8),
    telefono: z.string(),
    nroTramite: z.string().length(11),
    mail: z.string().email().max(60),
    password: z.string(),
});

export const validarUsuario = (input) => {
    return usuarioEsquema.safeParse(input);
}

export const validacionParcialUsuario = (input) => {
    return usuarioEsquema.partial().safeParse(input);
}