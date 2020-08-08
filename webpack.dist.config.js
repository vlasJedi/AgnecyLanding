const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const MinifyPlugin = require("babel-minify-webpack-plugin");
module.exports = {
	mode: "production",
    entry: './app/js/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname,'dist')
	},
	optimization: {
		minimizer: [/*new UglifyJsPlugin(),*/new OptimizeCssAssetsPlugin({})]
	},
	module: {
		rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: ['babel-loader'] 
		},
      {
        test: /\.scss$/,
        use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				{
					loader: 'postcss-loader',
                    options: {
                        plugins: () => [autoprefixer({ browsers: ['iOS >= 7', 'Android >= 4.1'] }),
						cssnano()]
                        }
               },
				'sass-loader'
        ]
      },
	  {
			test: /\.(png|svg|jpg|gif)$/,
			use: [{
				loader: 'file-loader',
				options: {
					outputPath: 'img/',
					name: '[name].[ext]'
				}
			}]
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
		new MinifyPlugin(),
		new MiniCssExtractPlugin({
		filename: 'main.css'
    })
  ]
};