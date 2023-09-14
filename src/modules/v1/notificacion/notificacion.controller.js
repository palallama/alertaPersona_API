import * as model from "./notificacion.model.js";

export const getNotis = async (req, res) => {

    try {
        const notis = await model.getNotis();
        res.json(notis);
    } catch (err) {
        res.status(500).json({ error: err});
    }
}

export const getNoti = async (req, res) => {

    try {
        const { notiId } = req.params;

        const noti = await model.getNoti(notiId);
        res.json(noti);
    } catch (err) {
        res.status(500).json({ error: err});
    }
}

export const insertNoti = async (req, res) => {

    try {
    
        const noti = req.params.body;
        const ok = await model.insertNoti(noti);
    
        if (ok > 0){
            res.json({ ok: true});
        }else{
            res.status(404).json({ error: "error"});
        }

    } catch (err) {
        res.status(500).json(err);
    }

}

export const updateNoti = async (req, res) => {

    try {
        const noti = req.params.body;

        const ok  = await model.getNoti(noti);
        if (ok > 0){
            res.json({ ok: true});
        }else{
            res.status(404).json({ error: "error"});
        }
    } catch (err) {
        res.status(500).json({ error: err});
    }

}

export const deleteNoti = async (req, res) => {

    try {
        const ok = await model.deleteNoti(req.params.notiId);
    
        if (ok > 0){
            res.json({ ok: true});
        }else{
            res.status(404).json({ error: "error"});
        }
    } catch (err) {
        res.status(500).json({ error: err});
    }
}
/*
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
}*/