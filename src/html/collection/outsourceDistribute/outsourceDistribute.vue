<template>
     <div class='container'>
         <div class="animate">
            <form class="layui-form" id="form">
                <div class="layui-form-item form">
                    <div class="layui-inline">
                        <label class="layui-form-label">批次号</label>
                        <div class="layui-input-inline">
                            <input type="text" name="batchId" @input="change($event.srcElement ? $event.srcElement : $event.target)" placeholder="请输入订单号" autocomplete="off" class="layui-input">
                        </div>
                    </div>   
                    <div class="layui-inline">
                        <label class="layui-form-label" style="width:84px">创建时间</label>
                        <div class="layui-input-inline" style="margin-right:0;">
                            <input class="layui-input" readonly  name="createStartTime" placeholder="请选择" id="start">
                        </div>
                        <label class="layui-form-label" style="width:auto">至</label>
                        <div class="layui-input-inline">
                            <input class="layui-input" readonly name="createEndTime" placeholder="请选择" id="end">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">请求委外人</label>
                        <div class="layui-input-inline">
                            <input type="text" name="staffName"  placeholder="请输入请求委外人" autocomplete="off" class="layui-input">
                        </div>
                    </div>   
                    <div class="layui-inline">
                        <label class="layui-form-label">账龄</label>
                        <div class="layui-input-inline">
                            <select name="deptType">
                                <option value="">全部</option>
                                <option value="">全部</option>
                                <option :value="item.deptTypeId" v-for="item in departmentTypeRecordList" v-text="item.deptType"></option>
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="seach" style="background:#37a3ff;color:#fff;border-radius:2px;">
                            <i class="layui-icon" style="display:inline-block;transform:scale(0.9);">&#xe615;</i> 查询
                        </button>
                        <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="getTable();">    
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
                    <tr class="tr-1" v-for="(item,index) in list">
                        <td v-if="pageIndex-1==0" v-text="index+1"></td>
                        <td v-else v-text="pageSize*(pageIndex-1) + index + 1"></td>
                        <td>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click="see(item)">查看</div>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click="derive(item)">导出</div>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click="appoint(item)" v-show="!item.outsourceStatus">委派</div>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click="collectionDelegateToDepartRecall(item)" v-show="item.outsourceStatus == 1">撤回</div>
                        </td>
                        <td v-text="item.batchId">委外批次</td>
                        <td v-text="item.createTime">创建时间</td>
                        <td v-text="item.staffName">请求为外人</td>
                        <td v-text="item.outsourceCount">数量</td>
                        <td v-text="item.deptType">账龄</td>
                        <td v-text="item.deptName">委案至</td>
                        <td v-text="item.outsourceyTime">委案时间</td>
                        <td v-show="item.outsourceStatus == 1" >已委外</td>
                        <td v-show="item.outsourceStatus == 2">已撤回</td>
                        <td v-show="!item.outsourceStatus"></td>
                    </tr>
                </tbody>
            </table>
            <div id="pagination" style="text-align:right"></div>
            <div v-show="!list" style="text-align:center">暂无数据</div>
         </div>
         <div class="layui-layer custom_alert alert1" v-show="alertShow2">
            <div class="layui-layer-title">委外批次详情</div>
            <span class="layui-layer-setwin" @click="alertShow2=false">
                <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
            </span>
            <div class="layui-form1 table">
                <div class="layui-form-item" style="text-align:center;" id="aa">
                    <div class="layui-block" style="padding: 0 20px">
                        <table class="layui-table" id="table2">
                            <colgroup>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>订单号</th>
                                    <th>订单创建时间</th>
                                    <th>欠款人</th>
                                    <th>证件号</th>
                                    <th>手机号</th>
                                    <th>欠款</th>
                                    <th>应还款时间</th>
                                    <th>订单状态</th>
                                    <th>所在批次</th>
                                </tr> 
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in list2">
                                    <td v-if="pageIndex2-1==0" v-text="index+1"></td>
                                    <td v-else v-text="pageSize2*(pageIndex2-1) + index + 1"></td>
                                    <td  v-text="item.orderId">订单号</td>
                                    <td v-text="item.createTime">订单创建时间</td>
                                    <td v-text="item.borrowerName">欠款人</td>
                                    <td >{{item.idNumber | ellipsisId}}</td>
                                    <td v-text="item.borrowerMobile">手机号</td>
                                    <td v-text="item.repayAmout ? (item.repayAmout/100).toFixed(2) : '0.00'">欠款</td>
                                    <td v-text="item.repayDate">应还款时间</td>
                                    <td v-text="item.collectionSts">订单状态</td>
                                    <td v-text="item.batchId">所在批次</td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="pagination2" style="text-align:right"></div>
                        <div v-show="!list2" style="text-align:center">暂无数据</div>
                    </div>
                </div>
            </div>    
        </div>
         <div class="layui-layer custom_alert project" v-show="alertShow">
            <div class="layui-layer-title">提示</div>
            <span class="layui-layer-setwin" @click="alertReset()">
                <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
            </span>
            <form class="layui-form" id="alert_form">
                   <div class="layui-form-item" style="text-align:center;">
                       <div class="layui-inline">
                            <label class="layui-form-label">委派至</label>
                            <div class="layui-input-inline">
                                <select name="deptId" lay-verify="required">
                                    <option value="">请选择的</option>
                                    <option value="">请选择的</option>
                                    <option :value="item.deptId" v-for="item in ourceDepartment" v-text="item.deptName"></option>
                                </select>
                            </div>
                        </div>
                        <div class="layui-inline">
                            <label class="layui-form-label">委派期</label>
                            <div class="layui-input-inline">
                                <input class="layui-input"disabled placeholder="禁止输入" onclick="layui.laydate({elem: this, istime: true, format: 'YYYY-MM-DD'})">
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="batchId" :value="batchId">
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
            alertShow2: false, //委外批次详情
            roleName: '', //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
            //0代表没有排序， 1代表正序 2代表倒叙
            thData: [
                {name: '序号', sort: 0},
                {name: '操作', sort: 0},
                {name: '委外批次', sort: 0},
                {name: '创建时间', sort: 0},
                {name: '请求委外人', sort: 0},
                {name: '数量', sort: 0},
                {name: '账龄', sort: 0},
                {name: '委案至', sort: 0},
                {name: '委案时间', sort: 0},
                {name: '状态', sort: 0}
            ],
            first: true,
            pageSize: 10, //一页多少条
            pageIndex: 1, // 当前页码
            first2: true,
            pageSize2: 10, //一页多少条
            pageIndex2: 1, // 当前页码
            form_table: '', //点击查询时存储查询数据
            list: '', //表格数据
            list2: '', //表格数据
            ourceDepartment: '', //委外部门
            batchId: '', //批次号
            departmentTypeRecordList: '' //部门类型（账龄）
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
                this.getTable(data1)
            });
            //完成弹框提交
            verify.form('commit', (data) => {
                let data1 = data.field;
                this.appointCommit(data1)
            });
            //时间控件id
            date.date_input('start', 'end'); // 订单创建时间
            this.getTable(); //获取表格数据
            this.getDepartType(); // 部门类型
            this.getoutsourceDepartment(); //获取委外部门
        },
        //获取委外部门
        getoutsourceDepartment () {
            request('/collection/outsourceDepartment.html', {}, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    if (response.data.data) {
                        this.ourceDepartment = response.data.data.departmentRecordList;
                        console.log(this.ourceDepartment)
                    }
                    this.initialize();
                } else {
                    window.layer.msg(response.data.respMsg);
                }
            }, (e) => {
                console.log(e)
            })
        },
        getDepartType () {
            // 部门类型
            request('/departmentType/getDepartType.html', {}, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    if (response.data.data) {
                        this.departmentTypeRecordList = response.data.data.departmentTypeRecordList;
                    }
                    this.initialize();
                } else {
                    window.layer.msg(response.data.respMsg);
                }
            }, (e) => {
                console.log(e)
            })
        },
        //表格数据
        getTable (data) {
            let tableDate = ''
            if (data) {
                tableDate = data;
            } else {
                tableDate = {
                    pageIndex: 1,
                    pageSize: 10
                }
                this.first = true;
                this.pageSize = 10;
            }
            this.form_table = tableDate; // 存储数据排序时用;
            // console.log(tableDate)
            request('/collection/getOutsourceBatchList.html', tableDate, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.list = output.outsourceBatchRecordList; // 数据list
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
         // 查看
        see (item) {
            winLayer.loadOn(2)
            this.alertShow2 = true;
            this.pageIndex2 = 1;
            this.pageSize2 = 10;
            this.first2 = true;
            this.getSeeTable(undefined, item)
        },
         //表格数据
        getSeeTable (data, item) {
            let tableDate = ''
            if (data) {
                tableDate = data;
            } else {
                tableDate = {
                    pageIndex: 1,
                    pageSize: 10,
                    batchId: item.batchId
                }
            }
            console.log(tableDate)
            request('/collection/outsourceBatchCollectionList.html', tableDate, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.list2 = output.collectionOutsourceRecord; // 数据list
                    this.pageIndex2 = tableDate.pageIndex; // 成功后页码赋值
                    //分页第一次和搜索时要更新页码
                    if (this.first2) {
                        this.first2 = false;
                        this.addPagination2(output.page, tableDate, output.totalCount);// //总页码赋值
                    }
                    this.initialize(); // 初始化控件
                } else {
                    Common.alert(response.data.respMsg);
                }
                winLayer.loadOff()
            }, (e) => {
                winLayer.loadOff()
                Common.alert(e);
            })
        },
        //添加分页
        addPagination2 (pages, obj, totalCount) {
            let config = {
                that: this,
                pagination: 'pagination2',
                pages: pages,
                pageIndexName: 'pageIndex',
                // pageSizeName: 'pageSize',
                firstName: 'first2',
                requestMethod: 'getSeeTable',
                totalCount: totalCount
            }
            page.table_laypage(config, obj);
        },
        //弹框重置
        alertReset () {
            this.alertShow = false;
            window.$('#alert_form')[0].reset()
        },
        //委派
        appoint (item) {
            this.batchId = item.batchId;
            this.alertShow = true;
        },
         //导出报表
        derive (item) {
            let config = {
                isDownload: true
            }
            let data = {
                batchId: item.batchId
            }
            console.log(data)
            request('/download/downOutsourceCollectionByBatchId.html', data, (response) => {
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
        appointCommit (data) {
            console.log(data)
            winLayer.loadOn(2)
            request('/collection/collectionDelegateToDepart.html', data, (response) => {
                console.log(response.data)
                if (response.data.respCode === '000000') {
                    this.alertShow = false;
                    Common.alert(response.data.respMsg);
                    this.first = true;
                    this.batchId = '';
                    this.getTable(this.form_table)
                } else {
                    Common.alert(response.data.respMsg);
                }
                winLayer.loadOff() // 关闭load
            }, (e) => {
                winLayer.loadOff() // 关闭load
                Common.alert(e);
            })
        },
        //撤回
        collectionDelegateToDepartRecall (item) {
            winLayer.loadOn(2)
            request('/collection/collectionDelegateToDepartRecall.html', {batchId: item.batchId}, (response) => {
                console.log(response.data)
                if (response.data.respCode === '000000') {
                    Common.alert(response.data.respMsg);
                    this.first = true;
                    this.getTable(this.form_table)
                } else {
                    Common.alert(response.data.respMsg);
                }
                winLayer.loadOff() // 关闭load
            }, (e) => {
                winLayer.loadOff() // 关闭load
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
