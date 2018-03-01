<template>
    <div class="loginpage">
        <div class="nav"><h1>催收CMS</h1><h2>|</h2><h2>管理平台</h2></div>
        <div class="containerBox">
            <div class="container">
                <div class="login">
                    <h1>登录</h1>
                    <form class="layui-form">
                        <div class="layui-form-item">
                            <input v-model="username" class="layui-input" name="username" placeholder="用户名" type="text">
                        </div>
                        <div class="layui-form-item">
                            <input v-model="password" class="layui-input" name="password" placeholder="密码" type="password">
                        </div>
                        <div id="demo">
                            <div id="slider">
                                <div id="slider_bg"></div>
                                <span id="target"></span>
                                <span id="label"></span>
                                <span id="labelTip" :class="{'yellow':yellow}">拖动滑块验证</span>
                            </div>
                        </div>
                        <div id="commit" class="layui-btn layui-btn-normal login_btn" lay-submit lay-filter="commit">登录</div>
                    </form>
                    <div v-show="isShow" class="description">用户名／密码不能为空</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {verify, date, page, Common} from 'js/layuiCommon';
import request from 'js/interface/request';
export default {
    data () {
        return {
            isLock: true,
            username: '',
            password: '',
            isShow: false,
            yellow: false
        }
    },
    computed: {
    },
    created () {
        this.init();
    },
    mounted () {
        if (window.parent.$('.layui-tab-content.clildFrame').length) {
            window.parent.location.href = './login.html';
        }
        this.keyboard();
    },
    methods: {
        init () {
            window.layui.use('form', () => {
                var form = window.layui.form();
                form.on('submit(commit)', (data) => {
                    this.login(data.field);
                    return false;
                });
                form.render();
            });
            this.$nextTick(() => {
                var slider = new window.SliderUnlock('#slider', {
                    successLabelTip: '验证成功',
                    targetValue: '200'
                }, () => {
                    this.isLock = false;
                });
                slider.init();
            })
        },
        keyboard () {
            this.$nextTick(() => {
                let $ = window.$;
                $(document).on('keyup', (e) => {
                    e = e || window.event;
                    if (e.keyCode === 13) {
                        $('#commit').trigger('click');
                    }
                })
            })
        },
        show () {
            this.isShow = true;
            setTimeout(() => {
                this.isShow = false;
            }, 1800)
        },
        login (obj) {
            if (this.username.length === 0) {
                this.show();
                return;
            }
            if (this.password.length === 0) {
                this.show();
                return;
            }
            if (this.isLock) {
                this.yellow = true;
                setTimeout(() => {
                    this.yellow = false;
                }, 1800)
                return;
            }
            console.log(obj)
            request('/doLogin.html', obj, (response) => {
                console.log(response.data)
                if (response.data.respCode === '000000') {
                    // 登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
                    window.localStorage.setItem('roleName', response.data.data.roleName);
                    window.localStorage.setItem('userInfo', JSON.stringify(response.data.data));
                    window.location.href = 'index.html';
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        }
    },
    filters: {
    }
}
</script>
