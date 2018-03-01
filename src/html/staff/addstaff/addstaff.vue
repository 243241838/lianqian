<template>
     <div class='container'>
         <div class="animate">
            <form class="layui-form" id="form">
                <div class="layui-collapse">
                        <div class="layui-colla-item">
                            <h2 class="layui-colla-title">员工信息</h2>
                            <div class="layui-colla-content layui-show">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">工号</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="jobNo" lay-verify="required|jobNo" placeholder="请输入工号" autocomplete="off" class="layui-input" maxlength="10">
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">姓名</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="staffName"   lay-verify="required|cneeName"  placeholder="请输入姓名" autocomplete="off" class="layui-input" maxlength="20">
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">账号</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="mainAccount"   lay-verify="required|account"  placeholder="请输入账号" autocomplete="off" class="layui-input" maxlength="20">
                                    </div>
                                </div>    
                                <div class="layui-form-item">
                                    <label class="layui-form-label">邮箱</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="email"   lay-verify=""  placeholder="请输入邮箱" autocomplete="off" class="layui-input">
                                    </div>
                                </div>    
                                <div class="layui-form-item">
                                    <label class="layui-form-label">手机号</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="mobile"   lay-verify=""  placeholder="请输入手机号" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                                <div class="layui-form-item" v-if="false">
                                    <label class="layui-form-label">外呼座席号</label>
                                    <div class="layui-input-inline">
                                        <select lay-verify="required" lay-filter="type">
                                               <option value="">请选择类型</option> 
                                               <option value="1">中继线（初催）</option>
                                               <option value="2">卡座（复催，终催等）</option>
                                        </select>
                                    </div>
                                    <div class="layui-input-inline">
                                        <select name="extNumber" lay-verify="required">
                                           <option value="">请选择</option>
                                           <template v-for="(item, index) in list">
                                               <option :value="item.extNumber" v-text="item.extNumber"></option>
                                           </template>
                                        </select>
                                    </div>
                                </div>   
                            </div>
                        </div>
                </div>
                <!--提交按钮-->
                <div class="layui-form-item"></div>
                <div class="layui-form-item" style="margin-left:170px;">
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit">
                            <i class="layui-icon">&#xe605;</i> 保存
                        </button>
                        <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="go_back()">
                            <i class="layui-icon">&#x1006;</i> 取消
                        </button>
                    </div>
                </div>
            </form> 
         </div>
    </div>
</template>
<script>
import {verify, date, page, Common} from 'js/layuiCommon';
import request from 'js/interface/request';
import {tab} from 'js/common';
export default {
    data () {
        return {
            list: '' //外呼座席号
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {
            //layui初始化
            this.initialize();
            //折叠
            window.layui.use(['element', 'form'], () => {
                var element = window.layui.element();
                var form = window.layui.form();
                  //催收人部门点击
                form.on('select(type)', (data) => {
                    let data1 = data.value;
                    this.getFreeExtenNumber(data1); //获取号段
                });
            });
            //总提交
            verify.form('commit', (data) => {
                let data1 = data.field;
                //保存
                this.sub(data1)
            });
        },
        //获取空闲座席号
        getFreeExtenNumber (number) {
            let obj = {
                agentType: number
            }
            request('/staff/getFreeExtenNumber.html', obj, (response) => {
                if (response.data.respCode === '000000') {
                    this.list = response.data.data.extenFreeNumberRecordList;
                    console.log(this.list)
                    this.initialize();
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //提交保存
        sub (data) {
            console.log(data)
            request('/staff/add.html', data, (response) => {
                if (response.data.respCode === '000000') {
                    Common.alert(response.data.respMsg);
                    window.$('#form')[0].reset();
                    this.list = '';
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //返回
        go_back () {
            tab.tabDelete('./staff/addstaff.html');
        },
        //layui初始化控件（要多次初始化）
        initialize () {
            this.$nextTick(() => {
                window.layui.use('form', () => {
                    var form = window.layui.form();
                    form.render();
                })
            })
        }
    },
    filters: {
    }
}
</script>
