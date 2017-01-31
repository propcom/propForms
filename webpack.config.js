const path = require('path');
const webpack = require('webpack');

module.exports = {

	watch: true,
	entry: `./src/PropForms/PF.js`,
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'PropForms.min.js'
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	]
};