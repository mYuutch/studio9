// nuxt.config.js

export default {
  // ... other Nuxt.js configurations

  build: {
    extend(config, { isDev, isClient }) {
      if (isClient) {
        config.resolve.alias['three'] = 'three';
      }
    },
  },
};
