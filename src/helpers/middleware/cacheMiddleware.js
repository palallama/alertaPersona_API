import { DEV } from "../../config.js";

export const createCacheMiddleware = (seconds, _isCacheActived = !DEV) => {
	return function cacheMiddleware(req, res, next) {
		if (_isCacheActived) {
			res.set("CacheControl", 'public, max-age='+seconds);
		}
		next();
	}
}