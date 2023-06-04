
import { pool } from '../../../db.js';


/** 
 ** Ver todos los usuarios
 *
*/
export const getUsuarios = async () => {

    try{
        const query = 'SELECT * FROM usuario';
        let params = [];

        const [rows] = await pool.query(query, params);

        let response = [];
            
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            response.push({
                "id": row.usuId,
                "nombre": row.usuNombre,
                "apellido": row.usuApellido,
                "dni": row.usuDni,
                "telefono": row.usuTelefono,
                "nroTramite": row.usuNroTramite,
                "mail": row.usuMail,
                "validado": row.usuValidado,
                "activo": row.usuActivo,
            });
        };

        return response;

    }catch (err){
        throw new Error(err);
    }

}