const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: path.join(__dirname, '/src/index.js'),
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: "assets/"
						}
					}
				]
			},
			{
				test: /\.css$/,
				loader: 'style-loader'
			},
			{
				test: /\.css$/,
				loader: 'css-loader',
				query: {
					modules: {
						localIdentName: '[name]__[local]___[hash:base64:5]'
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: path.join(__dirname, '/public/index.html') })
	]
};

module.exports = config;
