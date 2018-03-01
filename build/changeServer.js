// npm run build : js html放一起
// npm run build105 : html放后端，js放105
var fs = require('fs');
var path = require('path');
var argument = process.argv.splice(2);

var server = '';
// assetsPublicPath: js放的位置
var assetsPublicPath = '../../';
if (argument[0] === 'build250') {
    server = '';
    assetsPublicPath = '//10.2.1.250/';
} else if (argument[0] === 'dev') {
    server = '/lifeservice';
    assetsPublicPath = '../../';
} else if (argument[0] === 'testServer') {
    server = '';
    assetsPublicPath = '//10.1.11.52/';
} else if (argument[0] === 'aliyun') {
    server = '';
    assetsPublicPath = '//116.62.219.142/';
}

function writeFile_server () {
    var data = 'export default ' + JSON.stringify(server);
    fs.writeFile(path.join(__dirname, 'server.js'), data, function (err) {
        if (err) {
            throw err;
        }
        console.log('change server is successful: ' + server);
    })
}
function writeFile_index () {
    var index_data="\
    var path = require('path');\
    module.exports = {\
        build: {\
            env: require('./prod.env'),\
            assetsRoot: path.resolve(__dirname, '../dist'),\
            assetsSubDirectory: 'static',\
            assetsPublicPath: " + "\'" + assetsPublicPath + "\'" + ",\
            productionSourceMap: true,\
            productionGzip: false,\
            productionGzipExtensions: ['js', 'css']\
        },\
        dev: {\
            env: require('./dev.env'),\
            port: 8080,\
            assetsSubDirectory: 'static',\
            assetsPublicPath: '/',\
            proxyTable: {\
                '/lifeservice': {\
                    target: 'http://10.1.11.52:8088',\
                    changeOrigin: true,\
                    pathRewrite: {\
                        '^/lifeservice': ''\
                    }\
                }\
            },\
            cssSourceMap: false\
        }\
    }";
    // http://10.1.11.52:8088
    // http://10.25.1.29:8088 开发
    // http://10.1.11.52:8088 测试
    // http://10.1.16.99:8080 李灿峰
    // http://122.224.245.146:8088 测试映射
    fs.writeFile(path.resolve(__dirname, '../config/index.js'), index_data, function (err) {
        if (err) {
            throw err;
        }
        console.log('change assetsPublicPath is successful: ' + assetsPublicPath);
    })
}
writeFile_server();
writeFile_index();


//张海 133 10.1.16.133 8080
// 250 111 8082
//张展 134
//李灿峰 10.1.16.99:8080
//25楼  10.25.1.29
// 柯南 http://10.1.100.101:8080/api/api.do
// 柯南外网 http://183.129.223.66:1001/api/api.do
// 250外网 http://183.129.223.66:2050/hbx-api-server/api.do // 外网
// 张海 http://10.1.100.156:8080//api.do

// http://test.51hbx.com:1005/wap/index.html
// http://10.2.1.161:8082 // 后台
// 10.2.1.192:8080 // 张展
// http://cuishou.51kaledai.com
// http://10.2.1.160:8080 张海
