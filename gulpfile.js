var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    jade         = require('gulp-jade'),
    rename       = require('gulp-rename'),
    watch        = require('gulp-watch'),
    plumber      = require('gulp-plumber'),
    concat       = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    csso         = require('gulp-csso'),
    uglify       = require('gulp-uglify'),
    rev          = require('gulp-rev'),
    revReplace   = require('gulp-rev-replace'),
    filter       = require('gulp-filter'),
    clean        = require('gulp-clean')

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

gulp.task('production', ['build'], function() {
  var jsFilter = filter('dist/*.js', { restore: true })
      cssFilter = filter('dist/*.css', { restore: true }),
      jsAndCssFilter = filter(['dist/*.js', 'dist/*.css'], { restore: true })
      staticFilter = filter('dist/static/**/*', { restore: true }),
      staticAndStylesFilter = filter(['dist/static/**/*', 'dist/*.css'], { restore: true }),
      miscFilter = filter(['CNAME'], { restore: true })

  return gulp.src(['dist/**/*', 'CNAME'])
    .pipe(staticFilter)
    .pipe(rev())
    .pipe(staticFilter.restore)
    .pipe(staticAndStylesFilter)
    .pipe(revReplace())
    .pipe(staticAndStylesFilter.restore)
    .pipe(cssFilter)
    .pipe(csso())
    .pipe(cssFilter.restore)
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(jsFilter.restore)
    .pipe(jsAndCssFilter)
    .pipe(rev())
    .pipe(jsAndCssFilter.restore)
    .pipe(revReplace())
    .pipe(miscFilter.restore)
    .pipe(gulp.dest('production/'))
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
