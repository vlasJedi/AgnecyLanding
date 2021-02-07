const path = require('path');
// at the moment is used @next version(tag) of HTMLWebpackPlugin because it is not migrated to Webpack 5
//By default, the latest tag is used by npm to identify the current version of a package, 
// and npm install (without any @ or @ specifier) 
// installs the latest tag. Typically, projects only use the
// "latest" tag for stable release versions, and use other tags for unstable versions such as prereleases.
// The next tag is used by some projects to identify the upcoming version.
// By default, other than latest, no tag has any special significance to npm itself.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
// The process.argv property returns an array containing the command line arguments
//  passed when the Node.js process was launched. 
// The first element will be process.execPath (node.js path). 
// See process.argv0 if access to the original value of argv[0] is needed. 
// The second element will be the path to the JavaScript file being executed. 
// The remaining elements will be any additional command line arguments.
module.exports = (env, argv) => {
    // by default webpack uses production mode
    // passing as cli webpack --mode=development
    //const mode = ;
    return {
        mode: !argv.mode || argv.mode === 'development' ? 'development' : 'production',
        devtool: 'source-map',
        devServer: {
            open: {
                // opens specified application with port
                app: ["chrome", "--remote-debugging-port=9222"]
            },
            contentBase: './dist',
            hot: true,
        },
        // very useful feature to avoid complicated imports due to relative filepaths
        resolve: {
            alias: {
                "@app": path.resolve(__dirname,"./app")
            }
        },
        optimization: this.mode === 'production' ? ({
            minimizer: [/*new UglifyJsPlugin(),*/new OptimizeCssAssetsPlugin({})]
        }) : undefined,
        entry: './app/bundles/index.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: this.mode === 'production'
                        // prod
                        ? [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => [autoprefixer({ browsers: ['iOS >= 7', 'Android >= 4.1'] }),
                                    cssnano()]
                                }
                            }, 'sass-loader']
                        //dev  
                        : [
                            'style-loader',
                            'css-loader',
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
        plugins: this.mode === 'production'
            // prod
            ? [
                //new CleanWebpackPlugin(['dist']),
                new HtmlWebpackPlugin({
                    template: './app/bundles/index.temp.html'
                }),
                new MinifyPlugin(),
                new MiniCssExtractPlugin({
                    filename: 'main.css'
                })
            ]
            :
            // dev
            [
                //new CleanWebpackPlugin(['dist']),
                new HtmlWebpackPlugin({
                    template: './app/bundles/index.temp.html',
                }),
                new webpack.HotModuleReplacementPlugin(),
                /*new MiniCssExtractPlugin({
                filename: 'main.css'
                })*/
            ]
    };
}