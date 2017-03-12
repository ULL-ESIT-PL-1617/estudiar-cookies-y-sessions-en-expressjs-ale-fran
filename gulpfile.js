var gulp = require('gulp');
var ghpages = require('gulp-gh-pages');
var exec = require('child_process').exec;
var path = require('path').resolve() + '\\node_modules\\.bin\\';

gulp.task('deploy-gh-pages', function(){
  var cmd = 'gitbook build docs htmls';
  console.log("Building gitbook html files...");
  exec(path + cmd, function(err, out, errout){
    if(err) console.error('Error:' + err);
    else{
     console.log('Gitbook build success');
     console.log('Deploying to branch gh-pages');
     gulp.start('update-gh-pages');
   }
  });
});

gulp.task('update-book', function(){
  //Comprobamos si existe la rama para pushear a gitbook
  exec('git rev-parse --verify book', function(err, out, errout){
    if(errout.includes('fatal')) {
      exec('git checkout -b book && echo !*.md >> .gitignore', function (err, out, errout){
          if(err) console.log('Error, couldnt create branch \n' + err);
          else {
            console.log('Branch "book" created'); //Filtramos el contenido de ./docs a la rama
            exec('git filter-branch --subdirectory-filter ./docs -f book', function(err, our, errout){
              console.log('Filtering branch content...');
              exec('git push -f gbook book:master', function (err, out, errout) {
                if(err) console.log("Error updating gitbook branch \n" + err);
                else console.log("Gitbook updated succesfully");
              });
            });
          }
        });
     } else {
       exec('git filter-branch --subdirectory-filter ./docs -f book', function(err, our, errout){
           console.log('Filtering branch content...');
           exec('git push -f gbook book:master', function (err, out, errout) {
             if(err) console.log("Error updating gitbook branch \n" + err);
             else console.log("Gitbook updated succesfully");
           });
       });
     }
 });
});

gulp.task('update-gh-pages', function () {
  return gulp.src('./htmls/**/*').pipe(ghpages({"message" : 'ghpages deployed'}));
});
