const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: path.join(__dirname, '/src/index.js'),
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'assets/'
				}
			},
			{
				// For modules' CSS imports
				test: /\.css$/i,
				exclude: /components.+\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				// For CSS modules
				test: /components.+\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[path][name]__[local]--[hash:base64:5]'
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: path.join(__dirname, '/public/index.html') })
	]
};

module.exports = config;
