const path = require('path');

module.exports = {
  entry: './js/labyrinth/graphics.js',  // The entry point of your application
  output: {
    filename: 'bundle.js',  // The name of the bundled file
    path: path.resolve(__dirname, 'js'),  // The output directory
  },
};