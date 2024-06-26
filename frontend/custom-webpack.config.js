module.exports = {
  devServer: {
    static: {
      watch: {
        ignored: [/src\/assets\/admin_lte/, /node_modules/],
      }
    }
  },
  watchOptions: {
    ignored: ['**/node_modules', '**/src/assets'],
  },
  resolve: {fallback: {"util": false, "path": false, "child_process": false, "fs": false,  "stream": false, "os": false  }},
};
