require('shelljs/global');

try {
    hexo.on('deployAfter', function () {//当deploy完成后执行备份
        run();
    });
} catch (e) {
    console.log("产生了一个错误<(￣3￣)> !，错误详情为：" + e.toString());
}

function run() {
    if (!which('git')) {
        echo('Sorry, this script requires git');
        exit(1);
    } else {
        echo("======================Auto Backup Begin===========================");
        if (process.env.computername === "LQNQ") {
            // 台式电脑
            cd('F:\\blog');    //此处修改为Hexo根目录路径
        } else if (process.env.computername === "LENOVO") {
            // 笔记本电脑
            cd('D:\\blog');
        } else if (process.env.computername === "LAPTOP-V6C8RAO1") {
            // 周晓萌笔记本电脑
            cd('D:\\project\\blog');
        } else {
            echo(process.env.computername)
            echo("请修改autoSave的判断条件")
        }

        if (exec('git add --all').code !== 0) {
            echo('Error: Git add failed');
            exit(1);

        }
        if (exec('git commit -am "autoSave自动备份"').code !== 0) {
            echo('Error: Git commit failed');
            exit(1);

        }
        if (exec('git push origin master').code !== 0) {
            echo('Error: Git push failed');
            exit(1);

        }
        echo("==================Auto Backup Complete============================")
    }
}