# Vue-cli(2.0) 多页面开发实战

> 由于之前主要使用jquery方式开发，现在想换一种方式，使用MVVM开发(感觉vue跟我之前用的angular1.X差不多类似)，所以在开发中会遇到很多问题，借此来记录一下；或者有很多不足，又或者里面可能存在些错误，anyway，请多多指教，共勉。

## 现在的开发环境  ##

1. nodejs v5.1.1 ，npm 3.3.1.12
2. 使用vue-cli（包含vue2.0，webpack，sass，es6等环境）

## 如何运行项目 ##

``` bash
# 下载项目后，首先安装需要的包
npm install

# 开发运行环境;运行命令后，浏览器自动打开http://localhost:8080/views/index.html
npm run dev

# 开发完成后打包命令，会生成dist文件夹，不要在本地打开，请安装类似http-server来运行
npm run build

```

# 开发准备

https://github.com/doyoe/Yo

# layui源码改动情况 >
1. 时间控件验证格式关闭(date控件235行)
2. index主页head 和侧边栏颜色有改动
#npm run dev193 起服务
#npm run build191 测试打包
#代理  后台服务地址
# build changeServer.js 代理服务器地址