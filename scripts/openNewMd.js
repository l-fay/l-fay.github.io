var spawn = require('child_process').exec;


hexo.on('new', function(data){
  spawn('start  "D:\Practical_Software\Notepad++\\notepad++.exe" ' + data.path);
});