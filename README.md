# u-starter-kit

一个使用 Gulp、NPM 构建的前端开发工作流。

**默认你已经安装好了git和node（包括npm）环境**

在你想要放置本工程的文件夹里右键，选择git bash here 打开git bash，**以下操作均可在git bash下完成。**
**git bash快捷键提示：git bash中，复制的快捷键Ctrl+Insert，粘贴Shift+Insert**

1. npm的淘宝镜像cnpm
npm下载最好翻墙，npm服务器在国外，网络影响大。这时，可以使用cnpm。
**全局安装cnpm** (cnpm -v检查是否安装cnpm，已安装请跳过)
npm install cnpm -g --registry=https://registry.npm.taobao.org
然后，以下步骤中，npm可以换成cnpm （比如：npm install --> cnpm install）

npm install -g bower

3. 全局安装gulp  (用gulp -v检查是否全局安装gulp，没有安装过可执行下面的命令，已安装跳过)
npm install --global gulp

4. 将工程下载到本地
git clone http://192.168.1.253:3000/web/URun.gulp.UI.git

5. 进入工程目录
cd URun.gulp.UI/

6. 通过npm安装项目依赖 （等待的时间会有点长）
npm install


至此，项目的需要的文件全部下载好了，接下来开始体验gulp

# 一、整体运行
执行命令：gulp  (Ctrl+c可退出命令执行状态)
可以看到dist/html/index.html被默认打开了，修改app文件夹的less或html等静态资源，保存后发现浏览器自动刷新。

按照gulpfile.js的代码，gulp对app文件夹的源码，进行了一系列的处理（less编译，js语法检查，图片压缩，css压缩，部署至静态服务后实时监控...）
然后将结果放到了dist文件夹。所以，我们应该在app文件夹进行开发。

# 二、bower前端资源管理
我们做页面通常需要用到jQuery，bootstrap这样的框架，以前可能是手动到github下载，然后把需要的文件粘贴进项目中。
现在我们尝试一些自动化的处理方式 -- 通过bower
bower可以简单理解为一个前端资源管理器，bower.json中的dependencies规定了项目的原始依赖:
```

  "dependencies": {
    "jquery": "~1.9.1",
    "bootstrap": "~3.3.5"
  }
```
通过执行bower install，即可安照dependencies的描述前端依赖。

但是依赖包只是下载到了app/libs(这个路径由.bowerrc指定)，这里面有很多文件我们并不需要，所以我们需要指定哪一些文件是项目正真需要的。
于是，在gulpfiel.js中有了下列代码：
```

// 拷贝前端资源
gulp.task('copy', function(){
    gulp.src([
      './app/libs/bootstrap/dist',
      '!./app/libs/bootstrap/dist/js/npm.js'
    ])
    .pipe(gulp.dest('./dist/libs/bootstrap/dist'));

    gulp.src([
      './app/libs/jquery/jquery.js',
      './app/libs/jquery/jquery.min.js',
      './app/libs/jquery/jquery.min.map'
    ])
    .pipe(gulp.dest('./dist/libs/jquery'));
});

```
以上代码指定哪一些前端文件是需要复制到dist文件夹。

# 三、解读gulpfile.js
gulp构建的前端工作流，是有一个个gulp任务组成的。

**定义任务**
gulp.task(name[, deps], fn)
name：任务名称 deps：依赖任务名称 fn：回调函数

比如：
```
// 整体构建
gulp.task('build', ['buildcss', 'checkjs', 'copyhtml', 'images', 'copy']);

```
我们可以在命令行键入gulp build，来执行bulid任务

其中gulp.task('default')任务可以直接用gulp命令运行

**指定任务处理的文件**
gulp.src(globs[, options])
globs：处理的文件路径(字符串或者字符串数组)

比如：
```
// 压缩css
gulp.task('cleancss', function() {
    return gulp.src(['./dist/css/*.css','!./dist/css/*.min.css'])// 只选出dist/css中不含有.min.css的文件
        .pipe(c$.cleanCss())
        .pipe(c$.rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'));
});

```
'./dist/css/*.css'  dist/css 中所有.css结尾的文件
'!./dist/css/*.min.css' !取反，排除.min.css结尾的文件

**指定文件输出路径**
gulp.dest(path[, options])
指定处理完后文件生成路径
在压缩css的那段示例中，'./dist/css'就是，处理完后文件生成路径。

# 参考
[bower简明指南](http://wwsun.github.io/posts/bower-post.html)
[gulp快速上手](https://segmentfault.com/a/1190000003003847)