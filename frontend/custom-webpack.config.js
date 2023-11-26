module.exports = {
  devServer: {
    static: {
      watch: {
        ignored: [/src\/assets\/admin_lte/, /node_modules/],
      }
    }
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {fallback: {"util": false}},
};
