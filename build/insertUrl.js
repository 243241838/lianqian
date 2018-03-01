var fs = require('fs');
var path = require('path');
var config = require('../config');
var argument = process.argv.splice(2);
var dir = path.join(__dirname, '../dist/html/');
if (argument[0] === 'dev') {
    dir = path.join(__dirname, '../src/html/');
    config.build.assetsPublicPath = '../../';
}
var script_start = '\t' + '<script src=' + config.build.assetsPublicPath + 'static/js/';
var script_end = '></script>\n';
// js文件
var globaljs = script_start + 'global.js' + script_end;
var jquery = script_start + 'jquery.min.js' + script_end;
var layui = script_start + 'layui.js' + script_end;
var echarts = script_start + 'echarts.min.js' + script_end;
var slideunlock = script_start + 'jquery.slideunlock.js' + script_end;
// favicon
var favicon = '\n\t<link rel="shortcut icon" href=' + config.build.assetsPublicPath + 'static/img/favicon.ico>\n';
var layuicss = '\n\t<link rel="stylesheet" href=' + config.build.assetsPublicPath + 'static/js/css/layui.css>\n';

function handle (name) {
    var str = favicon + globaljs + jquery + layuicss + layui;
    if (name === 'overview.html' || name === 'overview') {
        str += echarts;
    } else if (name === 'login.html' || name === 'login') {
        str += slideunlock;
    }
    return str;
}
function development (pathName, fileName) {
    // 开发
    var data = fs.readFileSync(pathName, 'utf8');
    var index = data.indexOf('</title>') + 8;
    if (index < 8) {
        console.log('index < 8, check title tag, ' + fileName + '\n');
        return;
    }
    var strStart = data.substring(0,index);
    index = data.indexOf('</head>');
    var strEnd = data.substring(index);
    var middle = handle(fileName);
    var result = strStart.concat(middle, strEnd);
    fs.writeFileSync(pathName, result, {encoding: 'utf8'});
    console.log('插入成功 : ' + fileName + '\n');
}
function production (pathName, fileName) {
    // 生产
    var data = fs.readFileSync(pathName, 'utf8');
    data = data.replace(/\.\.\/\.\.\//g, config.build.assetsPublicPath);
    fs.writeFileSync(pathName, data, {encoding: 'utf8'});
    console.log('修改成功 : ' + fileName + '\n');
}
// 运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
if (process.platform == 'win32') {
    var splitStr = '\\';
} else {
    var splitStr = '\/';
}
console.log(dir)
function fn () {
    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
        var readName = '';
        var flag = false; // false:二级目录, true:一级目录
        if (files[i].indexOf('.html') == -1) {
            readName = fs.readdirSync(dir + files[i] + splitStr);
            if (argument[0] === 'dev') {
                for (var j = 0; j < readName.length; j++) {
                    if (readName[j].indexOf('.html') != -1) {
                        flag = true;
                        // 找到了
                        break;
                    }
                }
            } else {
                // 二级目录打包
                for (var k = 0; k < readName.length; k++) {
                    var pathName = dir + files[i] + splitStr + readName[k];
                    production(pathName, readName[k]);
                }
            }
        } else if (argument[0] !== 'dev') {
            // 打包
            flag = true;
        }
        if (!flag) {
            // 二级目录开发
            for (var k = 0; k < readName.length; k++) {
                if (argument[0] === 'dev') {
                    var pathName = dir + files[i] + splitStr + readName[k] + splitStr + readName[k] + '.html';
                    development(pathName, readName[k]);
                }
            }
        }
        if (flag) {
            // 一级目录开发
            if (argument[0] === 'dev') {
                var pathName = dir + files[i] + splitStr + files[i] + '.html';
                development(pathName, files[i]);
            } else {
                // 一级目录打包
                var pathName = dir + files[i];
                production(pathName, files[i]);
            }
        } 
    }
}
fn();