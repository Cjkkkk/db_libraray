var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'static/js');
var APP_DIR = path.resolve(__dirname, 'dev/jsx');

var config = {
  	entry: APP_DIR + '/index.jsx',
  	output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  	devServer: {
		inline: true,
		contentBase: __dirname,
		port: 7000,
		proxy: {
			"/api": "http://localhost:8000"
			},
	},
  	module: {
    	rules:[
			{
			  test: /\.jsx?$/,
			  loader: 'babel-loader',
			  exclude: /node_modules/,
			  query: {
				  presets: ['es2015']
			  }
		}
	  ]  
  	}
};

module.exports = config;