import * as model from "./usuario.model.js";
import * as validador from "./usuario.validator.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../../config.js";

export const getUsuarios = async (req, res) => {

    try {
        const usuarios = await model.getUsuarios();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err});
    }
}

export const getUsuario = async (req, res) => {

    try {
        const { usuarioId } = req.params;

        const usuario = await model.getUsuario(usuarioId);
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: err});
    }
}

export const insertUsuario = async (req, res) => {

    try {

        const resultado = validador.validarUsuario(req.body);
        console.log(resultado);

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const nuevoUsuario = await model.insertUsuario(resultado.data);
    
        if (nuevoUsuario != null){
            res.status(201).json(nuevoUsuario);
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }

}

export const updateUsuario = async (req, res) => {

    try {

        const resultado = validador.validacionParcialUsuario(req.body);
        // console.log(resultado);

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const usuario = await model.updateUsuario(resultado.data);
    
        if (usuario != null){
            res.status(201).json(usuario);
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }

}

export const deleteUsuario = async (req, res) => {

    try {
        const ok = await model.deleteUsuario(req.params.usuarioId);
    
        if (ok > 0){
            res.json({ ok: true});
        }else{
            res.status(404).json({ error: "error"});
        }
    } catch (err) {
        res.status(500).json({ error: err});
    }
}

export const iniciarSesion = async (req, res) => {

    try {

        const login = {
            "mail": req.query.mail,
            "password": req.query.password
        }

        const resultado = validador.validacionParcialUsuario(login);
        // console.log(resultado);

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        console.log(resultado.data)
        const usuId = await model.existeUsuario(resultado.data.mail, resultado.data.password);
    
        if (usuId > 0){
            const token = jwt.sign({
                mail: resultado.data.mail,
                id: usuId
            }, TOKEN_SECRET, { expiresIn: '1h' })

            res.setHeader('auth-token', token).status(200).json({
                error: null,
                data: {token}
            });
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            data: null
        });
    }

}


export const cambiarContrasena = async (req, res) => {

    try {

        const resultado = validador.validacionParcialUsuario(req.body);
        console.log(resultado);

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const usuario = await model.cambiarContrasena(resultado.data);
    
        if (usuario != null){
            res.status(201).json(usuario);
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }

}