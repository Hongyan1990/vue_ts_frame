const path = require('path')
const merge = require('webpack-merge')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const baseConfig = require('./webpack.config.base.js')

const config = merge(baseConfig, {
	mode: 'development',
	output: {
		publicPath: '/dist/',
		filename: '[name].bundle.js'
	},
	devServer: {
		port: 8000,
    	host: '0.0.0.0',
		hot: true,
		headers: { 'Access-Control-Allow-Origin': '*' },
	    proxy: {
	      '/api': {
	        target: 'http://192.168.18.99:8080',
	        changeOrigin: true
	      }
	    },
		contentBase: path.join(__dirname, '../dist'),
		historyApiFallback:  {
	      index: '/dist/index.html'
	    }
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				use: [{
					loader: 'file-loader'
				}]
			}
		]
	},
	plugins: [
		new HotModuleReplacementPlugin(),
	],
	devtool: 'source-map'
})

module.exports = config
