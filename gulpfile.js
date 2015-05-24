var gulp            = require('gulp'),     
    sass            = require('gulp-ruby-sass') ,
    uglify          = require('gulp-uglify'),
    notify          = require("gulp-notify") ,
    bower           = require('gulp-bower'),
    child_process   = require('child_process'),
    nodemon         = require('gulp-nodemon'),
    jshint          = require('gulp-jshint'),
    // browserify      = require('gulp-browserify'),
    browserify      = require('browserify'),
    source          = require('vinyl-source-stream'),
    reactify        = require('reactify');

var config = {
	 sassPath: './assets/sass',
  jsPath: './assets/js',
	bowerDir: './bower_components' 
}
 
var production = process.env.NODE_ENV === 'production';
 
gulp.task('scripts', function () {
  var bundler = browserify(['./assets/js/main.js'], {basedir: __dirname, debug: !production});
  
  bundler.transform(reactify);
  var stream = bundler.bundle();
  return stream
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watchScripts', function() {
  gulp.watch('assets/js/*.js', ['scripts']);
});

// startup required services to run the app server
gulp.task('mongod', function() { 
    // spawn in a child process mongodb
    child_process.exec('mongod', function(err,stdout,stderr){
    	console.log(stdout);
    });
});

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint())
})

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/inc/fonts')); 
});

gulp.task('js', function() {
  return gulp.src([
      'bower_components/delorean/dist/*.js',
      'assets/js/main.js'
    ])
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('dev', function () {
  nodemon({ script: 'app.js'
          , ext: 'html js jsx'
          , ignore: ['ignored.js']
          , tasks: ['lint'] })
    .on('restart', function () {
      console.log('restarted!')
    })
})

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/default.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 config. sassPath,
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 config.bowerDir + '/fontawesome/scss'
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
         .pipe(gulp.dest('./public/css')); 
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
     gulp.watch(config.jsPath + '/*.js', ['js']); 
});

  gulp.task('default', ['bower', 'icons', 'css', 'js', 'mongod', 'dev']);