var gulp = require('gulp'),     
	sass = require('gulp-ruby-sass') ,
	notify = require("gulp-notify") ,
	bower = require('gulp-bower'),
	child_process = require('child_process'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint');

var config = {
	 sassPath: './app/resources/sass',
	bowerDir: './bower_components' 
}


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

gulp.task('dev', function () {
  nodemon({ script: 'server.js'
          , ext: 'html js'
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
                 config.bowerDir + '/fontawesome/scss',
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
});

  gulp.task('default', ['bower', 'icons', 'css', 'lint', 'mongod', 'dev']);