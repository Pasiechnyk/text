var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    watch = require('gulp-watch'),
    cssmin = require('gulp-cssmin');
    uglify = require('gulp-uglify');

    /*concatCss = require('gulp-concat-css'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    prettify = require('gulp-html-prettify'),
    jade = require('gulp-jade'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename');*/

gulp.task('image', function () {
    return gulp.src('public/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public/images/'));
});

gulp.task('js', function () {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('styl', function() {
    return gulp.src('styl/*.styl')
        .pipe(stylus({
            linenos: false
        }))
        .pipe(autoprefixer([
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6'
        ]))
        .pipe(concatCss('styl.css'))
        .pipe(gulp.dest('css'));

});

gulp.task('css', function () {
    return gulp.src('css/*.css')
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('build'));
});


gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    return gulp.src('./public/template/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(prettify({indent_char: ' ', indent_size: 3}))
        .pipe(gulp.dest('./'))
})


gulp.task('watch', function() {
    /*gulp.watch("./public/styl/*.styl", ['styl']);
    gulp.watch("./public/css/*.css", ['css']);*/
    gulp.watch("js/*.js", ['js']);
});