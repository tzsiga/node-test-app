var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var css = require('gulp-css');

gulp.task('scripts', function() {
    return gulp.src([
    				'bower_components/jquery/dist/jquery.min.js',
    				'bower_components/bootstrap/dist/js/bootstrap.min.js',
    				'bower_components/bootstrap-material-design/dist/js/ripples.min.js',
    				'bower_components/bootstrap-material-design/dist/js/material.min.js',
    				'bower_components/angular/angular.min.js',
    				'bower_components/angular-route/angular-route.js',
    				'bower_components/lodash/lodash.min.js',
    				'javascript/*.js',
    				'Angular/angularViews.js'
    				])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
    return gulp.src('javascript/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('css', function() {
    return gulp.src([
    				 'bower_components/bootstrap/dist/css/bootstrap.min.css',
    				 'bower_components/bootstrap-material-design/dist/css/ripples.min.css',
    				 'bower_components/bootstrap-material-design/dist/css/material-wfont.min.css',
    				 'bower_components/font-awesome/css/font-awesome.min.css',
    				 'Css/*.css'
    				 ])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
    return gulp.src([
    				'bower_components/font-awesome/fonts/fontawesome-webfont.*',
    				'bower_components/bootstrap/fonts/glyphicons-halflings-regular.*'
    				])
				.pipe(gulp.dest('fonts/')); 
});

gulp.task('watch', function() {
    gulp.watch('Angular/*.js', ['scripts']);
    gulp.watch('javascript/*.js', ['scripts']);
    gulp.watch('Css/*.css', ['css']);
});

gulp.task('default', ['css', 'fonts', 'scripts', 'watch']);