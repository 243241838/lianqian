<template>
     <div class='container'>
         <div class="animate">
            <form class="layui-form">
                <div class="layui-form-item form">
                    <div class="layui-inline">
                        <label class="layui-form-label">订单号</label>
                        <div class="layui-input-inline">
                            <input type="text" name="orderId" @input="change($event.srcElement ? $event.srcElement : $event.target)"   placeholder="请输入订单号" autocomplete="off" class="layui-input">
                        </div>
                    </div> 
                    <div class="layui-inline">
                    <!--选择框-->
                        <label class="layui-form-label">催收人</label>
                        <div class="layui-input-inline">
                            <select name="deptId" lay-filter="section">
                                <option value="">全部部门</option>
                                <option value="">全部部门</option>
                                <option v-for="item in section" :value="item.departmentId" v-text="item.departmentName"></option>
                            </select>
                        </div>
                        <div class="layui-input-inline">
                            <select name="groupId" lay-filter="group">
                                <option value="">全部组</option>
                                <option value="">全部组</option>
                                <option :value="item.groupId" v-text="item.groupName" v-for="item in group"></option>
                            </select>
                        </div>
                        <div class="layui-input-inline">
                            <select name="dealUserId">
                                <option value="">全部</option>
                                <option value="">全部</option>
                                <option v-for="item in staff" :value="item.userId" v-text="item.staffName"></option>
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                    <!--选择框-->
                        <label class="layui-form-label">订单状态</label>
                        <div class="layui-input-inline">
                            <select name="collectionSts">
                                <option value="">全部</option>
                                <option value="">全部</option>
                                <option value="0">未分配</option>
                                <option value="1">未开始</option>
                                <option value="2">进行中</option>
                                <option value="3">已完成</option>
                            </select>
                        </div>
                    </div> 
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit" style="background:#37a3ff;color:#fff;border-radius:2px;">
                            <i class="layui-icon" style="display:inline-block;transform:scale(0.9);">&#xe615;</i> 查询
                        </button>
                        <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="getTable()">
                            <i class="layui-icon">&#xe631;</i> 重置
                        </button>
                    </div>
                </div>
            </form>
            <table class="layui-table" id="table">
                <colgroup>
                </colgroup>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>操作</th>
                        <th>订单号</th>
                        <th>订单状态</th>
                        <th>欠款人</th>
                        <th>欠款</th>
                        <th>应还款时间</th>
                        <th>订单倒计时</th>
                        <th>最后催收时间</th>
                        <th>所在部</th>
                        <th>所在组</th>
                        <th>催收人</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr class="tr-1" v-for="(item,index) in list">
                        <td v-if="pageIndex-1==0" v-text="index+1"></td>
                        <td v-else v-text="pageSize*(pageIndex-1) + index + 1"></td>
                        <td>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click="edit(item)">查看</div>
                        </td>
                        <td v-text="item.orderId">订单号</td>
                        <td v-text="item.collectionSts">订单状态</td>
                        <td v-text="item.borrowerName">欠款人</td>
                        <td v-text="item.repayAmout ? (item.repayAmout/100).toFixed(2) : '0.00'">欠款</td>
                        <td v-text="item.repayDate">应还款时间</td>
                        <td v-text="item.collectionCountDown">订单倒计时</td>
                        <td v-text="item.lastCallTime">最后催收时间</td>
                        <td v-text="item.deptName">所在部</td>
                        <td v-text="item.groupName">所在组</td>
                        <td v-text="item.dealUserName">催收人</td>
                    </tr>
                </tbody>
            </table>
            <div id="pagination" class="padd20" style="text-align:right"></div>
            <div v-show="!list" style="text-align:center">暂无数据</div>
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
            first: true,
            pageSize: 10, //一页多少条
            pageIndex: 1, // 当前页码
            section: '', // 部门数据
            group: '', //组数据
            staff: '', //员工
            list: '' //表格数据
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
            //点击催收人
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
            verify.form('commit', (data) => {
                let data1 = data.field;
                // 点击查询页码赋值为1；
                if (data1.borrowerName === '' && data1.borrowerMobile === '') {
                    Common.alert('至少输入一个条件');
                    return false;
                }
                data1.pageIndex = 1;
                data1.pageSize = this.pageSize;
                data1.orderBy = 'create_time';
                data1.dir = 'desc';
                this.first = true;
                console.log(data1)
                this.getTable(data1)
            });
            this.getTable();
            this.getSection(); //获取部门数据
        },
        //表格数据
        getTable (data) {
            let tableDate = {};
            if (data) {
                tableDate = data;
            } else {
                tableDate = {
                    pageIndex: 1,
                    pageSize: 10,
                    dir: 'desc',
                    orderBy: 'create_time'
                }
                this.first = true;
                this.pageSize = 10;
            }
            request('/collection/directorCollectionList.html', tableDate, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.list = output.collectionRecord; // 数据list
                    this.pageIndex = tableDate.pageIndex;
                    //分页第一次和搜索时要更新页码
                    if (this.first) {
                        this.first = false;
                        this.addPagination(output.page, tableDate, output.totalCount);// //总页码赋值
                    }
                    //layui初始化
                    this.initialize();
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
        //去空格
        change (that) {
            that.value = that.value.trim();
        },
         //获取部门
        getSection () {
            request('/collection/directorQuery.html', '{}', (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.section = output.departmentGroupuserRecord; //部门数据 总监
                    this.initialize(); // 初始化控件
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //获取组数据
        getGroup (departmentId) {
            for (let i = 0; i < this.section.length; i++) {
                if (parseInt(this.section[i].departmentId) === parseInt(departmentId)) {
                    this.group = this.section[i].groupUserRecord; // 赋值组数据
                    this.initialize(); // 初始化控件
                }
            }
        },
        //获取员工
        getStaff (groupId) {
            for (let i = 0; i < this.group.length; i++) {
                if (parseInt(this.group[i].groupId) === parseInt(groupId)) {
                    this.staff = this.group[i].userRecord; // 赋值组数据
                    this.initialize(); // 初始化控件
                }
            }
            console.log(this.staff)
        },
         // 查看
        edit (item) {
            tab.tabAdd('订单详情', './collection/detailorder.html?collectionId=' + item.collectionId);
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
