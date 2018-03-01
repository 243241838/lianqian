var verify = {
    //表单验证
    form: function (layFilter, cb) {
        window.layui.use('form', () => {
            var form = window.layui.form();
            verify(form)
            form.on('submit('+ layFilter +')', function(data) {
                if (typeof cb === 'function') {
                    cb(data);
                }
                return false;
            });
        });
        function verify (form) {
            form.verify({
                //密码检测
                password: [
                    /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
                    '密码由6-20字母和数字组成，不能是纯数字或纯英文'
                ],
                //支付密码
                PayPassword: [
                    /^[\da-zA-z]{6,12}$/,
                    '6-12位数字字母组成'
                ],
                //工号限制(字母和数字)
                jobNo: [
                    /^[\da-zA-z]{1,10}$/,
                    '1-10位数字字母组成'
                ],
                //账号
                account: [
                    /^[\da-zA-z]{1,20}$/,
                    '1-20位数字字母组成'
                ],
                userName: [
                    /* var re = /^[\u4e00-\u9fa5]{2,20}$/;2到20个中文字符 */
                    /^[A-Za-z]|[\u4e00-\u9fa5]{2,20}$/,
                    '2到20个中文字符'
                ],
                //纯中文名字
                cneeName: [
                    /^[\u4e00-\u9fa5]{1,20}$/,
                    '1-20位中文'
                ],
                //昵称
                nickName: [
                    /[\u4E00-\u9FA5A-Za-z0-9_]{1,6}/,
                    '昵称只允许输入以中文,字母与数字'
                ],
                //字母与数字
                lettersAndNumbers: [
                    /[A-Za-z0-9]{6,20}/,
                    '必须是字母与数字组合，长度为6-20'
                ],
                //邮政编码
                areaCode: [
                    /[1-9]\d{5}(?!\d)/,
                    '邮政吧编码格式不正确'
                ],
                //邮箱验证
                isEmail: [
                    /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
                    '邮箱格式不正确'
                ],
                //手机号码
                isPhone: [
                    /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/,
                    '手机号码格式不正确'
                ],
                //地址
                address: [
                    /^[A-Za-z]|[\u4e00-\u9fa5]|[0-9]{4,}$/,
                    '地址允许输入中文汉字和数字，最少四位'
                ]
            })
        }
    }
}
export {
    verify
}