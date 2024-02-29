import * as model from "./asistente.model.js";

export const getAsistentes = async (req, res, next) => {
    try {
        const asistentes = await model.getAsistentes();
        res.status(200).json({
            success: true,
            data: asistentes
        });
    } catch (err) {
        next(err);
    }
}

export const getAsistente = async (req, res, next) => {

    try {
        const { alerta, usuario } = req.params;
        const asistente = await model.getAsistente(alerta, usuario);

        if (asistente){
            res.status(200).json({
                success: true,
                data: asistente
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

export const insertAsistente = async (req, res, next) => {

    try {
        const { body } = req;
        const asistente = await model.insertAsistente(body);

        if (asistente){
            res.status(201).json({
                success: true,
                data: asistente
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

export const updateAsistente = async (req, res, next) => {

    try {
        const { body } = req;
        const asistente = await model.updateAsistente(body);

        if (asistente){
            res.status(200).json({
                success: true,
                data: asistente
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

export const deleteAsistente = async (req, res, next) => {
    try {
        const { alerta, usuario } = req.params;
        const ok = await model.deleteAsistente(alerta, usuario);
    
        if (ok){
            res.status(200).json({
                success: true,
                data: { alerta: alerta, usuario: usuario }
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
