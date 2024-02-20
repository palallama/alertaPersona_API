import { sendFcmMessage } from "../../../helpers/fcm.js";
import * as model from "./notificacion.model.js";
import * as usuarioModel from "../usuario/usuario.model.js";
import * as validador from "./notificacion.validator.js";

import { getMessaging } from 'firebase-admin/messaging';

export const getNotificaciones = async (req, res) => {

    try {
        const notis = await model.getNotis();
        res.json(notis);
    } catch (err) {
        res.status(500).json({ error: err});
    }
}

export const getNotificacion = async (req, res) => {

    try {
        const { notificacionId } = req.params;

        const noti = await model.getNotificaciones(notificacionId);
        res.json(noti);
    } catch (err) {
        res.status(500).json({ error: err});
    }
}

export const insertNotificacion = async (req, res) => {

    try {

        const resultado = validador.validarNotificacion(req.body);

        if (!resultado.success) {
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const nuevaNotificacion = await model.insertNotificacion(resultado.data);
    
        if (nuevaNotificacion != null){
            res.status(201).json(nuevaNotificacion);
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }

}

export const updateNotificacion = async (req, res) => {

    try {
        const resultado = validador.validacionParcialNotificacion(req.body);

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const notificacion = await model.updateNotificacion(resultado.data);
    
        if (notificacion != null){
            res.status(201).json(notificacion);
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }

}

export const deleteNotificacion = async (req, res) => {

    try {
        const ok = await model.deleteNotificacion(req.params.notificacionId);
    
        if (ok > 0){
            res.json({ ok: true});
        }else{
            res.status(404).json({ error: "error"});
        }
    } catch (err) {
        res.status(500).json({ error: err});
    }
}
    

export const marcarLeidaNotificacion = async (req, res) => {
    try {
        const resultado = validador.validacionParcialNotificacion( { "id": req.params.notificacionId } );

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const ok = await model.marcarLeidaNotificacion(resultado.data.id);
    
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



export const updateNotiMotivo = async (req, res) => {

    try {
        const resultado = validador.validacionParcialNotificacion(req.body);

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const notificacion = await model.updateNotiMotivo(resultado.data);
    
        if (notificacion != null){
            res.status(201).json(notificacion);
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }

}

export const enviarNotificacion = async (req, res) => {

    try {
        
        // const registrationToken = 'fZcWyQCzQRC5zTc5IPFQaZ:APA91bEUi1GKfVbD82xS-Gdg08GChlr5r3U5e2LfRlhwYagvnVTF4-UYDNk-WB1L61hUVzrlXgSaNUzV3IsrUMzrGYBESFQUPbaZ8xvKvXm9E6nARjsWSUzYG0VkaNJoPH5xi8mthZDL';
        const registrationToken = await usuarioModel.getTokenNotificacion(3);

        const message = {
            'message': {
              'token': registrationToken,
              'notification': {
                'title': 'Nueva alerta',
                'body': 'Se emitio una nueva alerta'
              },
              'data': {
                'motivo': 'A',
                'alerta': '16'
              }
            }
        }

        res.status(200).json(sendFcmMessage(message))

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}

