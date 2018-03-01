require('es6-promise').polyfill();
import axios from 'axios';
import baseUrl from '../../../../build/server.js';
import {winLayer} from 'js/common';

function request (relativeUrl, obj, fn, errFn, config) {
    var url = baseUrl + relativeUrl;
    if (!obj) {
        obj = '';
    }
    if (config) {
        // 文件上传
        if (config.isUpload) {
            uploadFile(url, obj, fn, errFn);
        }
        if (config.isDownload) {
            downloadFile(url, obj, fn, errFn);
        }
        return;
    }
    axios.post(url, obj, {headers: {'X-Requested-with': 'XMLHttpRequest'}}).then((response) => {
        if (typeof fn === 'function') {
            fn(response);
        }
    }).catch((error) => {
        if (error.response.status === 401) {
            var loc = window.parent.location;
            var reg = new window.RegExp('[a-zA-z0-9]+.html');
            var html = loc.pathname.match(reg);
            var target = loc.origin + loc.pathname.split(html)[0] + 'login.html';
            window.parent.location.href = target;
        }
        if (typeof errFn === 'function') {
            errFn(error);
        }
    })
}
function uploadFile (url, obj, fn, errFn) {
    window.layui.use('upload', () => {
        window.layui.upload({
            url: url,
            elem: obj.elem,
            method: 'post',
            title: obj.title,
            before: (input) => {
                winLayer.loadOn(2);
            },
            success: (res) => {
                winLayer.loadOff();
                if (typeof fn === 'function') {
                    fn(res);
                }
            }
        });
    });
}
function downloadFile (url, obj, fn, errFn) {
    let idInput = '';
    console.log(obj)
    Object.keys(obj).map((key) => {
        idInput += '<input type="hidden" name="' + key + '" value="' + obj[key] + '"/>';
    })
    window.$('<form method="post" action=' + url + '></form>').appendTo('body').html(idInput).submit().remove();
}
export default request;
