var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    jade         = require('gulp-jade'),
    rename       = require('gulp-rename'),
    watch        = require('gulp-watch'),
    plumber      = require('gulp-plumber'),
    gulpif       = require('gulp-if'),
    concat       = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync')

gulp.task('pages', function() {
  return gulp.src('pages/*.jade')
    .pipe(plumber())
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
})

gulp.task('styles', ['styles-vendor'], function() {
  return gulp.src('styles/main.scss')
    .pipe(plumber())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
})

gulp.task('scripts-vendor', function() {
  return gulp.src('vendor/**/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/'))
})

gulp.task('styles-vendor', function() {
  return gulp.src('vendor/**/*.css')
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('dist/'))
})

gulp.task('scripts', ['scripts-vendor'], function() {
  return gulp.src(['scripts/main.js', 'components/**/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
})

gulp.task('static', function() {
  return gulp.src('static/**')
    .pipe(gulp.dest('dist/static'))
    .pipe(browserSync.stream())
})

gulp.task('build', ['pages', 'styles', 'scripts', 'static'])

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    },
    open: false
  })

  watch(['styles/**', 'components/**/*.scss'], function() {
    gulp.start('styles')
  })

  watch(['pages/**', 'components/**/*.jade'], function() {
    gulp.start('pages')
  })

  watch(['scripts/**', 'components/**/*.js'], function() {
    gulp.start('scripts')
  })

  watch('static/**', function() {
    gulp.start('static')
  })
})

gulp.task('default', ['serve'])
