"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Opens a URL in a browser

var config = {
	port: '9000',
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		dist: './dist' 
	}
}

// Start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

// Note that this open() command has to be JUST right to work ...

gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html').pipe(open({uri: 'http://localhost:9000', app: 'Google Chrome'}));
});

gulp.task('html', function() {
	 gulp.src(config.paths.html)
	 	 .pipe(gulp.dest(config.paths.dist))
	 	 .pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
});

gulp.task('default', ['html', 'open', 'watch']);
