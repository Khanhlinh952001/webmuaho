const path = require('path');

module.exports = function override(config, env) {
  // Thêm cấu hình cho 'buffer'
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve.fallback,
      "buffer": require.resolve("buffer/")
    }
  };

  // Thêm cấu hình cho 'timers'
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve.fallback,
      "timers": require.resolve("timers-browserify")
    }
  };

  return config;
};
