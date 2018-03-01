<template>
     <div class='container'>
         <div class="animate">
            <form class="layui-form" id="form">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">订单号</label>
                        <div class="layui-input-inline">
                            <input type="text" name="orderId" @input="change($event.srcElement ? $event.srcElement : $event.target)" placeholder="请输入订单号" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">还款时间</label>
                        <div class="layui-input-inline" style="margin-right:0;">
                            <input class="layui-input" readonly  name="startRepayDate" placeholder="请选择" id="start">
                        </div>
                        <label class="layui-form-label" style="width:auto">至</label>
                        <div class="layui-input-inline">
                            <input class="layui-input" readonly name="endRepayDate" placeholder="请选择" id="end">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">完成时间</label>
                        <div class="layui-input-inline" style="margin-right:0;">
                            <input class="layui-input" readonly  name="modifyStartTime" placeholder="请选择" id="start2">
                        </div>
                        <label class="layui-form-label" style="width:auto">至</label>
                        <div class="layui-input-inline">
                            <input class="layui-input" readonly name="modifyEndTime" placeholder="请选择" id="end2">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">手机号</label>
                        <div class="layui-input-inline">
                            <input type="text" name="borrowerMobile" @input="change($event.srcElement ? $event.srcElement : $event.target)" placeholder="请输入手机号" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">还款方式</label>
                        <div class="layui-input-inline">
                            <select name="repaymentType">
                                <option value="">全部</option>
                                <option value="">全部</option>
                                <option value="1">全额还款</option>
                                <option value="2">展期</option>
                                <!--
                                <option value="3">只还滞纳金</option>
                                <option value="4">不足额还款</option>
                                -->
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                    <!--选择框-->
                        <label class="layui-form-label" name="">订单状态</label>
                        <div class="layui-input-inline">
                            <select name="collectionSts">
                                <option value="">全部</option>
                                <option value="">全部</option>
                                <option value="4">已还款</option>
                                <option value="3">已完成</option>
                            </select>
                        </div>
                    </div>
                    <input v-show="false" id="orderBy" type="text" name= 'orderBy' :value="orderBy">
                    <input v-show="false" id="dir" type="text" name="dir" :value="dir">
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom"  lay-submit lay-filter="seach" style="background:#37a3ff;color:#fff;border-radius:2px;">
                            <i class="layui-icon" style="display:inline-block;transform:scale(0.9);">&#xe615;</i> 查询
                        </button>
                         <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom"  @click="reset()">
                            <i class="layui-icon">&#xe631;</i> 重置
                        </button>
                    </div>
                </div>
            </form>
            <table class="layui-table" id="table">
                <colgroup>
                </colgroup>
                <thead>
                    <template v-for="(item, index) in thData">
                        <th  v-if="item.orderBy" class="pointer" @click="sortData(item, index)">
                            {{item.name}}
                            <i v-show="item.sort==1" class="layui-icon">&#xe625;</i>
                            <i v-show="item.sort==2"class="layui-icon rotate">&#xe625;</i>
                        </th>
                        <th v-else>
                            {{item.name}}
                        </th>
                    </template> 
                </thead>
                <tbody>
                    <tr  v-for="(item,index) in list">
                        <td v-if="pageIndex-1==0" v-text="index+1"></td>
                        <td v-else v-text="pageSize*(pageIndex-1) + index + 1"></td>
                        <td>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click="go_url(item)">查看</div>
                        </td>
                        <td v-text="item.orderId">订单号</td>
                        <td v-text="item.createTime">订单创建时间</td>
                        <td v-text="item.borrowerName">欠款人</td>
                        <td v-text="item.borrowerMobile">手机号</td>
                        <td v-text="item.repayAmout ? (item.repayAmout/100).toFixed(2) : '0.00'">欠款</td>
                        <td v-text="item.repayDate">应还款时间</td>
                        <td v-text="item.modifyTime">订单完成时间</td>
                        <td v-text="item.repaymentType">还款方式</td>
                        <td v-text="item.actualDelayCharge ? (item.actualDelayCharge/100).toFixed(2) : '0.00'">滞纳金</td>
                        <td v-text="item.collectionSts">订单状态</td>
                    </tr>
                </tbody>
            </table>
            <div id="pagination" style="text-align:right"></div>
            <div v-show="!list" style="text-align:center">暂无数据</div>
        </div>
    </div>
