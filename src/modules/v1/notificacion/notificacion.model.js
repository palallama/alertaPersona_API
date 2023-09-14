
import { pool } from '../../../db.js';


/** 
 ** Ver todos los usuarios
 *
*/
export const getNotis = async () => {

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
export const getNoti = async (notiId) => {

    try{
        const query = 'SELECT * FROM notificacion WHERE notiId = ?';
        let params = [
            notiId
        ];

        const [rows] = await pool.query(query, params);

        let response = null;
            
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            response = {
                "id": row.notiId,
                "usuario": row.notiUsuario,
                "estado": row.notiEstado,
            };
        };

        return response;

    }catch (err){
        throw new Error(err);
    }

}

/** 
 ** Crea un nuevo usuario
 *
 *i @param notificacion: objeto con los datos necesarios del usuario - especificado mas abajo
*/
export const insertNoti = async (notificacion) => {
     
    /** 
    {
         "id": row.notiId,
          "usuario": row.notiUsuario,
          "estado": row.notiEstado,
    }
    **/

    try{

        const query = 'INSERT INTO notificacion(notiId, notiUsuario, notiEstado) VALUES (?, ?, ?)';
        let params = [
            notificacion.id,
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
 ** Crea un nuevo usuario
 *
 *i @param notificacion: objeto con los datos necesarios del usuario - especificado mas abajo
*/
export const updateNoti = async (notificacion) => {
     
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
export const deleteNoti = async (notiId) => {

    try{
        const query = 'DELETE FROM notificacion WHERE notiId = ?';
        let params = [
            notiId
        ];

        const [rows] = await pool.query(query, params);
        return 1;

    }catch (err){
        throw new Error(err);
    }

}

/** 
 ** Corrobora que existe el usuario para el inicio de sesion
 *
 *i @param mail: mail del usuario
 *i @param password: contraseña del usuario

export const existeUsuario = async (mail, password) => {

    try {

        let query = 'SELECT usuId FROM usuario WHERE (usuMail = ? AND usuPass = ?) AND usuActivo = true';
        let params = [
            mail,
            password
        ];
        const [rows] = await pool.query(query, params);
        
        return 1;
        
    } catch (err) {
        throw new Error(err);
    }


}*/