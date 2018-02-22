const gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function() {
  
    browserSync.init({
      server: {
        notify: false,
        baseDir: "docs"
      }
    });
  
    watch('./docs/index.html', function() {
      browserSync.reload();
    });
  
    watch('./src/styles/**/*.css', function() {
      gulp.start('cssInject');
    });

    watch('./src/scripts/**/*.js', function() {
      gulp.start('scriptsRefresh');
    });
    
  });

  gulp.task('cssInject', ['styles'], function() {
    return gulp.src('./docs/assets/styles/styles.css')
      .pipe(browserSync.stream());
  });

  gulp.task('scriptsRefresh', ['scripts'], function() {
    browserSync.reload();
  });