</template>
<script>
import {verify, date, page, Common, checkbox} from 'js/layuiCommon';
import request from 'js/interface/request';
import {tab} from 'js/common';
export default {
    data () {
        return {
            roleName: '', //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
            //0代表没有排序， 1代表正序 2代表倒叙
            thData: [
                {name: '序号', sort: 0},
                {name: '操作', sort: 0},
                {name: '订单号', sort: 0},
                {name: '订单创建时间', sort: 1, orderBy: 'create_time'},
                {name: '欠款人', sort: 0},
                {name: '手机号', sort: 0},
                {name: '欠款', sort: 1, orderBy: 'repay_amout'},
                {name: '还款时间', sort: 1, orderBy: 'repay_date'},
                {name: '订单完成时间', sort: 1, orderBy: 'modify_time'},
                {name: '还款方式', sort: 0},
                {name: '滞纳金', sort: 0},
                {name: '订单状态', sort: 0}
            ],
            first: true,
            pageSize: 10, //一页多少条
            pageIndex: 1, // 当前页码
            form_table: '', //点击查询时存储查询数据
            //查询排序;
            //订单创建时间:'create_time'
            //欠款：'repay_amout'
            //应还款时间：'repay_date'
            //订单倒计时：待定最后
            //催收时间：'modify_time'
            orderBy: 'create_time', //默认排序按订单创建时间正序
            dir: 'asc', // asc正序 desc倒序
            list: '' //表格数据
        }
    },
    computed: {
    },
    created () {
        //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
        this.roleName = window.localStorage.getItem('roleName'); // 获取职位
    },
    mounted () {
         //初始化
        this.init();
        this.initialize();
    },
    methods: {
        //初始化
        init () {
            //表单搜索
            verify.form('seach', (data) => {
                let data1 = data.field;
                // endRepayDate startRepayDate 还款时间
                if (data1.startRepayDate&&data1.endRepayDate) {
                    if (data1.startRepayDate > data1.endRepayDate) {
                        Common.alert('开始时间必须小于等于结束时间')
                        return false;
                    }
                }
                //modifyStartTime modifyEndTime完成时间
                if (data1.modifyStartTime&&data1.modifyEndTime) {
                    if (data1.modifyStartTime > data1.modifyEndTime) {
                        Common.alert('开始时间必须小于等于结束时间')
                        return false;
                    }
                }
                // 点击查询页码赋值为1；
                data1.pageIndex = 1;
                data1.pageSize = this.pageSize;
                this.first = true;
                //排序箭头重置
                for (let i = 0; i < this.thData.length; i++) {
                    this.thData[i].sort = 1;
                }
                console.log(data1)
                this.getTable(data1)
            });
            date.date_input('start', 'end'); // 还款时间
            date.date_input('start2', 'end2'); //完成
            this.getTable(); //获取表格数据
        },
        //表格数据
        getTable (data) {
            let tableDate = ''
            if (data) {
                tableDate = data;
            } else {
                tableDate = {
                    pageIndex: 1,
                    pageSize: 10,
                    orderBy: this.orderBy,
                    dir: this.dir
                }
                this.first = true;
                this.pageSize = 10;
                // console.log('初始化表格')
            }
            this.form_table = tableDate; // 存储数据排序时用;
            // console.log(tableDate)
            request('/collection/myFinishCollectionList.html', tableDate, (response) => {
                console.log(response.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (output) {
                        this.list = output.collectionRecord; // 数据list
                        this.pageIndex = tableDate.pageIndex; //成功后页码赋值
                    } else {
                        return false;
                    }
                    //分页第一次和搜索时要更新页码
                    if (this.first) {
                        this.first = false;
                        this.addPagination(output.page, tableDate, output.totalCount);// //总页码赋值
                    }
                    this.initialize(); // 初始化控件
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //添加分页
        addPagination (pages, obj, totalCount) {
            let config = {
                that: this,
                pagination: 'pagination',
                pages: pages,
                pageIndexName: 'pageIndex',
                pageSizeName: 'pageSize',
                firstName: 'first',
                requestMethod: 'getTable',
                totalCount: totalCount
            }
            page.table_laypage(config, obj);
        },
        //排序
        sortData (item, index) {
            for (let i = 0; i < this.thData.length; i++) {
                if (i === index) {
                    if (item.sort === 1) {
                        item.sort = 2;
                        this.form_table.dir = 'desc'; //倒叙
                    } else {
                        item.sort = 1;
                        this.form_table.dir = 'asc'; // 正序
                    }
                } else {
                    this.thData[i].sort = 1;
                }
            }
            this.form_table.pageIndex = 1; // 页码重置为1
            this.form_table.orderBy = item.orderBy; // 排序的名字
            console.log(this.form_table)
            this.first = true;
            this.getTable(this.form_table); //排序更新数据
        },
        //重置
        reset () {
            window.$('#orderBy')[0].defaultValue = 'create_time';// 默认订单创建时间
            window.$('#dir')[0].defaultValue = 'asc';
            //排序箭头重置
            for (let i = 0; i < this.thData.length; i++) {
                this.thData[i].sort = 1;
            }
            this.getTable();
        },
        //跳转订单详情
        go_url (item) {
            tab.tabAdd('订单详情', './collection/detailorder.html?collectionId=' + item.collectionId);
        },
         //去空格
        change (that) {
            that.value = that.value.trim();
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
        // 身份证省略显示
        ellipsisId: function (value) {
            if (!value) {
                return;
            }
            var str = value.substring(0, 4);
            for (var i = 4; i < value.length - 4; i++) {
                str += '*';
            }
            return str + value.substring(value.length - 4);
        }
    }
}
</script>
