import {verify} from 'js/verify';
import {date} from 'js/date';
import {page} from 'js/page';
import {checkbox} from 'js/checkbox';
window.String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
var Common = {
    getQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    //提交报错或账号重复时提示
    alert: function (data) {
        window.layui.use('form', function() {
            window.layer.msg(data);
        });
    }
}
export {
    Common, verify, date, page, checkbox
}