module.exports = {
  //parser: 'sugarss',
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env'),
    require('cssnano'),
	require('autoprefixer')
  ]
}
