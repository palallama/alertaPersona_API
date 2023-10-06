import * as model from "./asistente.model.js";
import * as validador from "./asistente.validator.js";

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
        const resultado = validador.validacionParcialAsistente( { "alerta": req.params.alerta, "usuario": req.params.usuario } );

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const ok = await model.getAsistente(resultado.data.alerta, resultado.data.usuario);
    
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

export const insertAsistente = async (req, res) => {

    try {
        const resultado = validador.validarAsistente(req.body);

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const nuevoAsistente = await model.insertAsistente(resultado.data);
    
        if (nuevoAsistente != null){
            res.status(201).json(nuevoAsistente);
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }

}

export const updateAsistente = async (req, res) => {

    try {
        const resultado = validador.validacionParcialAsistente(req.body);

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const asistente = await model.updateAsistente(resultado.data);
    
        if (asistente != null){
            res.status(201).json(asistente);
        }else{
            res.status(404).send('error');
        }

    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }

}

export const deleteAsistente = async (req, res) => {

    try {
        const resultado = validador.validacionParcialAsistente( { "alerta": req.params.alerta, "usuario": req.params.usuario } );

        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(resultado.error.message) })
        }
        const ok = await model.deleteAsistente(resultado.data.alerta, resultado.data.usuario);
    
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
