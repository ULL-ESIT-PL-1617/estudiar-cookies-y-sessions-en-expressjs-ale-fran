var gulp = require('gulp');
var ghpage = require('gulp-gh-pages');
var exec = require('child_process').exec;
var path = require('path').resolve() + '\\node_modules\\.bin\\';

gulp.task('create-book', function(){
  var cmd = 'gitbook build docs htmls';
  exec(path + cmd, function(err, out, errout){
    if(err) console.error('Error:' + err);
    else console.log('Gitbook build success');
  });
});

gulp.task('update-book', function(){
  //Comprobamos si existe la rama para pushear a gitbook
  //exec('git ls-remote --heads https://github.com/ULL-ESIT-PL-1617/estudiar-cookies-y-sessions-en-expressjs-ale-fran.git book', function(err, out, errout){
  exec('git rev-parse --verify book', function(err, out, errout){
    if(err) console.log('Error checking if branch exists \n' + err);
    else {
      console.log(out.length ==  0 && out.includes('fatal'));
      console.log(out.length ==  0);
      console.log(out.includes('fatal'));
      console.log("Out: " + out);
      if(out.includes('fatal')){ //No existe, entonces creamos la rama
        exec('git checkout -b book', function (err, out, errout){
          if(err) console.log('Error, couldnt create branch \n' + err);
          else {
            console.log('Branch "book" created'); //Filtramos el contenido de ./docs a la rama
            exec('git filter-branch --subdirectory-filter ./docs -f book', function(err, our, errout){
              if(err) console.error('Error filtering branch content \n' + err);
              else {
                exec('git checkout book && git add . && git commit -m "update-gitbook" && git push -f gbook book:master', function (err, out, errout) {
                  if(err) console.log("Error updating gitbook branch \n" + err);
                  else console.log("Gitbook updated succesfully");
                });
              }
            });
          }
        });
     } else {
       exec('git filter-branch --subdirectory-filter ./docs -f book', function(err, our, errout){
         if(err) console.error('Error filtering branch content \n' + err);
         else {
           console.log('Filtered ./docs to "book" branch');
           exec('git checkout book && git add . && git commit -m "update-gitbook" && git push -f gbook book:master', function (err, out, errout) {
             if(err) console.log("Error updating gitbook branch \n" + err);
             else console.log("Gitbook updated succesfully");
           });
         }
       });
     }
   }
 });
});
