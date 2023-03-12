var spawn = require('child_process').exec;


hexo.on('new', function(data){
if (process.env.computername === "LQNQ"){
  spawn('start  "D:\Practical_Software\Notepad++\\notepad++.exe" ' + data.path);
}else{
  echo(process.env.computername)
  echo("请修改openNewMD的判断条件")
}
  
});