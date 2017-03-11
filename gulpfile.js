var gulp = require('gulp');
var gh-page = require('gulp-gh-pages');
var exec = require('child_process').exec;
var path = require('path').resolve() + '\\node_modules\\.bin\\';

gulp.task('create-book', function(){
  var cmd = 'gitbook build docs htmls';
  exec(path + cmd, function(err, out, errout){
    if(err) console.error('Error:' + err);
    else{
      console.log('Build success');
      var newbranch = 'git filter-branch --subdirectory-filter ./docs gitbook';
      exec(newbranch, function(err, our, errout){
        if(err) console.error('Error:' + err);
        else{
          console.log('Filtered branch "gitbook" created succesfully');
        }
      });
    }
  });
});

gulp.task('update-book', function(){
  var remote = 'gbook';
  var cmd = 'git checkout gitbook && git add . && git commit -m "update-docs" && git push -f gbook gitbook:master'
  exec(cmd, function (err, out, errout) {
    if(err) console.log("Error updating gitbook branch \n" + err);
    else console.log("Gitbook updated succesfully");
  })
});
