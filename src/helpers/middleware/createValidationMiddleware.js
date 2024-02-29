
// @param {Object} validationSchema - { K in "body" | "query" | "params": validatorEsquema}
export const createValidationMiddleware = (validationSchema) => {
	const [[payloadKey, validador]] = Object.entries(validationSchema);

	if (
		payloadKey !== "body" &&
		payloadKey !== "query" &&
		payloadKey !== "params"
	) {
		throw new Error("Payload invalido, al menos debe tener uno de los keys 'body', 'query' or 'params'")
	}

	return function validationMiddleware(req, res, next) {
        const resultado = validador(req[payloadKey]);
        console.log(resultado);
        if (!resultado.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: resultado })
        }
        next();
	};
}
