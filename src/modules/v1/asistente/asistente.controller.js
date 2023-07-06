import * as model from "./asistente.model.js";

export const getAsistentes = async (req, res) => {

    try {
        const asistente = await model.getAsistentes();
        res.json(asistente);
    } catch (err) {
        res.status(500).json({ error: err});
    }
}

export const getAsistente = async (req, res) => {

    try {
        const { alerta, usuario } = req.params;

        const asistente = await model.getAsistente(alerta, usuario);
        res.json(asistente);
    } catch (err) {
        res.status(500).json({ error: err});
    }
}

export const insertAsistente = async (req, res) => {

    try {
    
        const asistente = req.params.body;
        const ok = await model.insertAsistente(asistente);
    
        if (ok > 0){
            res.json({ ok: true});
        }else{
            res.status(404).json({ error: "error"});
        }

    } catch (err) {
        res.status(500).json(err);
    }

}

export const updateAsistente = async (req, res) => {

    try {
        const asistente = req.params.body;

        const ok  = await model.getAsistente(asistente);
        if (ok > 0){
            res.json({ ok: true});
        }else{
            res.status(404).json({ error: "error"});
        }
    } catch (err) {
        res.status(500).json({ error: err});
    }

}

export const deleteAsistente = async (req, res) => {

    try {
        const ok = await model.deleteAsistente(req.params.alerta, req.params.usuario);
    
        if (ok > 0){
            res.json({ ok: true});
        }else{
            res.status(404).json({ error: "error"});
        }
    } catch (err) {
        res.status(500).json({ error: err});
    }
}

/*export const iniciarSesion = async (req, res) => {

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
//}*/