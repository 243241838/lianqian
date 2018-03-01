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
                        <div class="layui-input-inline" style="margin-right:0;">
                            <input class="layui-input" readonly name="startRepayDate" placeholder="请选择" id="start">
                        </div>
                        <label class="layui-form-label" style="width:auto">至</label>
                        <div class="layui-input-inline">
                            <input class="layui-input" readonly name="endRepayDate" placeholder="请选择" id="end">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label" v-if="roleName=='manager'">所在组</label>
                        <div class="layui-input-inline" v-if="roleName=='manager'">
                            <select name="groupId" lay-filter="group">
                                <option value="">全员</option>
                                <option value="">全员</option>
                                <option :value="item.groupId" v-text="item.groupName" v-for = 'item in group'></option>
                                <option value="0">未分配</option>
                            </select>
                        </div>
                        <label class="layui-form-label" v-if="roleName=='supervisor'">催收人</label>
                        <div class="layui-input-inline" v-if="isStaff">
                            <select name="userId">
                                <option value="">全部</option>
                                <option value="">全部</option>
                                <option :value="item.userId" v-text="item.staffName" v-for="item in staff"></option>
                                <option value="0">未分配</option>
                            </select>
                        </div>
                    </div>
                    <input v-show="false" id="orderBy" type="text" name= 'orderBy' :value="orderBy">
                    <input v-show="false" id="dir" type="text" name="dir" :value="dir">
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
            <form class="layui-form" v-show="roleName=='manager' || roleName=='supervisor'">
                <div class="layui-inline">
                    <span class="blue" @click="adjust()">批量分配</span>
                </div>
            </form>
            <form class="layui-form">
                <div class="layui-form-item" style="padding-top:10px;">
                    <div class="layui-inline">
                        <label class="layui-form-label" style="width:auto;padding-left:0px;">调整选中订单至</label>
                        <div class="layui-input-inline"  v-if="roleName == 'manager'">
                                <!--组-->
                                <select name="newGroupId" lay-verify="required" lay-filter="group1">
                                    <option value=""></option>
                                    <option v-for="item in group" :value="item.groupId" v-text="item.groupName"></option>
                                    <option value="0">未分配</option>
                                    <option value="weiwai" v-if="userInfo.deptTypeId != 0">委外</option>
                                </select>
                        </div>
                        <div class="layui-input-inline"  v-if="isStaff1">
                                <!--员工-->
                                <select name="newUserId" lay-verify="required">
                                    <option value=""></option>
                                    <option v-for="item in staff1" :value="item.userId" v-text="item.staffName"></option>
                                    <option value="0">未分配</option>
                                </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit_allot">
                            <i class="layui-icon">&#xe605;</i> 确认
                        </button>
                    </div>
                </div>
                <table class="layui-table" id="table">
                    <colgroup>
                    </colgroup>
                    <thead>
                        <th><input type="checkbox" name="" lay-skin="primary" lay-filter="allChoose"></th>
                        <th>序号</th>
                        <th v-if="roleName=='manager'">订单所在组</th>
                        <th>催收人</th>
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
                            <td><input type="checkbox" :name="index" lay-skin="primary" :value="item.collectionId"></td>
                            <td v-if="pageIndex-1==0" v-text="index+1"></td>
                            <td v-else v-text="pageSize*(pageIndex-1) + index + 1"></td>
                            <td v-text="item.groupName" v-if="roleName=='manager'">订单所在组</td>
                            <td v-text="item.dealUserName">催收人</td>
                            <td v-text="item.orderId">订单号</td>
                            <td v-text="item.createTime">订单创建时间</td>
                            <td v-text="item.borrowerName">欠款人</td>
                            <td>{{item.idNumber | ellipsisId}}</td>
                            <td v-text="item.repayAmout ? (item.repayAmout/100).toFixed(2) : '0.00'">欠款</td>
                            <td v-text="item.repayDate">应还款时间</td>
                            <td v-text="item.collectionCountDown">订单倒计时</td>
                            <td v-text="item.helpFlg">协催状态</td>
                            <td v-text="item.userFlag">复借</td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div id="pagination" style="text-align:right"></div>
            <div v-show="!list" style="text-align:center">暂无数据</div>
        </div>
        <div class="layui-layer custom_alert alert" v-show="isAlert">
                <div class="layui-layer-title">批量分配</div>
                <span class="layui-layer-setwin" @click="isAlert=false">
                    <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
                </span>
                <form class="layui-form" id="alert_form">
                    <div class="layui-form-item" style="margin-bottom:0;">
                        <label class="layui-form-label" style="padding-right:0;">未分配订单数：</label>
                         <div class="layui-input-inline">
                            <p class="layui-input" style="border:0;padding-left:0;" v-text="unallocated"></p>
                        </div>
                    </div>
                    <div class="layui-form-item" style="text-align:center;" id="aa">
                        <div class="layui-block" style="padding: 0 20px">
                            <table class="layui-table" id="table2">
                                <colgroup>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th v-show="roleName == 'manager'">组名</th>
                                        <th v-show="roleName == 'manager'">主管</th>
                                        <th v-show="roleName == 'supervisor'">人员</th>
                                        <th>库存订单数</th>
                                        <th>新配订单</th>
                                        <th>分配订单数</th>
                                    </tr> 
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in scaleData">
                                        <td v-text="index + 1"></td>
                                        <td v-show="roleName == 'manager'" v-text="item.groupName ? item.groupName : ''"></td>
                                        <td v-text="item.staffName"></td>
                                        <td v-text="item.collectionNum"></td>
                                        <td v-text="item.newAssignCount">新配订单</td>
                                        <td >
                                            <div class="layui-inline">
                                                <input type="text" :name="index" @input="formatting($event.srcElement ? $event.srcElement : $event.target)" placeholder="请输入" autocomplete="off" style="text-align:center;" class="layui-input">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-show="!scaleData" style="text-align:center">暂无数据</div>
                        </div>
                    </div>
                    <div class="layui-form-item" style="text-align:center;">
                        <div class="layui-inline">
                            <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit_number">
                                <i class="layui-icon">&#xe605;</i> 保存
                            </button>
                            <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="isAlert=false">
                                <i class="layui-icon">&#x1006;</i> 取消
                            </button>
                        </div>
                    </div>
                </form>    
        </div>
    </div>
