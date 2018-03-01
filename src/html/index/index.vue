<template>
    <div class="layui-layout layui-layout-admin container">
	    <!--头部-->
        <div class="layui-header header">
			<div class="layui-main" id="layui-main-header">
				<a href="javasctipy:;" class="logo">催收平台</a>
				<!-- 显示/隐藏菜单 -->
				<!--<a href="javascript:;" class="iconfont hideMenu icon-menu1"></a>-->
				<ul class="layui-nav" style="padding:0;">
                    <li v-for="(header,index) in headerList" class="layui-nav-item" :class="{'layui-this':layuiHeaderSelected==index}">
                        <a href="javascript:;" @click="clickHeaderNav(header,index)" v-text="header.resourceName">项目管理</a>
                    </li>
                </ul>
			</div>
		</div>
        <!-- 头部右侧 -->
        <div v-if="userInfo.roleName=='admin'" class="header-right">
            <div class="item treebox" id="hoverH">
                <div v-show="realNameSelected" class="treeHeader">admin <i class="layui-icon rotate">&#xe625;</i></div>
                <div v-show="!realNameSelected" class="treeHeader">admin <i class="layui-icon">&#xe625;</i></div>
                <div class="tree-list">
                    <div class="tree" @click="changePass">修改密码</div>
                    <div class="tree" @click="logout">退出</div>
                </div>
            </div>
        </div>
        <div v-else class="header-right">
            <div class="item" v-text="userInfo.projectName"></div>
            <div class="item" v-text="userInfo.description"></div>
            <div class="item treebox" id="hoverH">
                <div v-show="realNameSelected" class="treeHeader">{{userInfo.userRealName}} <i class="layui-icon rotate">&#xe625;</i></div>
                <div v-show="!realNameSelected" class="treeHeader">{{userInfo.userRealName}} <i class="layui-icon">&#xe625;</i></div>
                <div class="tree-list">
                    <div class="tree">座席号：{{userInfo.userName}}</div>
                    <div class="tree" @click="changePass">修改密码</div>
                    <div class="tree" @click="logout">退出</div>
                </div>
            </div>
        </div>
		<!-- main 左侧菜单 -->
		<div class="layui-side" id="leftMenuConent">
			<div class="user-photo">
				<a class="img" title="我的头像" ><img src="./images/logo.png"></a>
				<p>欢迎登录：<strong v-text="userInfo.userName"></strong></p>
			</div>
            <div class="layui-side-scroll" v-if="headerList.length>0">
                <ul v-for="(subMenuItem,itemIndex) in headerList[layuiHeaderSelected].subMenuList" class="layui-nav layui-nav-tree">
                    <li class="layui-nav-item" :class="{'layui-nav-itemed': layuiNavItemed==itemIndex}" @click="clickLeftNavParent(subMenuItem,itemIndex)">
                        <a v-if="subMenuItem.subMenuList.length>0" href="javascript:;">{{subMenuItem.resourceName}}</a>
                        <a v-else href="javascript:;" v-text="subMenuItem.resourceName"></a>
                        <dl v-if="subMenuItem.subMenuList.length>0" class="layui-nav-child">
                            <dd v-for="(item,index) in subMenuItem.subMenuList" :class="{'layui-this': index==itemed}">
                                <a href="javascript:;" @click.stop="clickLeftNav(item.resourceUrl, item.resourceName, index)">{{item.resourceName}}</a>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
		</div>
		<!-- main  右侧内容 -->
        <div id="rightContent" class="layui-body layui-form">
            <div class="layui-tab marg0" id="demo" lay-filter="demo" lay-allowclose="true">
                <ul class="layui-tab-title" style="line-height:40px;">
                </ul>
                <div class="layui-tab-content clildFrame">
                      <!--<iframe :src="url"></iframe>-->
                </div>
            </div>
        </div>
        <!--去掉 .layui-body  bottom:0;-->
        <!--<div class="layui-footer footer">
		   <p>电话：400-678-6078</p>
		</div>-->
        <div id="edid_pass" v-show="false">
              <div class="center">
                    <div class="img">
                        <img src="./images/radius.png" alt="">
                    </div>
                    <div class="title">重置密码</div>
                    <div class="layui-form-item">
                            <div>
                                <label class="layui-form-label">原密码</label>
                            </div>
                            <div class="layui-input-inline">
                                <input type="password" name="deptName" lay-verify="required" class="layui-input">
                            </div>
                    </div>
                    <div class="layui-form-item">
                            <div>
                                <label class="layui-form-label">新密码</label>
                            </div>
                            <div class="layui-input-inline">
                                <input maxlength="18" type="password" name="deptName" lay-verify="required" class="layui-input">
                            </div>
                    </div>
                    <div class="layui-form-item">
                            <div>
                                <label class="layui-form-label">确认新密码</label>
                            </div>
                            <div class="layui-input-inline">
                                <input maxlength="18" type="password" name="deptName" lay-verify="required" class="layui-input">
                            </div>
                    </div>
            </div>
        </div>


    </div>
