import NodeCache from 'node-cache';

export const cache = new NodeCache({ stdTTL: 300, useClones: false }); // 5 minutes cache TTL

export const cacheKeys = {
  BOOTSTRAP: 'bootstrap_data'
};

export const invalidateBootstrapCache = () => {
  cache.del(cacheKeys.BOOTSTRAP);
  console.log('Bootstrap cache invalidated successfully');
};
