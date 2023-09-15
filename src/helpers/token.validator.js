import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) return res.status(401).json({ error: 'Acceso denegado' });

    try {
        const verificado = jwt.verify(token, process.env.TOKEN_SECRET);
        next()
    } catch (err) {
        res.status(400).json({ error: 'token invalido' });
    }

}