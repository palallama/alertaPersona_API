import { createToken } from "../../../helpers/jwt.js";
import * as model from "./usuario.model.js";

export const getUsuarios = async (req, res, next) => {
    try {
        const usuarios = await model.getUsuarios();
        if (usuarios){
            res.status(200).json({
                success: true,
                data: usuarios
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

export const getUsuario = async (req, res, next) => {
    try {
        const { usuarioId } = req.params;
        const usuario = await model.getUsuario(usuarioId);

        if (usuario){
            res.status(200).json({
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

export const insertUsuario = async (req, res, next) => {
    try {
        const { body } = req;
        const usuario = await model.insertUsuario(body);

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

export const updateUsuario = async (req, res, next) => {
    try {
        const { body } = req;
        const usuario = await model.updateUsuario(body);

        if (usuario){
            res.status(200).json({
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

export const deleteUsuario = async (req, res, next) => {
    try {
        const { usuarioId } = req.params;
        const ok = await model.deleteUsuario(usuarioId);
    
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

export const iniciarSesion = async (req, res, next) => {
    try {
        const { mail, password } = req.body;
        const usuarioId = await model.existeUsuario(mail, password);
    
        if (usuarioId){
            res.setHeader('auth-token', createToken({ mail: mail, usuarioId: usuarioId }));
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


export const cambiarContrasena = async (req, res, next) => {
    try {
        const { body } = req;
        const usuario = await model.cambiarContrasena(body);
    
        if (usuario){
            res.status(200).json({
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

export const setTokenNotificacionUsuario = async (req, res, next) => {
    try {
        const { body } = req;
        const usuario = await model.setTokenNotificacion(body);

        if (usuario){
            res.status(200).json({
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

export const verHistorial = async (req, res, next) => {
    try {
        const { usuarioId } = req.params;
        // hacer la busqueda de historiales
        const alertasEmitidas = await model.getHistorialAlertasEmitidas(usuarioId);
        const alertasAcudidas = await model.getHistorialAlertasAcudidas(usuarioId);

        res.status(201).json({
            success: true,
            data: {
                emitidas: alertasEmitidas,
                acudidas: alertasAcudidas
            }
        });
    
    } catch (err) {
        next(err);
    }
}