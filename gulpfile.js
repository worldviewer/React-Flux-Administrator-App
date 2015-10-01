"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Opens a URL in a browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // concatenates files
var lint = require('gulp-eslint'); // Lint JS files, including JSX

var config = {
	port: '9000', // Note the quotes; this is absolutely necessary, or will not work!
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js', // ** looks in subdirectories too
		images: './src/images/*',
		dist: './dist',
		mainJs: './src/main.js',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'src/css/toastr.css'
		]
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
	gulp.src('dist/index.html').pipe(open({uri: config.devBaseUrl + ':' + config.port, app: 'Google Chrome'}));
});

gulp.task('html', function() {
	 gulp.src(config.paths.html)
	 	 .pipe(gulp.dest(config.paths.dist))
	 	 .pipe(connect.reload());
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
})

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({configFile: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());

		// publish favicon
		gulp.src('./src/images/favicon.ico')
			.pipe(gulp.dest(config.paths.dist));
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']); // lints each time that javascript changes
	gulp.watch(config.paths.images, ['images']);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);
