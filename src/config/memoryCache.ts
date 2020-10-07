import { caching } from 'cache-manager';

const memoryCache = caching({store: 'memory', max: 0, ttl: 86400/*seconds*/});
export const novelCache = caching({store: 'memory', max: 0, ttl: 86400})

export default memoryCache;