import { sendFcmMessage } from "../../../helpers/fcm.js";
import * as model from "./notificacion.model.js";
import * as usuarioModel from "../usuario/usuario.model.js";

export const getNotificaciones = async (req, res, next) => {
    try {
        const notificaciones = await model.getNotificaciones();
        res.status(200).json({
            success: true,
            data: notificaciones
        });
    } catch (err) {
        next(err);
    }
}

export const getNotificacion = async (req, res, next) => {
    try {
        const { notificacionId } = req.params;
        const notificacion = await model.getNotificaciones(notificacionId);

        if (notificacion){
            res.status(200).json({
                success: true,
                data: notificacion
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

export const insertNotificacion = async (req, res, next) => {
    try {
        const { body } = req;
        const nuevaNotificacion = await model.insertNotificacion(resultado.data);

        if (usuario){
            res.status(201).json({
                success: true,
                data: usuario
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

export const updateNotificacion = async (req, res, next) => {
    try {
        const { body } = req;
        const nuevaNotificacion = await model.updateNotificacion(resultado.data);

        if (usuario){
            res.status(201).json({
                success: true,
                data: usuario
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

export const deleteNotificacion = async (req, res, next) => {
    try {
        const { notificacionId } = req.params;
        const ok = await model.deleteNotificacion(notificacionId);
    
        if (ok){
            res.status(200).json({
                success: true,
                data: { notificacionId: notificacionId }
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

export const marcarLeidaNotificacion = async (req, res, next) => {
    try {
        const { notificacionId } = req.params;
        const ok = await model.marcarLeidaNotificacion(notificacionId);
    
        if (ok){
            res.status(200).json({
                success: true,
                data: { usuarioId: usuarioId }
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

export const updateNotiMotivo = async (req, res, next) => {
    try {
        const { body } = req;
        const notificacion = await model.updateNotiMotivo(body);

        if (notificacion){
            res.status(200).json({
                success: true,
                data: notificacion
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