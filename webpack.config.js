const path = require('path');

module.exports = {
 context: path.join(__dirname, 'src'),
 entry: [
   './main.js',
 ],
 output: {
   path: path.join(__dirname, 'www'),
   filename: 'bundle.js',
 },
 module: {
   loaders: [
    { test: /\.(jsx|js)?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
          presets: ['es2015', 'react']
      }
    },
    { test: /\.(scss|css)$/, 
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    },
    { test: /\.(ogg|mp3|wav)$/,
      // include: SRC,
      loader: 'file-loader'
  }
   ],
 },
 resolve: {
   modules: [
     path.join(__dirname, 'node_modules'),
     path.join(__dirname, "node_modules/tone/build/Tone.js/")
   ],
 },
};
// module.exports = {
// 	resolve: {
// 		root: __dirname,
//                 // for webpack 1:
// 		modulesDirectories : ["path/to/Tone.js/"],
//                 // for webpack 2:
//                 modules : ["path/to/Tone.js/"]
//     }
// }