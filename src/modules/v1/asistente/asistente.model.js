
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
 ** Crea un asistente
 *
 *i @param asistente: objeto con los datos necesarios - especificado mas abajo
*/
export const insertAsistente = async (asistente) => {

    /** 
    {
        "alerta": 1,                //* id de la alerta
        "usuario": 1,               //* id del usuario
        "observaciones": "obs",     //* alguna observacion
    }
    **/

    try{

        const query = 'INSERT INTO asistente(asisAlerta, asisUsuario, asisEstado, asisObs) VALUES (?, ?, ?, ?)';
        let params = [
            asistente.alerta,
            asistente.usuario,
            asistente.estado, //asistio, /cancelo, rechazo/--> observacion
            asistente.observacion
        ];

        const [rows] = await pool.query(query, params);
        return asistente;

    }catch (err){
        throw new Error(err);
    }

}

/** 
 ** Actualizar alerta
 *i @param asistente: objeto con los datos necesarios de la alerta - especificado mas abajo
*/
export const updateAsistente = async (asistente) => {
    try{

        const query = 'UPDATE asistente SET asisObs = ? WHERE asisAlerta = ? and asisUsuario = ?';
        let params = [
            asistente.observacion,
            asistente.alerta,
            asistente.usuario
        ];

        const [rows] = await pool.query(query, params);
        return {
            ...asistente
        };

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

export const getAsistentesAlerta = async (alerta) => {

    try {
        console.log(alerta);

        const query = 'SELECT * FROM asistente WHERE asisAlerta = ?';
        const params = [
            alerta
        ]
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
        
    } catch (err) {
        throw new Error(err);
    }

}
