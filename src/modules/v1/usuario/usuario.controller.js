import * as model from "./usuario.model.js";

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
    
        const usuario = req.params.body;
        const ok = await model.insertUsuario(usuario);
    
        if (ok > 0){
            res.json({ ok: true});
        }else{
            res.status(404).json({ error: "error"});
        }

    } catch (err) {
        res.status(500).json(err);
    }

}

export const updateUsuario = async (req, res) => {

    try {
        const usuario = req.params.body;

        const ok  = await model.getUsuario(usuario);
        if (ok > 0){
            res.json({ ok: true});
        }else{
            res.status(404).json({ error: "error"});
        }
    } catch (err) {
        res.status(500).json({ error: err});
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
        const { mail, password } = req.query;

        const ok = await model.existeUsuario(mail, password);
    
        if (ok > 0){
            res.json({ ok: true});
        }else{
            res.status(404).json({ error: "error"});
        }
    } catch (err) {
        res.status(500).json({ error: err});
    }
}