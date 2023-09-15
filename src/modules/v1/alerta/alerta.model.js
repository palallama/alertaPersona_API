
import { pool } from '../../../db.js';


/** 
 ** Ver todas las alertas
 *
*/
export const getAlertas = async () => {

    try{
        const query = 'SELECT * FROM alerta';
        let params = [];

        const [rows] = await pool.query(query, params);

        let response = [];
            
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            response.push({
                "idAlerta": row.aleId,
                "usuarioEmisor": row.aleUsuario,
                "ubicacionAlerta": row.aleUbi,
                "estadoAlerta": row.aleEstado,
                "fechaEmision": row.aleFchEmision,
                "fechaCierre": row.aleFchCierre,
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
export const getAlerta= async (aleId) => {

    try{
        const query = 'SELECT *, ST_Longitude(alertaUbi) AS longitude, ST_Latitude(alertaUbi) AS latitude FROM alerta WHERE aleId = ?';
        let params = [
            aleId
        ];

        const [rows] = await pool.query(query, params);

        let response = null;
            
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            response = {
                "idAlerta": row.aleId,
                "usuarioEmisor": row.aleUsuario,
                "ubicacionAlerta": row.aleUbi,
                "estadoAlerta": row.aleEstado,
                "fechaEmision": row.aleFchEmision,
                "fechaCierre": row.aleFchCierre,
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
 *i @param alerta: objeto con los datos necesarios de la alerta - especificado mas abajo
*/
export const insertAlerta = async (alerta) => {

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

        const query = 'INSERT INTO alerta(aleId, alertaUsuario, alertaUbi, alertaEstado, aleFchEmision, aleFchCierre) VALUES (?, ?, ST_GeomFromText(\'POINT(? ?)\', 4326), \'I\', ?, ?, ?)';
        let params = [
            alerta.id,
            alerta.emisor,
            alerta.ubicacion,
            alerta.estado,
            alerta.fechaEmision,
            alerta.fechaCierre,
        ];

        const [rows] = await pool.query(query, params);
        return 1;

    }catch (err){
        throw new Error(err);
    }

}

/** 
 ** Actualizar alerta
 *i @param alerta: objeto con los datos necesarios de la alerta - especificado mas abajo
*/
export const updateAlerta = async (alerta) => {

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

        const query = 'UPDATE alerta SET  aleUsuario = ?, aleUbi = ?, aleEstado = ?, aleFchEmision = ?, aleFchCierre =? WHERE aleId = ?';
        let params = [

            alerta.emisor,
            alerta.ubicacion,
            alerta.estado,
            alerta.fechaEmision,
            alerta.fechaCierre,
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
 *i @param alertaId: id de la alerta a eliminar
*/
export const deleteAlerta = async (alertaId) => {

    try{
        const query = 'DELETE FROM alerta WHERE aleId = ?';
        let params = [
            alertaId
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