const   gulp            = require('gulp'),
        sass            = require('gulp-sass'),
        uglify          = require('gulp-uglify'),
        autoprefixer    = require('gulp-autoprefixer'),
        browserSync     = require('browser-sync').create(),
        to5             = require('gulp-6to5');

// gulp sass
gulp.task('sass', function() {
    gulp.src('src/scss/style.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream())
});

// gulp js
gulp.task('js', () => {
    gulp.src('src/js/app.js')
    .pipe(to5())
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(browserSync.stream())
});

//gulp serve
gulp.task('serve', () => {
    browserSync.init({
        server: './'
    });
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/js/app.js', ['js']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

// gulp
gulp.task('default', ['sass','js','serve']);