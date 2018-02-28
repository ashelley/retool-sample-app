const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app:'./src/App.js',
    vendor:['@retool/app','@retool/standard-controls']
  },
  devServer:{
      contentBase:"./public",
      historyApiFallback: true,
      watchContentBase:true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public')
  },
  module: {
    rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
              'babel-loader'
          ]
        }
    ]
  },  
  externals: {
    react:'React',
    "react-dom":'ReactDOM'
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({name:"vendor",filename:'vendor.js'}),
  ]
};