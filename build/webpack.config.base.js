const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: {app: path.resolve(__dirname, '../src/main.ts')},
	output: {

		path: path.resolve(__dirname, '../dist')
	},
	resolve: {
	    extensions: ['.js', '.vue', '.json', '.ts'],
	    alias: {
				'vue$':'vue/dist/vue.esm.js',
				'@': path.resolve(__dirname, '..', 'src')
	    }
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					{
						loader: 'ts-loader',
						options: {
							appendTsxSuffixTo: [/\.vue$/]
						}
					},
					{
						loader: 'tslint-loader'
					}
				]
			},
			{
				test: /\.(jpg|jpeg|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024 * 20,
							fallback: 'file-loader',
							outputPath: './img'
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLPlugin({template: path.join(__dirname, 'template.html')}),
		new VueLoaderPlugin()
	]
}