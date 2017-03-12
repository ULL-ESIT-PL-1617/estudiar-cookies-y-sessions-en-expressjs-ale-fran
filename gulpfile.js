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

/*
1 - Pushear cambios locales
2 - Comprobar si existe la rama book
  Si - Crear rama
  No - Ignorar
3 - Filter branch (esto vuelca el contenido de docs a la raiz)
4 - Crear el .gitignore con !*.md
5 - Push to github
6 - Push to gitbook remote
7 - Checkout to master
*/
gulp.task('deploy-gitbook', function () {
  console.log('Deploying gitbook');
    exec('git add . && git commit -m "Deploy gitbook" && git push origin master', function (err, out, errout) {
      console.log('Pushing local changes... \n' + errout);
      exec('git rev-parse --verify book', function (err, out, errout){
        console.log('Checking book branch... \n' + errout);
        if(errout.includes('fatal')){
          console.log('Creating book branch...');
          exec('git checkout -b book && git filter-branch --subdirectory-filter ./docs -f book && echo "!*.md" >> .gitignore', function (err, out, errout){
            console.log('Filtering book content from ./docs \n' + errout);
            exec('git add . && git commit -m "update bookbranch" && git push origin book && git push -f gbook book:master && git checkout master', function (err, out, errout){
              console.log('Pushing local changes to github & gitbook \n' + errout);
            });
          });
        } else {
          console.log('Ok');
          exec('git filter-branch --subdirectory-filter ./docs -f book && echo "!*.md" >> .gitignore', function (err, out, errout){
            console.log('Filtering book content from ./docs \n' + errout);
            exec('git add . && git commit -m "update bookbranch" && git push -f origin book && git push -f gbook book:master && git checkout master', function (err, out, errout){
              console.log('Pushing local changes to github & gitbook \n' + errout);
            });
          });
        }
      });
    });
});

gulp.task('update-gh-pages', function () {
  return gulp.src('./htmls/**/*').pipe(ghpages({"message" : 'ghpages deployed'}));
});
