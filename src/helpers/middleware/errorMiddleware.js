import { DEV } from "../../config.js";

export const withErrorStack = (error, stack) => {
	if (!DEV) {
        return { ...error, stack };
    }
    return error;
}

export const logErrors = (err, req, res, next) => {
    console.error(err);
    next(err);
}

export const wrapErrors = (err, req, res, next) => {
    const BadImplementationError = {
        stack: err.stack,
        output: {
            statusCode: 500,
            payload: {
                error: "Internal server error",
                message: err.message
            }
        }
    }

    next(BadImplementationError)
}

export const errorHandler = (err, req, res, next) => {
    const { stack, output } = err;
    res.status(output.statusCode);
    res.json(withErrorStack(output.payload, stack));
}
