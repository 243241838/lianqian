<template>
     <div class='container'>
         <div class="animate">
            <form class="layui-form" id="form">
                <div class="layui-form-item form">
                    <div class="layui-inline">
                        <label class="layui-form-label" style="width:84px">分配时间</label>
                        <div class="layui-input-inline" style="margin-right:0;">
                            <input class="layui-input" readonly  name="startAssignmentTime" placeholder="请选择" id="start">
                        </div>
                        <label class="layui-form-label" style="width:auto">至</label>
                        <div class="layui-input-inline">
                            <input class="layui-input" readonly name="endAssignmentTime" placeholder="请选择" id="end">
                        </div>
                    </div>
                   <div class="layui-inline">
                        <label class="layui-form-label">分配人</label>
                        <div class="layui-input-inline">
                            <select name="assignmentUserId" lay-filter="group">
                                <option value="">全部</option>
                                <option value="">全部</option>
                                <option :value="item.leaderId" v-text="item.leaderName" v-for = 'item in group'></option>
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">被分配人</label>
                        <div class="layui-input-inline">
                            <select name="assignmentToUserId">
                                <option value="">全部</option>
                                <option value="">全部</option>
                                <option :value="item.userId" v-text="item.staffName" v-for="item in staff"></option>
                                <option value="0">未分配</option>
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">所属组</label>
                        <div class="layui-input-inline">
                            <select name="groupId">
                                <option value="">全部</option>
                                <option value="">全部</option>
                                <option :value="item.groupId" v-text="item.groupName" v-for = 'item in group'></option>
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
                        </td>
                        <td v-text="item.assignmentTime">分配时间</td>
                        <td v-text="item.assignmentUserName">分配人</td>
                        <td v-text="item.assignmentToUserName">被分配人</td>
                        <td v-text="item.assignmentCount">分配数量</td>
                        <td v-text="item.groupName">所属组</td>
                    </tr>
                </tbody>
            </table>
            <div id="pagination" style="text-align:right"></div>
            <div v-show="!list" style="text-align:center">暂无数据</div>
         </div>
         <div class="layui-layer custom_alert alert1" v-show="alertShow2">
            <div class="layui-layer-title">分配详情</div>
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
                                    <td  v-text="item.collectionId">订单号</td>
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
    </div>
</template>
<script>
import {verify, date, page, Common} from 'js/layuiCommon';
import request from 'js/interface/request';
import {tab, winLayer} from 'js/common';
export default {
    data () {
        return {
            alertShow2: false, //委外批次详情
            roleName: '', //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
            //0代表没有排序， 1代表正序 2代表倒叙
            thData: [
                {name: '序号', sort: 0},
                {name: '操作', sort: 0},
                {name: '分配时间', sort: 0},
                {name: '分配人', sort: 0},
                {name: '被分配人', sort: 0},
                {name: '分配数量', sort: 0},
                {name: '所属组', sort: 0}
            ],
            first: true,
            pageSize: 10, //一页多少条
            pageIndex: 1, // 当前页码
            first2: true,
            pageSize2: 10, //一页多少条
            pageIndex2: 1, // 当前页码
            form_table: '', //点击查询时存储查询数据
            group: '', //组数据
            staff: '', // 员工数据
            list: '', //表格数据
            list2: '' //表格数据
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
                    console.log(data1)
                    if (data1) {
                        this.getStaff(data1); // 获取员工
                    } else {
                        this.staff = '';
                        this.groupData = '';
                        this.initialize(); // 初始化控件
                    }
                });
                form.render();
            });
            //验证
            verify.form('seach', (data) => {
                let data1 = data.field;
                //分配时间
                if (data1.startAssignmentTime&&data1.endAssignmentTime) {
                    if (data1.startAssignmentTime > data1.endAssignmentTime) {
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
            //时间控件id
            date.date_input('start', 'end'); // 订单创建时间
            this.getTable(); //获取表格数据
            this.getPeople(); // 获取组或人
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
            console.log(tableDate)
            request('/collection/getAssignRecordList.html', tableDate, (response) => {
                console.log(response.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.list = output.assignmentBatchRecord; // 数据list
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
                    BatchId: item.batchId
                }
            }
            // console.log(tableDate)
            request('/collection/getAssignRecordInfo.html', tableDate, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.list2 = output.assignmentBatchInfoRecord; // 数据list
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
         //获取组或人数据
        getPeople () {
            //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
            request('/collection/managerQuery.html', {}, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    // console.log(output)
                    this.group = output.groupUserRecord; //经理组数据
                    this.initialize(); // 初始化控件
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
         //获取员工
        getStaff (leaderId, name) {
            console.log(leaderId)
            // console.log(this.group)
            for (let i = 0; i < this.group.length; i++) {
                if (parseInt(this.group[i].leaderId) === parseInt(leaderId)) {
                    console.log(this.group[i])
                    this.staff= this.group[i].userRecord; // 赋值组数据
                    this.initialize(); // 初始化控件
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
