import * as model from "./alerta.model.js";

export const getAlertas = async (req, res) => {

    try {
        const alerta = await model.getAlertas();
        res.json(alerta);
    } catch (err) {
        res.status(500).json({ error: err});
    }
}

export const getAlerta = async (req, res) => {

    try {
        const { aleId } = req.params;

        const alerta = await model.getAlerta(aleId);
        res.json(alerta);
    } catch (err) {
        res.status(500).json({ error: err});
    }
}

export const insertAlerta = async (req, res) => {

    try {
    
        const alerta = req.params.body;
        const ok = await model.insertAlerta(alerta);
    
        if (ok > 0){
            res.json({ ok: true});
        }else{
            res.status(404).json({ error: "error"});
        }

    } catch (err) {
        res.status(500).json(err);
    }

}

export const updateAlerta = async (req, res) => {

    try {
        const alerta = req.params.body;

        const ok  = await model.getAlerta(alerta);
        if (ok > 0){
            res.json({ ok: true});
        }else{
            res.status(404).json({ error: "error"});
        }
    } catch (err) {
        res.status(500).json({ error: err});
    }

}

export const deleteAlerta = async (req, res) => {

    try {
        const ok = await model.deleteAlerta(req.params.aleId);
    
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