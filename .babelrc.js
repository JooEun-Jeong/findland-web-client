module.exports = function (api) {
  api.cache(true);

  const presets = [
    '@babel/preset-react',
    '@babel/preset-typescript',
    ['@babel/preset-env', { modules: false }],
  ];

  const plugins = [
    ['babel-plugin-direct-import', { modules: ['@mui/material', '@mui/icons-material'] }],
    ['@babel/plugin-transform-runtime'],
  ];

  if (process.env.NODE_ENV === 'development') {
    plugins.push('react-refresh/babel');
  }

  return {
    presets,
    plugins,
    env: {
      production: {
        presets: ['minify'],
      },
    },
  };
};
