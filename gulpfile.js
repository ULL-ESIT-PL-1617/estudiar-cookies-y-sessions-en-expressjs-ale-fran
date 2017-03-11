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
 var branch_exists =  'git ls-remote --heads https://github.com/ULL-ESIT-PL-1617/estudiar-cookies-y-sessions-en-expressjs-ale-fran.git book'
 exec(branch_exists, function(err, out, errout){
   if(err) console.log('Error: ' + err);
   else {
     if(out.length ==  0){ //No existe, entonces creamos la rama
       exec('git checkout -b book', function (err, out, errout){
         if(err) console.log('Error, couldnt create branch');
         else {
           console.log('Branch "book" created');

           var newbranch = 'git filter-branch --subdirectory-filter ./docs gitbook';
           exec(newbranch, function(err, our, errout){
             if(err) console.error('Error:' + err);
             else{
               console.log('Filtered branch "gitbook" created succesfully');
             }
           });
         }
       });
     } else{


     }

   }
 });

var remote = 'gbook';
  var cmd = 'git checkout gitbook && git add . && git commit -m "update-docs" && git push -f gbook gitbook:master'
  exec(cmd, function (err, out, errout) {
    if(err) console.log("Error updating gitbook branch \n" + err);
    else console.log("Gitbook updated succesfully");
  })
});
