
import { pool } from '../../../db.js';


/** 
 ** Ver todos los usuarios
 *
*/
export const getNotificaciones = async () => {

    try{
        const query = 'SELECT * FROM notificacion';
        let params = [];

        const [rows] = await pool.query(query, params);

        let response = [];
            
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            response.push({
                "id": row.notiId,
                "usuario": row.notiUsuario,
                "estado": row.notiEstado,
            });
        };

        return response;

    }catch (err){
        throw new Error(err);
    }

}

/** 
 ** Ver un usuario por ID
 *
*/
export const getNotificacion = async (notiId) => {

    try{
        const query = 'SELECT * FROM notificacion WHERE notiId = ?';
        let params = [
            notiId
        ];

        const [rows] = await pool.query(query, params);

        let response = {
            "id": rows[i].notiId,
            "usuario": rows[i].notiUsuario,
            "estado": rows[i].notiEstado,
        };

        return response;

    }catch (err){
        throw new Error(err);
    }

}

/** 
 ** Crea una nueva notificacion
 *
 *i @param notificacion: objeto con los datos necesarios del usuario - especificado mas abajo
*/
export const insertNotificacion = async (notificacion) => {

    /** 
    {
        "id": row.notiId,
        "usuario": row.notiUsuario,
        "estado": row.notiEstado
    }
    **/

    try{
        //!!! VER
        const query = 'INSERT INTO notificacion(notiUsuario, notiEstado) VALUES (?, "I")';
        let params = [
            notificacion.usuario,
            // notificacion.estado
        ];
        const [rows] = await pool.query(query, params);
        const [id] = await pool.query("SELECT LAST_INSERT_ID() AS id", []);

        return {
            "id": id[0].id,
            "estado": "I",
            ...notificacion
        };

    }catch (err){
        throw new Error(err);
    }

}

/** 
 ** Crea un nuevo usuario
 *
 *i @param notificacion: objeto con los datos necesarios del usuario - especificado mas abajo
*/
export const updateNotificacion = async (notificacion) => {

    /** 
    {
        notificacion.id,
        notificacion.usuario,
        notificacion.estado,
    }
    **/

    try{

        const query = 'UPDATE notificacion SET notiUsuario = ?, notiEstado = ? WHERE notiId = ?';
        let params = [
            notificacion.usuario,
            notificacion.estado,
        ];

        const [rows] = await pool.query(query, params);
        return 1;

    }catch (err){
        throw new Error(err);
    }

}

/** 
 ** Eliminar un nuevo usuario
 *
 *i @param notiId: id del usuario a eliminar
*/
export const deleteNotificacion = async (notiId) => {

    try{
        const query = 'DELETE FROM notificacion WHERE notiId = ?';
        let params = [
            notiId
        ];

        const [rows] = await pool.query(query, params);
        return notiId;

    }catch (err){
        throw new Error(err);
    }

}

/** 
 ** Marcar Notificacion Leida
 *
 *i @param notiId: id del usuario a eliminar
*/
export const marcarLeidaNotificacion = async (notiId) => {

    try{
        const query = 'UPDATE notificacion SET notiEstado = "L" WHERE notiId = ?';
        let params = [
            notiId
        ];

        const [rows] = await pool.query(query, params);
        return notiId;

    }catch (err){
        throw new Error(err);
    }

}


export const updateNotiMotivo = async (notificacion) => {

    /** 
    {
       notiMotivo =  (S/C)Solucion/Cancelacion
    }
    **/

    try{

        const query = 'UPDATE notificacion SET notiEstado = 0, notiMotivo = ? WHERE notiId = ? AND notiUsuario = ? AND notiUsuario != 0';
        let params = [
            notificacion.estado,
            notificacion.motivo,
            notificacion.id,
            notificacion.usuario,
        ];

        const [rows] = await pool.query(query, params);
        return 1;

    }catch (err){
        throw new Error(err);
    }

}

