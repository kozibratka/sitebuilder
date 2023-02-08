module.exports = {
  devServer: {
    static: {
      watch: {
        ignored: [/src\/assets\/admin_lte/, /node_modules/],
      }
    }
  },
};
