<template>
     <div class='container'>
         <div class="animate">
            <form class="layui-form">
                <div class="layui-form-item form">
                    <div class="layui-inline">
                        <label class="layui-form-label">座席号</label>
                        <div class="layui-input-inline">
                            <input type="text" name="id" @input="change($event.srcElement ? $event.srcElement : $event.target)" placeholder="请输入座席号" autocomplete="off" class="layui-input">
                        </div>
                    </div>   
                    <div class="layui-inline">
                        <label class="layui-form-label">姓名</label>
                        <div class="layui-input-inline">
                            <input type="text" name="staffName" placeholder="请输入姓名" autocomplete="off" class="layui-input">
                        </div>
                    </div>   
                    <div class="layui-inline">
                        <label class="layui-form-label">隶属</label>
                        <div class="layui-input-inline">
                        <select lay-filter="test" value="" name="projectId" lay-verify="">
                                <option value="">全部项目</option>
                                <option value="">全部项目</option>
                                <option :value="item.projectId" v-text="item.projectName" v-for="item in project"></option>
                            </select>
                        </div>
                        <div class="layui-input-inline">
                        <select lay-filter="test1" value="" name="departmentId" lay-verify="">
                                <option value="">全部部门</option>
                                <option value="">全部部门</option>
                                <option :value="item.departmentId" v-text="item.deptName" v-for="item in section"></option>
                            </select>
                        </div>
                        <div class="layui-input-inline">
                        <select lay-filter="" value="" name="groupId" lay-verify="">
                                <option value="">全部组</option>
                                <option value="">全部组</option>
                                <option :value="item.groupId" v-text="item.groupName" v-for="item in group"></option>
                            </select>
                        </div>
                    </div> 
                    <div class="layui-inline">
                    <!--选择框-->
                        <label class="layui-form-label">账户状态</label>
                        <div class="layui-input-inline">
                            <select name="enabled">
                                <option value="">全部</option>
                                <option value="">全部</option>
                                <option value="1">正常</option>
                                <option value="0">被禁用</option>
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">注册时间</label>
                        <div class="layui-input-inline" style="margin-right:0;">
                            <input class="layui-input" readonly  name="createStartTime" placeholder="请输入注册开始时间" id="start">
                        </div>
                        <label class="layui-form-label" style="width:auto">至</label>
                        <div class="layui-input-inline">
                            <input class="layui-input" readonly name="createEndTime" placeholder="请输入注册截止时间" id="end">
                        </div>
                    </div>  
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom"  lay-submit lay-filter="commit" style="background:#37a3ff;color:#fff;border-radius:2px;">
                            <i class="layui-icon" style="display:inline-block;transform:scale(0.9);">&#xe615;</i> 查询
                        </button>
                        <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="getTable()">
                            <i class="layui-icon">&#xe631;</i> 重置
                        </button>
                    </div>
                </div>
            </form>
            <div class="layui-btn layui-btn-small  layui-btn-normal layui-btn-custom" @click="newly_increased()">
                <i class="layui-icon" >&#43;</i> 新增
            </div>
            <table class="layui-table" id="table">
                <colgroup>
                </colgroup>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>操作</th>
                        <th>员工姓名</th>
                        <th>座席号</th>
                        <th>项目</th>
                        <th>部门</th>
                        <th>组</th>
                        <th>岗位</th>
                        <th>注册时间</th>
                        <th>最后登录时间</th>
                        <th>账户状态</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list">
                        <td v-if="pageIndex-1==0" v-text="index+1"></td>
                        <td v-else v-text="pageSize*(pageIndex-1) + index + 1"></td>
                        <td>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" v-if="item.enabled == 0" @click="iSforbidden(item, index, 1)">恢复</div>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius forbidden" v-show="item.enabled == 1" @click="iSforbidden(item, index, 2)">禁用</div>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click="reset(item)">重置密码</div>
                        </td>
                        <td>
                            <span class="name" v-text="item.staffName" @click="go_detail(item)"></span>
                        </td>
                        <td v-text="item.userName"></td>
                        <td v-text="item.projectName"></td>
                        <td v-text="item.deptName"></td>
                        <td v-text="item.groupName"></td>
                        <td v-text="item.jobPositionStr"></td>
                        <td v-text="item.createTime"></td>
                        <td v-text="item.lastLoginTime"></td>
                        <td v-show="item.enabled == 0">禁用</td>
                        <td v-show="item.enabled == 1">正常</td>
                    </tr>
                </tbody>
            </table>
            <div id="pagination" style="text-align:right"></div>
            <div v-show="!list" style="text-align:center">暂无数据</div>
        </div>    
        <div class="layui-layer custom_alert alert1" v-show="isAlert">
            <div class="layui-layer-title">新建座席号</div>
            <span class="layui-layer-setwin" @click="off()">
                <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
            </span>
            <form class="layui-form input">
                <div class="layui-form-item form">
                    <div class="layui-inline">
                        <label class="layui-form-label">工号</label>
                        <div class="layui-input-inline">
                            <input type="text" name="jobNo" @input="change($event.srcElement ? $event.srcElement : $event.target)" placeholder="请输入工号" autocomplete="off" class="layui-input">
                        </div>
                    </div>   
                    <div class="layui-inline">
                        <label class="layui-form-label">姓名</label>
                        <div class="layui-input-inline">
                            <input type="text" name="staffName"    placeholder="请输入姓名" autocomplete="off" class="layui-input">
                        </div>
                    </div>   
                    <div class="layui-inline">
                        <label class="layui-form-label">手机号</label>
                        <div class="layui-input-inline">
                            <input type="text" name="mobile" @input="change($event.srcElement ? $event.srcElement : $event.target)"   placeholder="请输入手机号" autocomplete="off" class="layui-input">
                        </div>
                    </div> 
                    <div class="layui-inline">
                        <label class="layui-form-label">注册时间</label>
                        <div class="layui-input-inline" style="margin-right: 0px;">
                            <input class="layui-input" readonly  name="createStartTime" placeholder="请输入注册开始时间" id="start1">
                        </div>
                        <label class="layui-form-label" style="width:auto">至</label>
                        <div class="layui-input-inline">
                            <input class="layui-input" readonly name="createEndTime" placeholder="请输入注册截止时间" id="end1">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit_alert" style="background:#37a3ff;color:#fff;border-radius:2px;">
                            <i class="layui-icon" style="display:inline-block;transform:scale(0.9);">&#xe615;</i> 查询
                        </button>
                        <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="getTable2()">
                            <i class="layui-icon">&#xe631;</i> 重置
                        </button>
                    </div>
                </div>
            </form>
            <form class="layui-form table">
                <div class="layui-form-item" style="text-align:center;" id="aa">
                    <div class="layui-block" style="padding: 0 20px">
                        <table class="layui-table" id="table2">
                            <colgroup>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>单选</th>
                                    <th>序号</th>
                                    <th>姓名</th>
                                    <th>账号</th>
                                    <th>工号</th>
                                    <th>邮箱</th>
                                    <th>手机号</th>
                                    <th>注册时间</th>
                                    <th>账户状态</th>
                                </tr> 
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in list2">
                                    <td><input type="checkbox":value="item.staffId" name="staffId" lay-skin="primary" lay-filter="check"></td>
                                    <td v-if="pageIndex2-1==0" v-text="index+1"></td>
                                    <td v-else v-text="pageSize2*(pageIndex2-1) + index + 1"></td>
                                    <td  v-text="item.staffName"></td>
                                    <td v-text="item.mainAccount"></td>
                                    <td v-text="item.jobNo"></td>
                                    <td v-text="item.email"></td>
                                    <td v-text="item.mobile"></td>
                                    <td v-text="item.createTime"></td>
                                    <td v-show="item.enabled == 0">禁用</td>
                                    <td v-show="item.enabled == 1">正常</td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="pagination2" style="text-align:right"></div>
                        <div v-show="!list2" style="text-align:center">暂无数据</div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline" style="padding-bottom:10px;">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit2">
                            <i class="layui-icon">&#xe605;</i> 创建
                        </button>
                        <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="off()">
                            <i class="layui-icon">&#x1006;</i> 取消
                        </button>
                    </div>
                </div>
            </form>    
        </div>
        <div class="layui-layer custom_alert project" v-show="isAlert2">
            <div class="layui-layer-title">新建</div>
            <span class="layui-layer-setwin" @click="isAlert2=false">
                <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
            </span>
            <form class="layui-form">
                   <div class="layui-form-item edit" style="text-align:center;">
                         <!--选择框-->
                        <div class="layui-inline"> 
                            <label class="layui-form-label">选择项目</label>
                            <div class="layui-input-inline">
                                <select lay-filter="section" name="projectId" lay-verify="required">
                                    <option value=""></option>
                                    <option :value="item.projectId" v-text="item.projectName" v-for="item in project"></option>
                                </select>
                            </div>
                        </div>
                        <div class="layui-inline"> 
                            <label class="layui-form-label">选择岗位</label>
                            <div class="layui-input-inline">
                                <select  lay-filter="job" name="roleName" lay-verify="required">
                                    <option value=""></option>
                                    <option v-for="item in jobData" :value="item.roleName">{{item.description}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="layui-inline" v-if="isShowSection"> 
                            <label class="layui-form-label">选择部门</label>
                            <div class="layui-input-inline">
                                <select lay-filter="group" value="" name="departmentId" lay-verify="required">
                                    <option value=""></option>
                                    <option :value="item.departmentId" v-text="item.deptName" v-for="item in sectionData"></option>
                                </select>
                            </div>
                        </div>
                        <div class="layui-inline" v-if="isShowgroup" style="padding-left:10px;"> 
                            <label class="layui-form-label">选择组</label>
                            <div class="layui-input-inline">
                                <select lay-filter="" value="" name="groupId" lay-verify="required">
                                    <option value=""></option>
                                    <option :value="item.groupId" v-text="item.groupName" v-for="item in groupData"></option>
                                </select>
                            </div>
                        </div>
                    </div>
                     <div class="layui-form-item" style="text-align:center;">
                        <div class="layui-inline">
                            <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit_work">
                                <i class="layui-icon">&#xe605;</i> 保存
                            </button>
                            <div type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="isAlert2=false">
                                  <i class="layui-icon">&#x1006;</i> 取消
                            </div>
                        </div>
                    </div>
                    
            </form>
        </div>
        <div class="layui-layer custom_alert project" v-show="isAlert3">
            <div class="layui-layer-title">提示</div>
            <span class="layui-layer-setwin" @click="isAlert3=false">
                <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
            </span>
            <form class="layui-form">
                   <div class="layui-form-item" style="text-align:center;">
                       <div class="layui-inline" v-show="isReset">
                           是否恢复工作账号？
                        </div>
                        <div class="layui-inline" v-show="!isReset">
                           禁用后账号内订单全部会被移除，是否禁用?
                        </div>
                    </div>
                     <div class="layui-form-item" style="text-align:center;">
                        <div class="layui-inline">
                            <div  class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="commit()">
                                <i class="layui-icon">&#xe605;</i> 确定
                            </div>
                            <button type="reset"  class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="isAlert3=false">
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
            first: true,
            isAlert: false, // 弹窗
            isAlert2: false, // 项目弹窗
            isAlert3: false, // 禁用窗
            isReset: false, // 是否恢复
            project: '', //项目数据
            section: '', //部门总数据
            group: '', //组数据
            //选择职位弹框数据
            sectionData: '', //部门数据
            groupData: '', // 组数据
            jobData: [],  //职位数据
            isShowSection: false, //显示部门
            isShowgroup: false, // 显示组
            //
            staffId: '', //员工工作账号id存储
            pageSize: 10, //一页多少条
            pageIndex: 1, // 当前页码
            list: '', //表格数据
            first2: true, // 弹出表格
            list2: '', //弹框表格
            pageIndex2: 1, // 弹框表格当前页码
            pageSize2: 10, // 第二个表格分页条数
            userId: '',
            index: ''
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
        //初始化
        this.init();
        this.initialize();
    },
    methods: {
        //layui初始化（form和下拉框及时间）
        layuiInit () {
            window.layui.use('form', () => {
                var form = window.layui.form();
                 //select绑定事件
                 //项目点击
                form.on('select(test)', (data) => {
                    let data1 = data.value;
                    this.group = ''; //清空组
                    this.initialize(); //初始化控件
                    //获取部门
                    if (data1) {
                        this.getSection(data1);
                    }
                });
                 //部门点击
                form.on('select(test1)', (data) => {
                    let data1 = data.value;
                    this.getGroup(data1); // 获取组数据
                });
                // ==============弹窗下拉框点击事件======================//
                  //项目点击(弹窗)
                form.on('select(section)', (data) => {
                    let data1 = data.value;
                    this.groupData = ''; //清空组
                    this.initialize(); //初始化控件
                    //获取部门
                    this.getSection(data1, 'alert');
                });
                //岗位点击（弹窗）
                form.on('select(job)', (data) => {
                    let data1 = data.value;
                    //催收总监2 经理3 主管4 员工5
                    //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
                    if (data1 === 'director') {
                        this.isShowgroup = false;
                        this.isShowSection = false;
                    } else if (data1 === 'manager') {
                        this.isShowSection = true; // 部门出现
                        this.isShowgroup = false; //人员消失
                    } else {
                        this.isShowgroup = true;
                        this.isShowSection = true;
                    }
                    this.initialize(); // 初始化
                });
                 //部门点击（弹窗）
                form.on('select(group)', (data) => {
                    let data1 = data.value;
                    this.getGroup(data1, 'alert'); // 获取组数据
                });
                //绑定复选框事件
                form.on('checkbox(check)', (data) => {
                    // console.log(data.elem); //得到checkbox原始DOM对象
                    // console.log(data.elem.checked); //是否被选中，true或者false
                    // console.log(data.value); //复选框value值，也可以通过data.elem.value得到
                    // console.log(data.othis); //得到美化后的DOM对象
                    this.checkClick(data);
                });
                //验证
                verify.form('commit_alert', (data) => {
                    let data1 = data.field;
                    if (data1.createStartTime&&data1.createEndTime) {
                        if (data1.createStartTime > data1.createEndTime) {
                            Common.alert('开始时间必须小于等于结束时间')
                            return false;
                        }
                    }
                    // 点击查询页码赋值为1；
                    data1.pageIndex = 1;
                    data1.pageSize = this.pageSize;
                    this.first2 = true;
                    console.log(data1)
                    this.getTable2(data1)
                });
                form.render();
            });
        },
        //初始化
        init () {
            //layui初始化
            this.initialize();
            this.layuiInit();
            //验证提交表格
            verify.form('commit', (data) => {
                let data1 = data.field;
                if (data1.createStartTime&&data1.createEndTime) {
                    if (data1.createStartTime > data1.createEndTime) {
                        Common.alert('开始时间必须小于等于结束时间')
                        return false;
                    }
                }
                // 点击查询页码赋值为1；
                data1.pageIndex = 1;
                data1.pageSize = this.pageSize;
                this.first = true;
                // console.log(data1)
                this.getTable(data1)
            });
             //员工弹框提交
            verify.form('commit2', (data) => {
                let data1 = data.field;
                console.log(data1.staffId)
                if (data1.staffId) {
                    this.staffId = data1.staffId;
                    this.isAlert = false; //关闭员工弹窗
                    this.isAlert2 = true; // 选择项目弹框
                    window.$('#table2 input').prop('checked', false);//清除勾选
                    this.initialize(); // //初始化 必填否则无法清除勾选
                } else {
                    Common.alert('请勾选员工');
                }
            });
            //选择项目弹框提交
            verify.form('commit_work', (data) => {
                let data1 = data.field;
                console.log(data1)
                this.addJobnumber(data1); // 添加工作账号
            });
            // //时间控件id
            date.date_input('start', 'end');
            //弹框时间
            date.date_input('start1', 'end1');
            this.getTable(); //获取表格数据
            this.getProject(); // 获取项目数据
            setTimeout(() => {
                this.getTable2(); // 获取弹框表格数据
            }, 1000)
        },
        //项目数据
        getProject () {
            request('/project/getProjectNameList.html', '', (response) => {
                if (response.data.respCode === '000000') {
                    // console.log(response.data)
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.project = output.projectList;
                    //拿dom的
                    this.initialize(); //初始化
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
         //获取部门
        getSection (id, alert) {
            var data = {
                ProjectId: id // 项目Id
            }
            console.log(data)
            request('/project/getProjectInfo.html', data, (response) => {
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    //判断是否总表单和弹框中来的数据（有代表是alert来的）
                    if (alert) {
                        this.sectionData = output.userRecord.userManagerRecordList;
                        // console.log(this.sectionData)
                    } else {
                        this.section = output.userRecord.userManagerRecordList;
                    }
                    this.jobData = output.roleRocordList; // 职位
                    console.log(this.jobData)
                    //拿dom的
                    this.initialize(); // 初始化
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                console.log(e)
                Common.alert(e);
            })
        },
        //获取组数据
        getGroup (data1, alert) {
            let obj = '';
            if (alert) {
                obj = this.sectionData
            } else {
                obj = this.section;
            }
            for (let i = 0; i < obj.length; i++) {
                if (parseInt(obj[i].departmentId) === parseInt(data1)) {
                    //判断是否总表单和弹框中来的数据（有代表是alert来的）
                    if (alert) {
                        this.groupData = obj[i].userLeaderRecordList; // 组赋值
                        console.log(this.groupData + '弹框')
                    } else {
                        this.group = obj[i].userLeaderRecordList; // 组赋值
                    }
                     //拿dom的
                    this.initialize(); // 初始化
                }
            }
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
            // console.log(tableDate)
            request('/staff/listWork.html', tableDate, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.list = output.userRecord; // 数据list
                    this.pageIndex = tableDate.pageIndex; // 页码赋值
                    //分页第一次和搜索时要更新页码
                    if (this.first) {
                        this.first = false;
                        this.addPagination(output.page, tableDate, output.totalCount);// //总页码赋值
                    }
                    this.initialize(); // 初始化
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //添加分页1
        addPagination (pages, data, totalCount) {
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
            page.table_laypage(config, data);
        },
        //表格数据2
        getTable2 (data) {
            window.$('#table2 input').prop('checked', false);
            let tableDate = {
                pageIndex: 1, // 当前页码
                pageSize: 10 //一页显示条数
            }
            let alertTable = {};
            if (data) {
                alertTable = data;
            } else {
                alertTable = tableDate;
                this.first2 = true;
            }
            console.log(alertTable)
            request('/staff/list.html', alertTable, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.pageIndex2 = alertTable.pageIndex; // 成功后弹框分页赋值
                    this.list2 = output.staffRecord; // 数据list
                    //分页第一次和搜索时要更新页码
                    if (this.first2) {
                        this.first2 = false;
                        this.addPagination2(output.page, alertTable, output.totalCount);// //总页码赋值
                    }
                    this.initialize(); //初始化
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //添加分页2
        addPagination2 (pages, data, totalCount) {
            let first = true;
            window.layui.use(['laypage', 'form'], () => {
                var laypage = window.layui.laypage;
                var form = window.layui.form();
                var $ = window.$;
                //调用分页
                laypage({
                    cont: 'pagination2',
                    pages: pages, //得到总页数 设置分页数
                    jump: (obj) => {
                        data.pageIndex = obj.curr; // 对页面的第几页赋值
                        if (first) {
                            first = false;
                        } else {
                            this.getTable2(data); // 更新表格2
                        }
                        if (totalCount) {
                            $('#pagination2 .layui-box.layui-laypage.layui-laypage-default').eq(0).append('<span style="border:0;padding:0 5px">共' + totalCount + '条</span>');
                        }
                    }
                })
            });
        },
        //是否禁用账号
        iSforbidden (item, index, number) {
            //number=== 1 恢复 ==2 禁用
            this.userId = item.userId; // 员工id
            this.index = index;
            this.isAlert3 = true;
            if (number === 1) {
                this.isReset = true;
            } else {
                this.isReset = false;
            }
        },
        //禁用恢复 提交
        commit () {
            if (this.isReset) {
                this.recover();
            } else {
                this.forbidden();
            }
        },
        //禁用账号
        forbidden () {
            let data = {
                userId: this.userId // 员工id
            }
            console.log(data)
            request('/staff/workForbidden.html', data, (response) => {
                if (response.data.respCode === '000000') {
                    Common.alert(response.data.respMsg);
                    this.list[this.index].enabled = 0; // 更新状态
                    this.isAlert3 = false;
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //恢复账号
        recover () {
            let data = {
                userId: this.userId // 员工id
            }
            console.log(data)
            request('/staff/workRecover.html', data, (response) => {
                if (response.data.respCode === '000000') {
                    Common.alert(response.data.respMsg);
                    this.list[this.index].enabled = 1; // 更新状态
                    this.isAlert3 = false;
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //重置密码
        reset (item) {
            let data = {
                userId: item.userId // 工作账号id
            }
            console.log(data)
            request('/staff/listworkResetPassword.html', data, (response) => {
                if (response.data.respCode === '000000') {
                    Common.alert(response.data.respMsg);
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //点击复选做单选效果
        checkClick (data) {
            //获取全部checkbox, 取消勾选
            window.$('#table2 input').prop('checked', false);
            data.elem.checked = true;
            // console.log(data.elem.checked
             //layui初始化 //取消时不用初始化
            this.initialize();
        },
        //添加工作账号
        addJobnumber (data) {
            data.staffId = this.staffId; // 添加员工工作id属性
            console.log(data)
            request('/staff/userAdd.html', data, (response) => {
                console.log(response.data)
                if (response.data.respCode === '000000') {
                    Common.alert(response.data.respMsg);
                    this.isAlert2 = false; //弹框消失
                    this.first = true; //变为第一次
                    this.pageIndex = 1;
                    this.getTable(); //更新表格
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //新增判断 避免重复弹框出现
        newly_increased () {
            if (!this.isAlert2) {
                this.isAlert = true;
            }
        },
        //取消
        off () {
            window.$('#table2 input').prop('checked', false);
            this.isAlert = false;
            this.isAlert2 = false;
            this.isShowgroup = false;
            this.isShowSection = false;
            this.initialize(); // 初始化
        },
        //去员工详情
        go_detail (item) {
            tab.tabAdd('员工详情', './staff/detailstaff.html?staffId=' + item.staffId);
        },
        //跳转新增页面
        add () {
            window.location.href = 'addstaff.html';
            return false;
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
    }
}
</script>
