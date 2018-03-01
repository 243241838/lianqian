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
                                    <input type="text" name="email" lay-verify="required|email" :value="output.email" placeholder="请输入邮箱" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-form-item edit">
                                <label class="layui-form-label">手机号:</label>
                                <div class="layui-input-inline">
                                    <input type="text" name="mobile" lay-verify="required|phone"  :value="output.mobile" placeholder="请输入手机号" class="layui-input">
                                </div>
                            </div>
                            <!--
                            <div class="layui-form-item edit">
                                <label class="layui-form-label">账号状态</label>
                                <div class="layui-input-inline">
                                    <select v-model="output.enabled" name="enabled" lay-verify="required">
                                        <option value="0">禁用</option>
                                        <option value="1">正常</option>
                                    </select>
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
                            <div class="layui-form-item" style="margin-left:170px;">
                                <div class="layui-inline">
                                    <button  class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit"> 
                                        <i class="layui-icon">&#xe605;</i> 保存
                                    </button>
                                    <div type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="recoverData()">
                                        <i class="layui-icon">&#xe624;</i> 恢复
                                    </div>
                                </div>
                            </div>
                        </form> 
                    </div>
                </div>
                <!--表格-->
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">座席号</h2>
                    <div class="layui-colla-content layui-show">
                        <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="isAlert=true">
                                <i class="layui-icon" >&#43;</i> 新增
                            </div>
                            <table class="layui-table" id="table">
                                <colgroup>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>操作</th>
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
                                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom forbidden radius edit" v-if="item.enabled == 1" @click="iSforbidden(item, index, 2)">禁用</div>
                                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit"  v-if="item.enabled == 0" @click="iSforbidden(item, index, 1)" >恢复</div>
                                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click="reset(item)">重置密码</div>
                                        </td>
                                        <td>
                                            <span class="edit" v-text="item.userName"></span>
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
         <div class="layui-layer custom_alert project" v-show="isAlert">
            <div class="layui-layer-title">新建</div>
            <span class="layui-layer-setwin" @click="isAlert=false">
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
                        <div class="layui-inline" v-show="isShowSection"> 
                            <label class="layui-form-label">选择部门</label>
                            <div class="layui-input-inline">
                                <select lay-filter="group" value="" name="departmentId" lay-verify="">
                                    <option value=""></option>
                                    <option :value="item.departmentId" v-text="item.deptName" v-for="item in sectionData"></option>
                                </select>
                            </div>
                        </div>
                        <div class="layui-inline" v-show="isShowgroup" style="padding-left:10px;"> 
                            <label class="layui-form-label">选择组</label>
                            <div class="layui-input-inline">
                                <select lay-filter="" value="" name="groupId" lay-verify="">
                                    <option value=""></option>
                                    <option :value="item.groupId" v-text="item.groupName" v-for="item in groupData"></option>
                                </select>
                            </div>
                        </div>
                    </div>
                     <div class="layui-form-item" style="text-align:center;">
                        <div class="layui-inline">
                            <button  class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit_work">
                                <i class="layui-icon">&#xe605;</i> 确定
                            </button>
                            <button type="reset"  class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="isAlert=false">
                                <i class="layui-icon">&#x1006;</i> 取消
                            </button>
                        </div>
                    </div>
                    
            </form>
        </div>
        <div class="layui-layer custom_alert project" v-show="isAlert2">
            <div class="layui-layer-title">提示</div>
            <span class="layui-layer-setwin" @click="isAlert2=false">
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
                            <button type="reset"  class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="isAlert2=false">
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
export default {
    data () {
        return {
            isAlert: false, // 弹框
            isAlert2: false, // 禁用恢复弹窗
            isReset: false, // 是否恢复
            output: '', //获取的详情
            //选择职位弹框数据
            project: '', // 获取项目
            sectionData: '', //部门数据
            groupData: '', // 组数据
            jobData: [],  //职位数据
            isShowSection: false, //显示部门
            isShowgroup: false, // 显示组
            staffId: '', //员工iD
            userId: '',
            index: ''
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
        //获取员工Id
        this.staffId = Common.getQueryString('staffId');
        this.init();
    },
    methods: {
        //初始化
        layui_use () {
            window.layui.use('form', () => {
                var form = window.layui.form();
                // ==============弹窗下拉框点击事件======================//
                //项目点击(弹窗)
                form.on('select(section)', (data) => {
                    let data1 = data.value;
                    this.groupData = '';  //清空组数据；
                    this.initialize(); // 初始化控件
                    this.getSection(data1); //获取部门
                });
                //岗位点击（弹窗）
                form.on('select(job)', (data) => {
                    let data1 = data.value;
                    //催收总监2 经理3 主管4 员工5
                    //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
                    console.log(data1)
                    if (data1 === 'director') {
                        this.isShowgroup = false;
                        this.isShowSection = false;
                    } else if (data1 === 'manager') {
                        this.isShowSection = true;
                    } else {
                        this.isShowgroup = true;
                        this.isShowSection = true;
                    }
                });
                //部门点击（弹窗）
                form.on('select(group)', (data) => {
                    let data1 = data.value;
                    this.getGroup(data1); // 获取组数据
                });
                form.render();
            });
        },
        init () {
            //layui初始化
            this.initialize();
            //初始化
            this.layui_use();
            //折叠
            window.layui.use('element', function () {
                var element = window.layui.element();
            });
            //编辑信息提交
            verify.form('commit', (data) => {
                let data1 = data.field;
                this.sub(data1)
            });
            //添加工作账号提交
            verify.form('commit_work', (data) => {
                let data1 = data.field;
                console.log(data1)
                this.addJobnumber(data1); // 添加工作账号
            });
            this.initGetdata(); // 初始化获取数据
            this.getProject(); //获取项目数据
        },
        //初始化获取详情
        initGetdata () {
            var data = {
                staffId: this.staffId // 员工Id
            }
            request('/staff/listStaffDetail.html', data, (response) => {
                if (response.data.respCode === '000000') {
                    console.log(response.data)
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.output = output;
                    //拿dom的(select必须next和更新初始化)
                    this.initialize();
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //提交修改编辑的信息
        sub (data) {
            data.staffId = this.staffId; // 员工id
            data.staffName = this.output.staffName; // 员工姓名
            console.log(data)
            request('/staff/listStaffUpdate.html', data, (response) => {
                if (response.data.respCode === '000000') {
                    Common.alert(response.data.respMsg);
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
       //项目数据
        getProject () {
            request('/project/getProjectNameList.html', '', (response) => {
                if (response.data.respCode === '000000') {
                    console.log(response.data)
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.project = response.data.data.projectList;
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
        getSection (id) {
            var data = {
                ProjectId: id // 项目Id
            }
            console.log(data)
            request('/project/getProjectInfo.html', data, (response) => {
                console.log(response.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.sectionData = output.userRecord.userManagerRecordList; // 部门数据
                    this.jobData = output.roleRocordList; // 职位
                    console.log(this.jobData)
                    //拿dom的
                    this.initialize(); //初始化
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                console.log(e)
                Common.alert(e);
            })
        },
        //获取组数据
        getGroup (data1) {
            let obj = this.sectionData;
            for (let i = 0; i < obj.length; i++) {
                if (parseInt(obj[i].departmentId) === parseInt(data1)) {
                    this.groupData = obj[i].userLeaderRecordList; // 组赋值
                     //拿dom的
                    this.initialize(); //初始化
                }
            }
        },
        //添加工作账号
        addJobnumber (data) {
            data.staffId = this.staffId; //添加工作账号属性
            // console.log(data)
            request('/staff/userAdd.html', data, (response) => {
                console.log(response.data)
                if (response.data.respCode === '000000') {
                    Common.alert(response.data.respMsg);
                    this.isAlert = false; //弹框消失
                    this.initGetdata(); // 重新更新详情
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
        //是否禁用账号
        iSforbidden (item, index, number) {
            this.userId = item.userId; // 员工id
            this.index = index;
            this.isAlert2 = true;
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
                    // item.enabled = 0; // 更新状态
                    this.output.staffUserRecord[this.index].enabled = 0; //更新状态
                    this.isAlert2 = false; // 弹框隐藏;
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
                    this.output.staffUserRecord[this.index].enabled = 1; //更新状态
                    this.isAlert2 = false; // 弹框隐藏;
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
        //layui初始化控件（要多次初始化）
        initialize () {
            this.$nextTick(() => {
                window.layui.use('form', () => {
                    var form = window.layui.form();
                    form.render();
                })
            })
        },
        //恢复 重新跳去详情
        recoverData () {
            this.init();
        }
    },
    filters: {
    }
}
</script>
