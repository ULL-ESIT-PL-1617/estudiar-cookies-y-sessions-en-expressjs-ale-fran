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

gulp.task('deploy-gitbook', function () {
  console.log('Deploying gitbook');
    exec('git add . && git commit -m "Deploy gitbook" && git push origin master', function (err, out, errout) {
      console.log('Pushing local changes... \n' + out);
      exec('git push origin --delete book && git branch -D book', function (err, out, errout){
        console.log('Rewriting book branch... \n' + out);
        var gitignore = 'echo node_modules/ >> .gitignore && echo htmls/ >> .gitignore && echo .publish/ >> .gitignore'
          exec('git checkout -b book && git filter-branch --subdirectory-filter ./docs -f book && ' + gitignore, function (err, out, errout){
            console.log('Filtering book content from ./docs \n' + errout);
            exec('git add . && git commit -m "update bookbranch" && git push origin book && git push -f gbook book:master && git checkout master', function (err, out, errout){
              console.log('Pushing local changes to github & gitbook \n' + errout);
            });
          });
      });
    });
});

gulp.task('update-gh-pages', function () {
  return gulp.src('./htmls/**/*').pipe(ghpages({"message" : 'ghpages deployed'}));
});
