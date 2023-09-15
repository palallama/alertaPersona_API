import * as model from "./alerta.model.js";
import * as validador from "./alerta.validator.js";

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
        const resultado = validador.validacionParcialAlerta( { "id": req.params.alertaId } );

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const ok = await model.getAlerta(resultado.data.id);
    
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

export const insertAlerta = async (req, res) => {

    try {
        const resultado = validador.validarAlerta( req.body );

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const nuevaAlerta = await model.insertAlerta(resultado.data);
    
        if (nuevaAlerta){
            res.status(201).json(nuevaAlerta);
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        // console.log(err);
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