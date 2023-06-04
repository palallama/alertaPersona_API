import * as model from "./usuario.model.js";

export const getUsuarios = async (req, res) => {

    try {
        const usuarios = await model.getUsuarios();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err});
    }
}