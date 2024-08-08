var spawn = require('child_process').exec;


hexo.on('new', function(data){
echo(process.env.computername);
if (process.env.computername === "LQNQ"){
  // 台式电脑
  spawn('start  "D:\\Practical_Software\\Notepad++\\notepad++.exe" ' + data.path);
}else if (process.env.computername === "LENOVO"){
  // 笔记本
  spawn('start  "D:\\Software\\Notepad++\\notepad++.exe" ' + data.path);
}else if (process.env.computername === "LAPTOP-V6C8RAO1"){
  // 周晓萌笔记本
  spawn('start  "D:\\npp.8.6.7.portable.x64\\notepad++.exe" ' + data.path);
}
else{
  echo(process.env.computername)
  echo("请修改openNewMD的判断条件")
}
  
});