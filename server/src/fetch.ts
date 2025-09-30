import makeFetch from 'make-fetch-happen';
import CacheSemantics from 'http-cache-semantics';

const ttl = process.env.HTTP_CACHE_TTL ?? '7200';

const originalFn = CacheSemantics.prototype.satisfiesWithoutRevalidation;
CacheSemantics.prototype.satisfiesWithoutRevalidation = function(req) {
	req.headers['cache-control'] = `max-age=${ttl}`; // add max-age header to enforce ttl
	(this as any)._rescc['max-age'] = `${ttl}`;

	return originalFn.call(this, req);
}

export const fetchWithCache = makeFetch.defaults({
	cachePath: process.env.HTTP_CACHE_PATH ?? './.http-cache',
	cache: 'default'
});