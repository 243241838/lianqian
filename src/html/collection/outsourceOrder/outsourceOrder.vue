<template>
     <div class='container'>
         <div class="animate">
            <form class="layui-form" id="form">
                <div class="layui-form-item form">
                    <div class="layui-inline">
                        <label class="layui-form-label">订单号</label>
                        <div class="layui-input-inline">
                            <input type="text" name="orderId" @input="change($event.srcElement ? $event.srcElement : $event.target)" placeholder="请输入订单号" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">还款时间</label>
                        <div class="layui-input-inline" style="margin-right:0">
                            <input class="layui-input" readonly  name="startRepayDate" placeholder="请选择" id="start2">
                        </div>
                        <label class="layui-form-label" style="width:auto">至</label>
                        <div class="layui-input-inline">
                            <input class="layui-input" readonly name="endRepayDate" placeholder="请选择" id="end2">
                        </div>
                    </div>   
                    <div class="layui-inline">
                        <label class="layui-form-label" style="width:84px">订单创建时间</label>
                        <div class="layui-input-inline" style="margin-right:0;">
                            <input class="layui-input" readonly  name="createStartTime" placeholder="请选择" id="start">
                        </div>
                        <label class="layui-form-label" style="width:auto">至</label>
                        <div class="layui-input-inline">
                            <input class="layui-input" readonly name="createEndTime" placeholder="请选择" id="end">
                        </div>
                    </div>
                    <input v-show="false" id="orderBy" type="text" name= 'orderBy' :value="orderBy">
                    <input v-show="false" id="dir" type="text" name="dir" :value="dir">
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="seach" style="background:#37a3ff;color:#fff;border-radius:2px;">
                            <i class="layui-icon" style="display:inline-block;transform:scale(0.9);">&#xe615;</i> 查询
                        </button>
                        <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="reset()">    
                            <i class="layui-icon">&#xe631;</i> 重置
                        </button>
                    </div>
                </div>
            </form>
            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="derive()">
                <i class="layui-icon" ></i> 导出
            </div>
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
                    <tr class="tr-1" v-for="(item,index) in list">
                        <td v-if="pageIndex-1==0" v-text="index+1"></td>
                        <td v-else v-text="pageSize*(pageIndex-1) + index + 1"></td>
                        <!--
                        <td>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click="edit(item)">查看</div>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click="finish(item)">完成</div>
                        </td>
                        -->
                        <td v-text="item.orderId">订单号</td>
                        <td v-text="item.createTime">订单创建时间</td>
                        <td v-text="item.borrowerName">欠款人</td>
                        <td>{{item.idNumber | ellipsisId}}</td>
                        <td v-text="item.repayAmout ? (item.repayAmout/100).toFixed(2) : '0.00'">欠款</td>
                        <td v-text="item.repayDate">应还款时间</td>
                        <td v-text="item.collectionSts">订单状态</td>
                        <td v-text="item.batchId">订单批次</td>
                    </tr>
                </tbody>
            </table>
            <div id="pagination" style="text-align:right"></div>
            <div v-show="!list" style="text-align:center">暂无数据</div>
         </div>
         <div class="layui-layer custom_alert project" v-show="alertShow">
            <div class="layui-layer-title">提示</div>
            <span class="layui-layer-setwin" @click="alertReset()">
                <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
            </span>
            <form class="layui-form" id="alert_form">
                   <div class="layui-form-item" style="text-align:center;">
                       <div class="layui-inline">
                             <label class="layui-form-label" style="width:auto;padding: 9px 15px 9px 0;">收回滞纳金</label>
                            <div class="layui-input-inline">
                                 <input class="layui-input" name="actualDelayCharge" placeholder="" @input="fommort()" lay-verify="required" v-model="money">
                            </div>
                        </div>
                        <div class="layui-inline">
                         元
                        </div>
                    </div>
                    <input type="hidden" name="collectionId" :value="collectionId">
                     <div class="layui-form-item" style="text-align:center;">
                        <div class="layui-inline">
                            <button  class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit">
                                <i class="layui-icon">&#xe605;</i> 确定
                            </button>
                            <button type="reset"  class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="alertShow=false">
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
import {tab, winLayer} from 'js/common';
export default {
    data () {
        return {
            alertShow: false,
            collectionId: '', //订单编号
            roleName: '', //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
            //0代表没有排序， 1代表正序 2代表倒叙
            thData: [
                {name: '序号', sort: 0},
                // {name: '操作', sort: 0},
                {name: '订单号', sort: 0},
                {name: '订单创建时间', sort: 1, orderBy: 'createTime'},
                {name: '欠款人', sort: 0},
                {name: '证件号', sort: 0},
                {name: '欠款', sort: 1, orderBy: 'repayAmout'},
                {name: '应还款时间', sort: 1, orderBy: 'repayDate'},
                {name: '订单状态', sort: 0},
                {name: '所在批次', sort: 0}
            ],
            first: true,
            pageSize: 10, //一页多少条
            pageIndex: 1, // 当前页码
            form_table: '', //点击查询时存储查询数据
            //查询排序;
            //订单创建时间:'createTime'
            //欠款：'repayAmout'
            //应还款时间：'repayDate'
            //订单倒计时：待定最后
            //催收时间：'modify_time'
            //订单倒计时：”time_limit ”
            orderBy: 'createTime', //默认排序按订单创建时间正序
            dir: 'asc', // asc正序 desc倒序
            list: '', //表格数据
            money: ''
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
         //初始化
        this.init();
    },
    methods: {
        //初始化
        init () {
            //layui初始化
            this.initialize();
            window.layui.use('form', () => {
                var form = window.layui.form();
                //select绑定事件
                 //催收人部门点击
                form.on('select(section)', (data) => {
                    let data1 = data.value;
                    this.staff = ''; // 清空员工
                    this.group = ''; //清空组数局
                    if (data1) {
                        this.getGroup(data1); // 获取组数据
                    }
                    this.initialize();
                });
                 //催收人组点击
                form.on('select(group)', (data) => {
                    let data1 = data.value;
                    if (data1) {
                        this.getStaff(data1); // 获取员工
                    }
                });
                form.render();
            });
            //验证
            verify.form('seach', (data) => {
                let data1 = data.field;
                //订单创建时间
                if (data1.createStartTime&&data1.createEndTime) {
                    if (data1.createStartTime > data1.createEndTime) {
                        Common.alert('开始时间必须小于等于结束时间')
                        return false;
                    }
                }
                // endRepayDate startRepayDate 还款时间
                if (data1.startRepayDate&&data1.endRepayDate) {
                    if (data1.startRepayDate > data1.endRepayDate) {
                        Common.alert('开始时间必须小于等于结束时间')
                        return false;
                    }
                }
                // 点击查询页码赋值为1；
                data.field.pageIndex = 1;
                data.field.pageSize = this.pageSize;
                this.first = true;
                //排序箭头重置
                for (let i = 0; i < this.thData.length; i++) {
                    this.thData[i].sort = 1;
                }
                // console.log(data1)
                this.getTable(data1)
            });
            //完成弹框提交
            verify.form('commit', (data) => {
                let data1 = data.field;
                // console.log(data1)
                if (this.money[this.money.length-1] === '.') {
                    Common.alert('格式不正确');
                    return false;
                }
                this.finishCommit(data1)
            });
            //时间控件id
            date.date_input('start', 'end'); // 还款时间
            date.date_input('start2', 'end2'); // 订单创建时间
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
                    dir: this.dir,
                    orderId: '',
                    createStartTime: '',
                    createEndTime: '',
                    startRepayDate: '',
                    endRepayDate: ''
                }
                this.first = true;
                this.pageSize = 10;
            }
            this.form_table = tableDate; // 存储数据排序时用;
            console.log(tableDate)
            request('/collection/collectionOutsourceList.html', tableDate, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.list = output.collectionOutsourceRecord; // 数据list
                    this.pageIndex = tableDate.pageIndex; // 成功后页码赋值
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
            // console.log(this.form_table)
            this.first = true;
            this.getTable(this.form_table); //排序更新数据
        },
        //重置
        reset () {
            window.$('#orderBy')[0].defaultValue = 'createTime';// 默认订单创建时间
            window.$('#dir')[0].defaultValue = 'asc';
            //排序箭头重置
            for (let i = 0; i < this.thData.length; i++) {
                this.thData[i].sort = 1;
            }
            this.getTable();
        },
        //弹框重置
        alertReset () {
            this.alertShow = false;
            window.$('#alert_form')[0].reset()
        },
        // 查看
        edit (item) {
            tab.tabAdd('订单详情', './collection/detailorder.html?collectionId=' + item.collectionId);
        },
        finish (item) {
            this.collectionId = item.collectionId;
            this.alertShow = true;
        },
         //导出报表
        derive () {
            let config = {
                isDownload: true
            }
            let data = {
                orderBy: this.form_table.orderBy,
                dir: this.form_table.dir,
                orderId: this.form_table.orderId,
                createStartTime: this.form_table.createStartTime,
                createEndTime: this.form_table.createEndTime,
                startRepayDate: this.form_table.startRepayDate,
                endRepayDate: this.form_table.endRepayDate
            }
            console.log(data)
            request('/download/downOutsourceCollection.html', data, (response) => {
                // console.log(response)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            }, config)
        },
        //完成
        finishCommit (data) {
            data.actualDelayCharge = data.actualDelayCharge*100;
            console.log(data)
            request('/collection/collectionOutsourceUpdate.html', data, (response) => {
                console.log(response.data)
                if (response.data.respCode === '000000') {
                    this.alertShow = false;
                    Common.alert('操作完成')
                    this.first = true;
                    this.money = '';
                    this.getTable(this.form_table)
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //只能输入两位小数和数字
        fommort () {
            // replace(/[^\d.]/g, ''); //清除数字和.以外的字符
            // replace(/\.{2,}/g, '.');  //只保留第一个. 清除多余的
            // replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
            // replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
            this.money = this.money.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
            // //首位不能为.
            if (this.money !== '' && this.money[0] === '.') {
                this.money = ''
            }
            // //以上已经过滤,此处控制的是如果没有小数点,首位不能为类似于01,02的金额
            if (this.money.indexOf('.')< 0 && this.money !== '') {
                if (this.money.length === 2) {
                    this.money = parseFloat(this.money)
                }
                //第一位不能为.
                if (this.money[0] === '.') {
                    this.money = ''
                }
            }
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
