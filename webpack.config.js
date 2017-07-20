const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	devtool: 'inline-source-map',
	entry : [
	'webpack-hot-middleware/client',
	'./app/client.js'
	],
	output: {
		path: require('path').resolve('./app/src/dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin('style.css')
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react', 'react-hmre']
				}
			},
			{
			  test: /\.css/,
			  loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
			},
			{
		      test: /\.(png|jpg|gif|svg)$/,
		      loader: 'file-loader',
		      options: {
		        name: '[name].[ext]?[hash]'
		      }
		    }
		]
	},
	devServer: {
		historyApiFallback: true
	},
	node: {
		dns: 'empty',
		net: 'empty'
	}
}
