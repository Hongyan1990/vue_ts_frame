const path = require('path')
const merge = require('webpack-merge')
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')

const config = merge(baseConfig, {
	mode: 'production',
	output: {
    	filename: 'js/[name].[contentHash].bundle.js'
  	},
	module: {
		rules: [
			{
			    test: /\.css$/,
				use: [
					{
			    	loader: MiniCssExtractPlugin.loader,
						options: {
			    		publicPath:  './css'
						}
					},
					'css-loader'
				] // 提取css
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: './css',
						publicPath: './'
					}
				}]
			}
		]
	},
	plugins: [
		// 提取css到单独文件
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash].css',
			chunkFilename: 'css/[id].[hash].css'
		})
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'commons',
					chunks: 'initial',
					minChunks: 2
				}
			}
		},
		// minimizer: [new UglifyJsPlugin()]
	}
})

module.exports = config