</template>
<script>
import {verify, date, page, Common} from 'js/layuiCommon';
import request from 'js/interface/request';
export default {
    components: {
    },
    data () {
        return {
            headerList: [],
            layuiHeaderSelected: 0,
            layuiNavItemed: 0,
            itemed: 0,
            url: '',
            userInfo: '',
            realNameSelected: false
        }
    },
    created () {
        this.initUserInfo();
    },
    mounted () {
        this.getMenuList();
        this.initHover();
        this.reInitForm();
    },
    computed: {
    },
    methods: {
        initUserInfo () {
            this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        },
        initHover () {
            this.$nextTick(() => {
                window.$('#hoverH').hover(() => {
                    window.$('.tree').css('display', 'block')
                    this.realNameSelected = true;
                }, () => {
                    window.$('.tree').css('display', 'none')
                    this.realNameSelected = false;
                });
            })
        },
        getMenuList () {
            request('./getMenuList.html', {}, (response) => {
                console.log('getMenuList: ', response)
                if (response.data.respCode === '000000') {
                    if (response.data.data.length > 0) {
                        this.headerList = response.data.data;
                        this.$nextTick(() => {
                            this.init();
                        })
                    }
                } else {
                    window.layer.msg(response.data.respMsg)
                }
            }, (e) => {
                console.log(e)
            })
        },
        init () {
            this.clickHeaderNav(this.headerList[0], 0);
        },
        // 一级
        clickHeaderNav (item, index) {
            this.layuiHeaderSelected = index;
            this.layuiNavItemed = 0;
            this.clickLeftNavParent(item.subMenuList[0], 0);
            this.reInitForm();
        },
        // 二级
        clickLeftNavParent (subMenuItem, itemIndex) {
            this.layuiNavItemed = itemIndex;
            if (subMenuItem.subMenuList.length === 0) {
                // 无三级
                this.clickLeftNav(subMenuItem.resourceUrl, subMenuItem.resourceName, 0);
            } else {
                // 有三级
                this.clickLeftNav(subMenuItem.subMenuList[0].resourceUrl, subMenuItem.subMenuList[0].resourceName, 0);
            }
        },
        // 跳转
        clickLeftNav (url, name, index) {
            this.itemed = index;
            if (url[0] !== '/') {
                this.url = './' + url;
            } else {
                this.url = '.' + url;
            }
            if (window.$('.layui-tab-title li').length>0) {
                if (this.hasTab(url)) {
                    this.tabChange(url);
                } else {
                    this.tabAdd(name, url);
                    this.tabChange(url);
                }
            } else {
                this.tabAdd(name, url)
                this.tabChange(url);
            }
        },
        tabAdd (name, url) {
            if (window.$('.layui-tab-content.clildFrame').children().length === 4) {
                Common.alert('浏览器最多支持打开4个标签，请先关闭其他标签');
                return false;
            }
            window.layui.use('element', () => {
                let element = window.layui.element();
                element.tabAdd('demo', {
                    title: name,
                    content: '<iframe style="display" src=' + this.url + '></iframe>',
                    id: url
                })
                // 第一个不能删除
                // window.$('.layui-tab-title').children('li').eq(0).children('i').html('');
            });
        },
        tabChange (url) {
            let that = this;
            window.layui.use('element', () => {
                let element = window.layui.element();
                let $ = window.$;
                element.on('tab(demo)', function (data) {
                    that.changeParent(data);
                    // $('.layui-tab-content.clildFrame').find('.layui-tab-item iframe').each(function () {
                    //     $(this).parent().text(window.$(this).attr('src'));
                    // })
                    // url = $('.layui-tab-content.clildFrame').find('.layui-tab-item.layui-show').text();
                    // let iframe =$('<iframe src=' + url + '></iframe>')
                    // $('.layui-tab-content.clildFrame').find('.layui-tab-item.layui-show').html(iframe);
                })
                // $('.layui-tab-content.clildFrame').find('.layui-tab-item iframe').each(function () {
                //     $(this).parent().text(window.$(this).attr('src'));
                // })
                // let iframe =$('<iframe src=' + this.url + '></iframe>')
                element.tabChange('demo', url);
                // $('.layui-tab-content.clildFrame').find('.layui-tab-item.layui-show').html(iframe);
            });
        },
        changeParent (data) {
            // 点击tab时顶部侧边变化
            let layid = data.elem.find('.layui-this').attr('lay-id');
            for (var i = 0; i < this.headerList.length; i++) {
                let header = this.headerList[i];
                if (header.subMenuList && header.subMenuList.length > 0) {
                    for (var j = 0; j < header.subMenuList.length; j++) {
                        let nav = header.subMenuList[j];
                        if (nav.subMenuList && nav.subMenuList.length > 0) {
                            for (var k = 0; k < nav.subMenuList.length; k++) {
                                let item = nav.subMenuList[k];
                                if (item.resourceUrl === layid) {
                                    this.layuiHeaderSelected = i;
                                    this.layuiNavItemed = j;
                                    this.itemed = k;
                                }
                            }
                        } else {
                            if (nav.resourceUrl === layid) {
                                this.layuiHeaderSelected = i;
                                this.layuiNavItemed = j;
                            }
                        }
                    }
                }
            }
            this.reInitForm();
        },
        hasTab (url) {
            let find = false;
            let $ = window.$;
            $('.layui-tab-title li').each(function () {
                if ($(this).attr('lay-id') === url) {
                    find = true;
                    return;
                }
            })
            return find;
        },
        reInitForm () {
            this.$nextTick(() => {
                window.layui.use(['form', 'element'], () => {
                    var element = window.layui.element();
                    element.init();
                    var form = window.layui.form();
                    form.render();
                });
            })
        },
        logout () {
            window.location.href = './logout.html';
        },
        changePass () {
            //示范一个公告层
            window.layer.open({
                type: 1,
                title: false, //不显示标题栏
                closeBtn: false,
                area: '440px;',
                shade: 0.8,
                id: 'changePass', //设定一个id，防止重复弹出
                btn: ['确定', '取消'],
                moveType: 1, //拖拽模式，0或者1
                content: window.$('#edid_pass').html(),
                success: function (layero) {
                    let inputs = layero.find('input');
                    var btn = layero.find('.layui-layer-btn');
                    btn.css('text-align', 'center');
                    btn.find('.layui-layer-btn0').unbind('click')
                    btn.find('.layui-layer-btn0').attr({
                        href: 'javascript:;'
                    }).on('click', function () {
                        let obj = {
                            originalPassword: inputs[0].value,
                            newPassword: inputs[1].value,
                            confirmNewPassword: inputs[2].value
                        }
                        request('/staff/modifyPassword.html', obj, (response) => {
                            if (response.data.respCode === '000000') {
                                window.layer.msg(response.data.respMsg)
                            } else {
                                window.layer.msg(response.data.respMsg)
                            }
                        }, (e) => {
                            console.log(e)
                        })
                    })
                }
            });
        }
    }
}
</script>