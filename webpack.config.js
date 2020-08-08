const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
module.exports = {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		open: {
			app: ["chrome", "--remote-debugging-port=9222"]
		},
		contentBase: './dist',
		hot: true,
	},
	/*optimization: {
		minimizer: [new UglifyJsPlugin()]
	},*/
	entry: './app/js/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname,'dist')
	},
	module: {
		rules: [
		{
			test: /\.scss$/,
			use: [
				'style-loader',
				//MiniCssExtractPlugin.loader,
				'css-loader',
				//{
				//	loader: 'postcss-loader',
                //    options: {
                //        plugins: () => [autoprefixer({ browsers: ['iOS >= 7', 'Android >= 4.1'] }),
				//		cssnano()]
                //        }
               //},
				'sass-loader'
			]
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: ['babel-loader'] 
		},
		{
			test: /\.(png|svg|jpg|gif)$/,
			use: [
				'file-loader'
			]
		},
		{
			test: /\.html$/,
			use: [
				'html-loader'
			]
		}	
		]
	},
	plugins: [
		//new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './app/index.temp.html',
			inject: 'body',
		}),
		new webpack.HotModuleReplacementPlugin(),
		/*new MiniCssExtractPlugin({
		filename: 'main.css'
		})*/
		]
};