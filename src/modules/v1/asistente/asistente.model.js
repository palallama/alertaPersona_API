
import { pool } from '../../../db.js';


/** 
 ** Ver todas las alertas
 *
*/
export const getAsistentes = async () => {

    try{
        const query = 'SELECT * FROM asistente';
        let params = [];

        const [rows] = await pool.query(query, params);

        let response = [];
            
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            response.push({
                "alerta": row.asisAlerta,
                "usuario": row.asisUsuario,
                "estado": row.asisEstado,
                "observacion": row.asisObs,
            });
        };

        return response;

    }catch (err){
        throw new Error(err);
    }

}

/** 
 ** Ver una alerta por ID
 *
*/
export const getAsistente= async (asisAlerta, asisUsuario) => {

    try{
        const query = 'SELECT * FROM asistente WHERE asisAlerta = ? &&  asisUsuario = ?';
        let params = [
            alerta, usuario
        ];

        const [rows] = await pool.query(query, params);

        let response = null;
            
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            response = {
                "alerta": row.asisAlerta,
                "usuario": row.asisUsuario,
                "estado": row.asisEstado,
                "observacion": row.asisObs,
            };
        };

        return response;

    }catch (err){
        throw new Error(err);
    }

}

/** 
 ** Crea una nueva alerta
 *
 *i @param asistente: objeto con los datos necesarios de la alerta - especificado mas abajo
*/
export const insertAsistente = async (asistente) => {
     
    /** 
    {
        "idAlerta": "1",                                    //* id de la alerta
        "usuarioEmisor": "Pepe Perez",                       //* usuario emisor
        "ubicacionAlerta": "Av. Siempre Falsa 123",               //* ubicación alerta
        "estadoAlerta": "Activa",                            //* estado alerta
        "fechaEmision": "12/06/2023 18:34:03",          //* fecha emisión
        "fechaCierre": "12/06/2023 18:35:15",           //* fecha cierre
    }
    **/

    try{
                      
        const query = 'INSERT INTO asistente(asisAlerta, asisUsuario, asisEstado, asisObs) VALUES (?, ?, ?, ?)';
        let params = [
            asistente.alerta,
            asistente.usuario,
            asistente.estado,
            asistente.observacion,
            
        ];

        const [rows] = await pool.query(query, params);
        return 1;

    }catch (err){
        throw new Error(err);
    }

}

/** 
 ** Actualizar alerta
 *i @param asistente: objeto con los datos necesarios de la alerta - especificado mas abajo
*/
export const updateAsistente = async (asistente) => {
     
    /** 
    {
        "idAlerta": "1",                                    //* id de la alerta
        "usuarioEmisor": "Pepe Perez",                       //* usuario emisor
        "ubicacionAlerta": "Av. Siempre Falsa 123",               //* ubicación alerta
        "estadoAlerta": "Activa",                            //* estado alerta
        "fechaEmision": "12/06/2023 18:34:03",          //* fecha emisión
        "fechaCierre": "12/06/2023 18:35:15",           //* fecha cierre
    }
    **/

    try{

        const query = 'UPDATE asistente SET asisEstado = ?, asisObs = ? WHERE asisAlerta = ? and asisUsuario = ?';
        let params = [

            asistente.estado,
            asistente.observacion,
            asistente.alerta,
            asistente.usuario,
            
        ];

        const [rows] = await pool.query(query, params);
        return 1;

    }catch (err){
        throw new Error(err);
    }

}

/** 
 ** Eliminar una alerta
 *
 *i @param asistenteId: id de la alerta a eliminar
*/
export const deleteAsistente = async (alerta, usuario) => {

    try{
        const query = 'DELETE FROM asistente WHERE asisAlerta = ? and asisUsuario = ?';
        let params = [
           alerta,
           usuario,
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