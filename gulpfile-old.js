var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	postcss = require('gulp-postcss');
    autoprefixer = require('autoprefixer');
    cssnano = require('cssnano');

gulp.task('conScripts',function() {
		return gulp.src(['./app/js/file3.js', './app/js/file1.js', './app/js/file2.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass',function() {
	return gulp.src('app/scss/**/*.scss').pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
}); 

gulp.task('browser-sync',function () {
	browserSync({
		server: 
			{baseDir:'app'},
			notify:false
	});
});

gulp.task('getCss', function () {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('./app/css/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dest/css'));
});

gulp.task('watch', ['browser-sync','sass'], function () {
	gulp.watch('app/scss/**/*.scss',['sass']);
	gulp.watch('app/*.html',browserSync.reload);
	gulp.watch('app/js/**/*.js',browserSync.reload);
});