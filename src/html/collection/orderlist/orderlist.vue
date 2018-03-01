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
                                <option value="4">已还款</option>
                                <option value="3">已完成</option>
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                    <!--选择框--><!--director 催收总监 manager 催收经理 supervisor主管 -->
                        <label class="layui-form-label">催收人</label>
                        <div class="layui-input-inline" v-show="roleName=='director'">
                            <select name="deptId" lay-filter="section">
                                <option value="">全部部门</option>
                                <option value="">全部部门</option>
                                <option v-for="item in section" :value="item.departmentId" v-text="item.departmentName"></option>
                            </select>
                        </div>
                        <div class="layui-input-inline" v-show="roleName!='supervisor'">
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
                        <input v-show="false" id="orderBy" type="text" name= 'orderBy' :value="orderBy">
                        <input v-show="false" id="dir" type="text" name="dir" :value="dir">
                    </div>  
                    <div class="layui-inline">
                    <!--选择框-->
                        <label class="layui-form-label">协催</label>
                        <div class="layui-input-inline">
                            <select name="helpFlg">
                                <option value="">全部</option>
                                <option value="">全部</option>
                                <option value="1">是</option>
                                <option value="0">否</option>
                            </select>
                        </div>
                    </div>  
                    <div class="layui-inline" v-show="roleName=='director'|| roleName=='manager'">
                    <!--选择框-->
                        <label class="layui-form-label">有效性</label>
                        <div class="layui-input-inline">
                            <select name="enabled">
                                <option value="">全部</option>
                                <option value="">全部</option>
                                <option value="1">有效</option>
                                <option value="0">无效</option>
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">手机号</label>
                        <div class="layui-input-inline">
                            <input type="text" name="borrowerMobile" @input="change($event.srcElement ? $event.srcElement : $event.target)" placeholder="请输入手机号" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit" style="background:#37a3ff;color:#fff;border-radius:2px;">
                            <i class="layui-icon" style="display:inline-block;transform:scale(0.9);">&#xe615;</i> 查询
                        </button>
                        <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="reset()">    
                            <i class="layui-icon">&#xe631;</i> 重置
                        </button>
                    </div>
                </div>
            </form>
            <div v-show="true">
                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom"  @click="derive()">
                    <i class="layui-icon" ></i> 导出
                </div>
            </div>
            <table class="layui-table" id="table">
                <colgroup>
                </colgroup>
                <thead>
                    <template v-for="(item, index) in thData">
                        <th  v-if="item.orderBy && !item.time" class="pointer" @click="sortData(item, index)">
                            {{item.name}}
                            <i v-show="item.sort==1" class="layui-icon">&#xe625;</i>
                            <i v-show="item.sort==2"class="layui-icon rotate">&#xe625;</i>
                        </th>
                        <th  v-if="item.time &&　roleName != 'director'" class="pointer" @click="sortData(item, index)">
                            {{item.name}}
                            <i v-show="item.sort==1" class="layui-icon">&#xe625;</i>
                            <i v-show="item.sort==2"class="layui-icon rotate">&#xe625;</i>
                        </th>
                        <th v-if ="!item.orderBy">
                            {{item.name}}
                        </th>
                    </template> 
                    <th v-show="roleName=='director'|| roleName=='manager'">有效性</th>
                    <th>复借</th>
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
                        <td v-text="item.createTime">订单创建时间</td>
                        <td v-text="item.borrowerName">欠款人</td>
                        <td v-text="item.borrowerMobile">手机号</td>
                        <td v-text="item.repayAmout ? (item.repayAmout/100).toFixed(2) : '0.00'">欠款</td>
                        <td v-text="item.repayDate">应还款时间</td>
                        <td v-text="item.collectionCountDown" v-show="roleName != 'director'">订单倒计时</td>
                        <td v-text="item.lastCallTime">最后催收时间</td>
                        <td v-text="item.dealUserName">催收人</td>
                        <td v-text="item.helpFlg">协催</td>
                        <td v-show="roleName=='director'|| roleName=='manager'" v-text="item.enabled">有效性</td>
                        <td v-text="item.userFlag">复借</td>
                    </tr>
                </tbody>
            </table>
            <div id="pagination" style="text-align:right"></div>
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
            roleName: '', //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
            //0代表没有排序， 1代表正序 2代表倒叙
            thData: [
                {name: '序号', sort: 0},
                {name: '操作', sort: 0},
                {name: '订单号', sort: 0},
                {name: '订单状态', sort: 0},
                {name: '订单创建时间', sort: 1, orderBy: 'create_time'},
                {name: '欠款人', sort: 0},
                 {name: '手机号', sort: 0},
                {name: '欠款', sort: 1, orderBy: 'repay_amout'},
                {name: '应还款时间', sort: 1, orderBy: 'repay_date'},
                {name: '订单倒计时', sort: 1, orderBy: 'time_limit', time: '1'},
                {name: '最后催收时间', sort: 1, orderBy: 'modify_time'},
                {name: '催收人', sort: 0},
                {name: '协催', sort: 0}
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
            //订单倒计时：”time_limit ”
            orderBy: 'create_time', //默认排序按订单创建时间正序
            dir: 'asc', // asc正序 desc倒序
            list: '', //表格数据
            section: '', // 部门数据
            group: '', //组数据
            staff: '' //员工
        }
    },
    computed: {
    },
    created () {
        //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
        this.roleName = window.localStorage.getItem('roleName'); // 获取职位
        // console.log(this.roleName)
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
            verify.form('commit', (data) => {
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
            //时间控件id
            date.date_input('start', 'end'); // 还款时间
            date.date_input('start2', 'end2'); // 订单创建时间
            this.getTable(); //获取表格数据
            this.getSection(); //获取部门数据
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
                    startRepayDate: '',
                    endRepayDate: '',
                    createStartTime: '',
                    createEndTime: ''
                }
                this.first = true;
                this.pageSize = 10;
            }
            this.form_table = tableDate; // 存储数据排序时用;
            console.log(tableDate)
            request('/collection/directorCollectionList.html', tableDate, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.list = output.collectionRecord; // 数据list
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
        //获取部门
        getSection () {
             //director 催收总监 manager 催收经理 supervisor主管
            let url = '';
            if (this.roleName === 'director') {
                url = '/collection/directorQuery.html'; //总监
            } else if (this.roleName === 'manager') {
                url = '/collection/managerQuery.html'; //经理
            } else if (this.roleName === 'supervisor') {
                url = '/collection/supervisorQuery.html'; //主管
            } else {
                return false;
            }
            request(url, '{}', (response) => {
                // console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    if (this.roleName === 'director') {
                        this.section = output.departmentGroupuserRecord; //部门数据 总监
                        // console.log(this.section)
                    } else if (this.roleName === 'manager') {
                        this.group = output.groupUserRecord; //组数据 经理
                        // console.log(this.group)
                    } else if (this.roleName === 'supervisor') {
                        this.staff = output.userRecord; //员工数据 主管
                        // console.log(this.staff)
                    } else {
                        return false;
                    }
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
            window.$('#orderBy')[0].defaultValue = 'create_time';// 默认订单创建时间
            window.$('#dir')[0].defaultValue = 'asc';
            //排序箭头重置
            for (let i = 0; i < this.thData.length; i++) {
                this.thData[i].sort = 1;
            }
            this.getTable();
        },
        // 查看
        edit (item) {
            tab.tabAdd('订单详情', './collection/detailorder.html?collectionId=' + item.collectionId);
        },
        //去空格
        change (that) {
            that.value = that.value.trim();
        },
         //导出报表
        derive () {
            let config = {
                isDownload: true
            }
            //startRepayDate  endRepayDate createStartTime createEndTime
            let data = window.$.extend(true, [], this.form_table);
            data.startRepayDateSts = data.startRepayDate;
            data.endRepayDateSts = data.endRepayDate;
            data.createStartTimeSts = data.createStartTime;
            data.createEndTimeSts = data.createEndTime;
            delete data.startRepayDate;
            delete data.endRepayDate;
            delete data.createStartTime;
            delete data.createEndTime;
            delete data.pageIndex;
            delete data.pageSize;
            console.log('tablethis', data)
            request('/download/downDirectorCollection.html', data, (response) => {
                console.log(response)
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
