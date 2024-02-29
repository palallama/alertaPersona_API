import * as model from "./alerta.model.js";

import * as notificacionModel from '../notificacion/notificacion.model.js';
import * as usuarioModel from '../usuario/usuario.model.js';
import * as asistenteModel from '../asistente/asistente.model.js';

export const getAlertas = async (req, res, next) => {
    try {
        const alertas = await model.getAlertas();
        res.status(200).json({
            success: true,
            data: alertas
        });
    } catch (err) {
        next(err);
    }
}

export const getAlerta = async (req, res, next) => {
    try {
        const { alertaId } = req.params
        const alerta = await model.getAlerta(alertaId);

        if (alerta){
            res.status(200).json({
                success: true,
                data: alerta
            });
        }else{
            res.status(404).json({
                success: false,
                data: {
                    message: "Not found"
                }
            });
        }
    } catch (err) {
        next(err);
    }
}

export const insertAlerta = async (req, res, next) => {
    try {
        const { body } = req;
        const alerta = await model.insertAlerta(body);

        if (alerta){
            res.status(201).json({
                success: true,
                data: alerta
            });
        }else{
            res.status(404).json({
                success: false,
                data: {
                    message: "Not found"
                }
            });
        }
    } catch (err) {
        next(err);
    }
}

export const updateAlerta = async (req, res, next) => {
    try {
        const { body } = req;
        const alerta = await model.updateAlerta(body);

        if (alerta){
            res.status(200).json({
                success: true,
                data: alerta
            });
        }else{
            res.status(404).json({
                success: false,
                data: {
                    message: "Not found"
                }
            });
        }
    } catch (err) {
        next(err);
    }
}

export const deleteAlerta = async (req, res, next) => {
    try {
        const { alertaId } = req.params
        const ok = await model.deleteAlerta(alertaId);
    
        if (ok){
            res.status(200).json({
                success: true,
                data: { alertaId: alertaId }
            });
        }else{
            res.status(404).json({
                success: false,
                data: {
                    message: "Not found"
                }
            });
        }
    } catch (err) {
        next(err);
    }
}

export const cerrarAlerta = async ( req, res ) => {
    try {
        const { body } = req;
        const alerta = await model.cerrarAlerta(body);
    
        if (alerta){
            res.status(200).json({
                success: true,
                data: alerta
            });
        }else{
            res.status(404).json({
                success: false,
                data: {
                    message: "Not found"
                }
            });
        }
    } catch (err) {
        next(err);
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