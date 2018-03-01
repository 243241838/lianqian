<template>
     <div class='container'>
         <div class="animate">
            <div style="text-align:right;padding:0 10px 10px 0">
                <div class="layui-btn layui-btn-small  layui-btn-normal layui-btn-custom radius" @click="go_url()">历史订单</div>
            </div>
            <div class="layui-collapse">
                <div class="layui-colla-item" v-show="exceptionDetail">
                    <h2 class="layui-colla-title">异常处理</h2>
                    <div class="layui-colla-content layui-show">
                        <form class="layui-form">
                            <div class="layui-inline">
                                <label class="layui-form-label">有效性:</label>
                                <div class="layui-input-inline">
                                    <p class="layui-input" style="border:0;color: initial;" v-text="exceptionDetail.enabled"></p>
                                </div>
                            </div><br>
                            <div class="layui-inline">
                                <label class="layui-form-label">审核时间:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="exceptionDetail.createTime"  class="layui-input">
                                </div>
                            </div><br>
                            <div class="layui-inline" style="display:block;">
                                <label class="layui-form-label" style="padding:5px 15px 0px; line-height:28px;">异常描述:</label>
                                    <p class="layui-input" style="border:0;color: initial;height:auto;line-height:28px;padding-top:5px;" v-text="exceptionDetail.exceptionsComment"></p>
                            </div>
                        </form> 
                    </div>
                </div>
                <!--表格-->
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">订单信息</h2>
                    <div class="layui-colla-content layui-show">
                        <form class="layui-form">
                            <div class="layui-inline">
                                <label class="layui-form-label">订单编号:</label>
                                <div class="layui-input-inline">
                                    <p class="layui-input" style="border:0;color: initial;" v-text="output.orderId"></p>
                                </div>
                            </div><br>
                            <div class="layui-inline">
                                <label class="layui-form-label">订单状态:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="output.collectionSts"  class="layui-input">
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label">协催:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly  :value="output.helpFlg==1 ? '是': '否'" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-inline edit">
                                <label class="layui-form-label">欠款人:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="output.borrowerName" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-inline edit">
                                <label class="layui-form-label">证件号:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="output.idNumber" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-inline edit">
                                <label class="layui-form-label">手机号:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="output.borrowerMobile" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label">应还款:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="output.repayAmout? (output.repayAmout/100).toFixed(2): '0.00'" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label">还款时间:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="output.repayDate" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label" style="width:88px">最后催收时间:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="output.lastCallTime" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label">订单倒计时:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="output.collectionCountDown" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label label">展期金额:</label>
                                <div class="layui-input-inline">
                                    <input :value="output.extensionAmout ? (output.extensionAmout/100).toFixed(2) : 0" style="border:0;" disabled type="text" class="layui-input padding0">
                                </div>
                            </div>
                             <div class="layui-inline">
                                <label class="layui-form-label label">复借:</label>
                                <div class="layui-input-inline">
                                    <input :value="output.userFlag" style="border:0;" disabled type="text" class="layui-input padding0">
                                </div>
                            </div>
                            <!--
                            <div class="layui-inline">
                                <label class="layui-form-label">逾期时间:</label>
                                <div class="layui-input-inline">
                                    <input type="text" readonly :value="output.overdueTime" class="layui-input">
                                </div>
                            </div>
                            -->
                        </form> 
                    </div>
                </div>
                <!--表格-->
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">催收历史</h2>
                    <div class="layui-colla-content layui-show">
                            <table class="layui-table" id="table">
                                <colgroup>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>状态标签</th>
                                        <th>关系标签</th>
                                        <th>催收时间</th>
                                        <th>被催收人</th>
                                        <th>电话号码</th>
                                        <th>通话时长</th>
                                        <th>播放</th>
                                        <th>所在部门</th>
                                        <th>所在组</th>
                                        <th>催收人</th>
                                        <th>备注</th>
                                    </tr> 
                                </thead>
                                <tbody>
                                    <tr class="tr-1" v-for="(item,index) in list">
                                        <td v-text="index+1"></td>
                                        <td>
                                            <span v-text="item.resultTag"></span>
                                        </td>
                                         <td>
                                            <span v-text="item.resultTagRelation"></span>
                                        </td>
                                        <td v-text="item.callTime"></td>
                                        <td v-text="item.callName"></td>
                                        <td v-text="item.callTel"></td>
                                        <td v-text="item.callDuration"></td>
                                        <td v-text="item.callContent"></td>
                                        <td v-text="item.deptName"></td>
                                        <td v-text="item.groupName"></td>
                                        <td v-text="item.staffName"></td>
                                        <td style="width:30%" v-text="item.comment"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-show="!list" style="text-align:center">暂无数据</div>
                    </div>
                </div>
            </div>
         </div>
    </div>
</template>
<script>
import {verify, date, page, Common} from 'js/layuiCommon';
import request from 'js/interface/request';
import {tab} from 'js/common'
export default {
    data () {
        return {
            output: '', //获取的详情
            list: '', // table数据
            exceptionDetail: '', // 异常数据
            collectionId: '' //员工iD
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
        //获取订单编号
        //HQB201703021627500058
        this.collectionId = Common.getQueryString('collectionId') || 'YRD201708291714548816652';
        console.log(this.collectionId)
        this.init();
    },
    methods: {
        init () {
            //初始化
            this.initialize();
            //折叠
            window.layui.use('element', function () {
                var element = window.layui.element();
            });
            this.initGetdata(); // 初始化获取详情数据
            this.getTable();
        },
        //订单详情
        initGetdata () {
            var data = {
                collectionId: this.collectionId // 员工Id
            }
            request('/collection/detail.html', data, (response) => {
                if (response.data.respCode === '000000') {
                    console.log(response.data.data)
                    this.output = response.data.data;
                    if (this.output.exceptionDetail) {
                        this.exceptionDetail = this.output.exceptionDetail;
                    }
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //订单历史类表
        getTable () {
            var data = {
                collectionId: this.collectionId // 员工Id
            }
            request('/collectionLogs/list.html', data, (response) => {
                if (response.data.respCode === '000000') {
                    console.log(response.data.data)
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.list = output.collectionLogsRecord;
                    // console.log(this.list)
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        go_url () {
            tab.tabAdd('历史记录', './collection/history.html?collectionId=' + this.collectionId);
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
