import * as model from "./alerta.model.js";
import * as validador from "./alerta.validator.js";

import * as notificacionModel from '../notificacion/notificacion.model.js';
import * as usuarioModel from '../usuario/usuario.model.js';
import * as asistenteModel from '../asistente/asistente.model.js';

export const getAlertas = async (req, res) => {

    try {
        const alerta = await model.getAlertas();
        res.status(200).json(alerta);
    } catch (err) {
        res.status(500).json({ error: err});
    }
}

export const getAlerta = async (req, res) => {

    try {
        const resultado = validador.validacionParcialAlerta( { "id": parseInt(req.params.alertaId) } );

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const alerta = await model.getAlerta(resultado.data.id);
    
        if (alerta){
            res.status(201).json(alerta);
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }
    
}

export const insertAlerta = async (req, res) => {

    try {
        const resultado = validador.validarAlerta( req.body );
        console.log(resultado.error)

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const nuevaAlerta = await model.insertAlerta(resultado.data);
    
        if (nuevaAlerta){

            emitirAlerta(nuevaAlerta);

            res.status(201).json(nuevaAlerta);
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

}

export const updateAlerta = async (req, res) => {

    try {
        const resultado = validador.validacionParcialAlerta( req.body );

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const alerta = await model.updateAlerta(resultado.data);

        if (alerta){
            res.status(201).json(alerta);
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }

}

export const deleteAlerta = async (req, res) => {

    try {
        const resultado = validador.validacionParcialAlerta( { "id": req.params.alertaId } );

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const ok = await model.deleteAlerta(resultado.data.id);
    
        if (ok > 0){
            res.status(201).json({ ok: true });
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }

}

const emitirAlerta = async ( alerta ) => {

// 1. generar las notificaciones para los usuarios menos el emisor
// 2. enviar las notificaciones a los usuarios

    try {
        let usuarios = await usuarioModel.getUsuarios();

        if (usuarios){
            for (let i = 0; i < usuarios.length; i++) {
                const u = usuarios[i];
                
                const notificacion = {
                    usuario: u.id,
                    data: {
                        alerta: alerta.id.toString(),
                        motivo: 'A'
                    }
                }

                if (u.id !== alerta.usuario){
                    await notificacionModel.insertNotificacion(notificacion, true);
                }
            }
        }

    } catch (err) {
        console.log(err);
        // Escribir un log
    }

}

export const cerrarAlerta = async ( req, res ) => {

    try {
        const resultado = validador.validacionParcialAlerta( req.body );

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }

        // id
        // estado - accion (cancelar o solucionarla)

        const alerta = await model.cerrarAlerta(resultado.data);
        // const alerta = true;
    
        if (alerta){
            notificarALosAsistentes(alerta);

            res.status(201).json(alerta);
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

/*

    TAREA: que pasa si quiero cerrar (solucionada o cancelada) una alerta con asistentes

    - avisar a los asistentes
        * buscar en la tabla "asistente" si la alerta tiene alguno
        * obtener los usuarios asistentes
    - insertar notificacion al usuario

*/

async function notificarALosAsistentes(alerta){
    
            // tiene asistentes?
            // array de asistentes - siempre y cuando, tenga asistentes
            const asistentes = await asistenteModel.getAsistentesAlerta(alerta.id);
            console.log(asistentes);
            if (asistentes){
                // notifica, crear un registro en la tabla notificacion

                asistentes.forEach( async (asistente) => {
                    const notificacion = {
                        usuario: asistente.usuario,
                        data: {
                            alerta: alerta.id.toString(),
                            motivo: alerta.estado
                        }
                    }
                    let notiAux = await notificacionModel.insertNotificacion(notificacion,true);
                    if (notiAux){
                        // Emitir la notificacion (enviar a los celulares)
                    }else{
                        console.error("Erorr al crear la notificacion");
                    }
                } )

            }
}

/*
    id: alerta
    accion: {
        cancelo - soluciono
    }
*/

const marcarAlertaAsistente = async ( alerta, usuario ) => {

    //CONXAESUMADRE.COM
}