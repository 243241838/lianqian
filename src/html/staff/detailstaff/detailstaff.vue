<template>
     <div class='container'>
         <div class="animate">
            <div class="layui-collapse">
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">员工信息</h2>
                    <div class="layui-colla-content layui-show">
                        <form class="layui-form">
                            <div class="layui-form-item">
                                <label class="layui-form-label">工号:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly  :value="output.jobNo" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">姓名:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="output.staffName"  class="layui-input">
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">账号:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly  :value="output.mainAccount" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">坐席类型:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly  :value="output.agentType" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">外呼座席号:</label>
                                <div class="layui-input-inline">
                                    <input type="text" name="extNumber" readonly  :value="output.extNumber" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-form-item edit">
                                <label class="layui-form-label">邮箱:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="output.email" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-form-item edit">
                                <label class="layui-form-label">手机号:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="output.mobile" class="layui-input">
                                </div>
                            </div>
                            <!--
                            <div class="layui-form-item edit">
                                <label class="layui-form-label">账号状态:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="output.enabled ==1 ? '正常' : '禁用'" class="layui-input">
                                </div>
                            </div>
                            -->
                            <div class="layui-form-item">
                                <label class="layui-form-label">证书:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly value="8800980980" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">注册时间:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="output.createTime" class="layui-input">
                                </div>
                            </div>
                        </form> 
                    </div>
                </div>
                <!--表格-->
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">座席号</h2>
                    <div class="layui-colla-content layui-show">
                            <table class="layui-table" id="table">
                                <colgroup>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>座席号</th>
                                        <th>项目</th>
                                        <th>岗位</th>
                                        <th>注册时间</th>
                                        <th>最后登录时间</th>
                                        <th>账户状态</th>
                                    </tr> 
                                </thead>
                                <tbody>
                                    <tr class="tr-1" v-for="(item,index) in output.staffUserRecord">
                                        <td v-text="index+1"></td>
                                        <td>
                                            <span v-text="item.userName"></span>
                                        </td>
                                        <td v-text="item.projectName"></td>
                                        <td v-text="item.jobPositionStr"></td>
                                        <td v-text="item.createTime"></td>
                                        <td v-text="item.lastLoginTime"></td>
                                        <td v-show="item.enabled == 0">禁用</td>
                                        <td v-show="item.enabled == 1">正常</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-show="!output.staffUserRecord" style="text-align:center">暂无数据</div>
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
    data () {
        return {
            output: '', //获取的详情
            staffId: '' //员工iD
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
        //获取员工Id
        this.staffId = Common.getQueryString('staffId');
        console.log(this.staffId)
        this.init();
    },
    methods: {
        init () {
            //layui初始化
            this.initialize();
            //折叠
            window.layui.use('element', function () {
                var element = window.layui.element();
            });
            this.initGetdata(); // 初始化获取数据
        },
        initGetdata () {
            var data = {
                staffId: this.staffId // 员工Id
            }
            request('/staff/listStaffDetail.html', data, (response) => {
                if (response.data.respCode === '000000') {
                    // console.log(response.data)
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.output = output;
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
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