</template>
<script>
import {verify, date, page, Common, checkbox} from 'js/layuiCommon';
import {winLayer} from 'js/common';
import request from 'js/interface/request';
export default {
    data () {
        return {
            isAlert: false, //弹窗
            roleName: '', //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
            userInfo: '',
            //0代表没有排序， 1代表正序 2代表倒叙
            thData: [
                {name: '订单号', sort: 0},
                {name: '订单创建时间', sort: 1, orderBy: 'create_time'},
                {name: '欠款人', sort: 0},
                {name: '证件号', sort: 0},
                {name: '欠款', sort: 1, orderBy: 'repay_amout'},
                {name: '还款时间', sort: 1, orderBy: 'repay_date'},
                {name: '订单倒计时', sort: 1, orderBy: 'time_limit'},
                {name: '协催', sort: 0},
                {name: '复借', sort: 0}
            ],
            first: true,
            pageSize: 10, //一页多少条
            pageIndex: 1, // 当前页码
            form_table: '', //点击查询时存储查询数据
            group: '', //组数据
            staff: '', // 员工数据
            staff1: '', // 员工数据
            isStaff: true, //当为问分配时，隐藏
            isStaff1: true, //当为问分配和委外时， 隐藏
            scaleData: '', //比例数据
            unallocated: '', //未分配订单数
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
        this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        // this.userInfo.deptTypeId = 0;
        console.log(this.userInfo)
    },
    mounted () {
         //初始化
        this.init();
    },
    methods: {
        //初始化
        init () {
            //初始化
            this.initialize();
            window.layui.use('form', () => {
                var form = window.layui.form();
                //select绑定事件
                 //催收人组点击
                form.on('select(group)', (data) => {
                    let data1 = data.value;
                    console.log(data1)
                    if (data1) {
                        if (data1 === '0') {
                            this.isStaff = false;
                        } else {
                            this.isStaff = true;
                        }
                        this.getStaff(data1, 'staff'); // 获取员工
                    } else {
                        this.staff = ''; // 当等于空的时候，清空员工
                        this.initialize(); // 初始化控件
                    }
                });
                 //催收人组点击(分配订单时)
                form.on('select(group1)', (data) => {
                    let data1 = data.value;
                    console.log(data1)
                    if (data1) {
                        if (data1 === '0' || data1 === 'weiwai') {
                            console.log('a')
                            this.isStaff1 = false;
                        } else {
                            this.isStaff1 = true;
                        }
                        this.getStaff(data1, 'staff1'); // 获取员工
                    }
                });
                form.render();
            });
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
             //调整分配人员
            verify.form('commit_allot', (data) => {
                let data1 = data.field;
                // console.log(data1)
                this.orderData(data1); //订单分配数据处理
            });
            //调整分配比例
            verify.form('commit_number', (data) => {
                let data1 = data.field;
                this.subAllot(data1);// 提交分配比例
            });
            date.date_input('start', 'end'); // 还款时间
            this.getTable(); //获取表格数据
            checkbox.checkAll('table'); //表格全选
            this.getPeople(); // 获取组或人
        },
        //表格数据
        getTable (data) {
            window.$('#table input').prop('checked', false);
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
            // console.log('更新表格')==
            this.form_table = tableDate; // 存储数据排序时用;
            // console.log(tableDate)
            request('/collection/collectionAssignList.html', tableDate, (response) => {
                // console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (output) {
                        this.list = output.collectionRecord; // 数据list
                        this.pageIndex = tableDate.pageIndex; // 成功后页码赋值
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
            this.first = true;
            this.form_table.pageIndex = 1; // 页码重置为1
            this.form_table.orderBy = item.orderBy; // 排序的名字
            console.log(this.form_table)
            this.getTable(this.form_table); //排序更新数据
        },
        //获取调整比例
        getAjust_scale () {
            winLayer.loadOn(2)
            request('/group/getGroupBatchAssignList.html', {}, (response) => {
                // console.log(response.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.unallocated = output.unallocated;
                    if (this.roleName === 'manager') {
                        if (output.groupRateRecordList.length > 0) {
                            this.scaleData = output.groupRateRecordList;
                        }
                    }
                    if (this.roleName === 'supervisor') {
                        if (output.leaderBathRecordList.length > 0) {
                            this.scaleData = output.leaderBathRecordList;
                        }
                    }
                    // console.log(this.scaleData)
                    winLayer.loadOff()
                    this.initialize(); // 初始化控件
                } else {
                    winLayer.loadOff()
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                winLayer.loadOff()
                Common.alert(e);
            })
        },
        //点击调整规则
        adjust () {
            this.scaleData = ''; //比例重置为空
            this.getAjust_scale(); //获取调整的比例
            // window.$('#alert_form')[0].reset();
            this.isAlert = true;
        },
          //输入派单数量
        formatting (that, item, name) {
            let value = window.$(that).val();
            value = value.replace(/[^\d]/g, '');
            if (value !== '' && value.length === 2) {
                value = parseInt(value)
            }
            window.$(that).val(value)
        },
        //提交分配比例数据处理
        subAllot (data) {
            let number = 0;
            let arr = Object.values(data);
            for (let i = 0; i < arr.length; i++) {
                if (!arr[i]) {
                    arr[i] = 0;
                }
                number = parseInt(arr[i]) + number;
            }
            if (parseInt(this.unallocated) === 0) {
                Common.alert('没有未分配订单');
                return false;
            }
            if (number === 0) {
                Common.alert('请填写数据或各分配数量相加不等于0');
                return false;
            }
            if (number > parseInt(this.unallocated)) {
                Common.alert('各分配数量相加不能大于未分配数量');
                return false;
            }
            let groupList = [];
            for (let k = 0; k < this.scaleData.length; k++) {
                let obj = {
                    assignCount: arr[k]
                }
                if (this.roleName === 'manager') {
                    obj.groupId = this.scaleData[k].groupId;
                } else if (this.roleName === 'supervisor') {
                    obj.userId = this.scaleData[k].userId;
                }
                if (arr[k]) {
                    groupList.push(obj);
                }
            }
            // console.log(groupList)
            this.adjustAjax(groupList); //调整比例借口
        },
        //调整比例借口
        adjustAjax (data) {
            let url = '';
            let obj = {}
            if (this.roleName === 'manager') {
                url = '/project/collectionBatchAssignGroup.html';
                obj.groupInfoRecord = data;
            } else if (this.roleName === 'supervisor') {
                url = '/project/collectionBatchAssignSupervisor.html';
                obj.staffInfoRecord = data;
            }
            console.log(obj)
            request(url, obj, (response) => {
                console.log(response.data)
                if (response.data.respCode === '000000') {
                    Common.alert(response.data.respMsg);
                    this.getTable(this.form_table); // 更新列表
                    this.isAlert = false;
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //获取组或人数据
        getPeople () {
            //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
            let url = '';
            if (this.roleName === 'manager') {
                url = '/collection/managerQuery.html';
            } else if (this.roleName === 'supervisor') {
                url = '/collection/supervisorQuery.html';
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
                    // console.log(output)
                    if (this.roleName === 'manager') {
                        this.group = output.groupUserRecord; //经理组数据
                    } else {
                        //搜索和 订单分配至人员
                        this.staff = output.userRecord; //主管催收人数据
                        this.staff1 = output.userRecord; //主管催收人数据
                    }
                    // console.log(output)
                    this.initialize(); // 初始化控件
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
         //获取员工
        getStaff (groupId, name) {
            console.log(groupId)
            for (let i = 0; i < this.group.length; i++) {
                if (parseInt(this.group[i].groupId) === parseInt(groupId)) {
                    this[name] = this.group[i].userRecord; // 赋值组数据
                    this.initialize(); // 初始化控件
                }
            }
            console.log(this.staff)
        },
        //订单分配的数据处理
        orderData (data) {
            let newGroupId = data.newGroupId ? data.newGroupId : ''; //保存
            let newUserId = data.newUserId ? data.newUserId : ''; //保存
            delete data.newGroupId; // 删除属性只要订单号
            delete data.newUserId; // 删除属性只要订单号
            let arr = Object.values(data); //只取value值
            //判断至少有一个订单号
            // console.log(arr)
            if (arr.length <= 0) {
                Common.alert('至少选择一个订单！');
                return false;
            }
            winLayer.loadOn(2) // 开始加载图标显示
            let obj = {
                newGroupId: newGroupId,
                newUserId: newUserId
            };
            let collectionIdRecord = [];
            for (let i = 0; i < arr.length; i++) {
                let obj = {
                    collectionId: arr[i]
                }
                collectionIdRecord.push(obj)
            }
            obj.collectionIdRecord = collectionIdRecord;
            // console.log(obj)
            this.order_allocation(obj); //分配订单
        },
        //订单分配提交
        order_allocation (data) {
             //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
            let url = '';
            if (this.roleName === 'manager') {
                url = '/collection/collectionAssignManager.html';
            }
            if (this.roleName === 'supervisor') {
                url = '/collection/collectionAssignSupervisor.html';
            }
            console.log(data)
            request(url, data, (response) => {
                // console.log(response.data)
                if (response.data.respCode === '000000') {
                    Common.alert(response.data.respMsg);
                    window.$('#table input[type="checkbox"]').prop('checked', false);
                    this.first = true; //更新分页
                    //更新列表后在当前页
                    this.getTable(this.form_table);
                    winLayer.loadOff() // 关闭load
                } else {
                    winLayer.loadOff() // 关闭load
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                winLayer.loadOff() // 关闭load
                Common.alert(e);
            })
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
