<template>
    <div class='container'>
        <div class="animate">
            <form class="layui-form">
                <div class="layui-collapse">
                    <div class="layui-colla-item">
                        <h2 class="layui-colla-title">项目信息</h2>
                        <div class="layui-colla-content layui-show">
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">项目名</label>
                                    <div class="layui-input-inline">
                                        <input maxlength="100" type="text" name="projectName" lay-verify="required" placeholder="请输入项目名称" autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label">项目编号</label>
                                    <div class="layui-input-inline">
                                        <input maxlength="20" type="text" name="projectCode"   lay-verify="required"  placeholder="请输入项目编号" autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label">开始时间</label>
                                    <div class="layui-input-inline">
                                        <input class="layui-input" readonly lay-verify="required" name="startTime" placeholder="请输入项目开始时间" onclick="layui.laydate({elem: this, istime: true, format: 'YYYY-MM-DD hh:mm:ss', min: laydate.now()})">
                                    </div>
                                </div>
                                <!--<div class="layui-inline">
                                    <label class="layui-form-label">逾期天数</label>
                                    <div class="layui-input-inline">
                                        <input maxlength="20" type="text" name="overdueDay"   lay-verify="required|number"  placeholder="请输入逾期天数" autocomplete="off" class="layui-input">
                                    </div>
                                </div>-->
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label"></label>
                                    <div @click="createKey(0)" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                        <i class="layui-icon">&#xe64c; </i> RAS加密
                                    </div>
                                    <div @click="createKey(1)" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                        <i class="layui-icon">&#xe64c; </i> MD5加密
                                    </div>
                                </div>
                            </div>
                            <template v-if="isCreateKey">
                                <div class="layui-form-item layui-form-text">
                                    <label class="layui-form-label">公钥</label>
                                    <div class="layui-input-block">
                                        <textarea style="background:#e3e3e3;" name="publicKey" readonly v-model="publicKey" lay-verify="required|lettersAndNumbers"  placeholder="请输入公钥" class="layui-textarea"></textarea>
                                    </div>
                                </div>
                                <div class="layui-form-item layui-form-text">
                                    <label class="layui-form-label">私钥</label>
                                    <div class="layui-input-block">
                                        <textarea style="background:#e3e3e3;" name="privateKey" readonly v-model="privateKey" lay-verify="required|lettersAndNumbers"  placeholder="请输入私钥" class="layui-textarea"></textarea>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="layui-form-item layui-form-text">
                                    <label class="layui-form-label">公钥</label>
                                    <div class="layui-input-block">
                                        <textarea readonly name="publicKey" v-model="publicKey" lay-verify="required|lettersAndNumbers"  placeholder="请输入公钥" class="layui-textarea"></textarea>
                                    </div>
                                </div>
                                <div class="layui-form-item layui-form-text">
                                    <label class="layui-form-label">私钥</label>
                                    <div class="layui-input-block">
                                        <textarea readonly name="privateKey" v-model="privateKey" lay-verify="required|lettersAndNumbers"  placeholder="请输入私钥" class="layui-textarea"></textarea>
                                    </div>
                                </div>
                            </template>
                            <div class="layui-form-item layui-form-text">
                                <label class="layui-form-label">简介</label>
                                <div class="layui-input-block">
                                    <textarea maxlength="255" name="projectDesc" lay-verify="" placeholder="请输入内容" class="layui-textarea"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="layui-colla-item">
                        <h2 class="layui-colla-title">部门类型</h2>
                        <div class="layui-colla-content layui-show">
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <div @click="showAlert" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                        <i class="layui-icon">&#xe654;</i> 添加
                                    </div>
                                </div>
                            </div>
                            <table class="layui-table">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>操作</th>
                                        <th>部门类型</th>
                                        <th>起期（天）</th>
                                        <th>终期（天）</th>
                                    </tr> 
                                </thead>
                                <tbody>
                                    <template v-for="(item,i) in table">
                                        <tr>
                                            <td v-text="i+1"></td>
                                            <td>
                                                <div v-if="i==table.length-1" @click="deleteItem(item.index)" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius forbidden">删除</div>
                                                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click="edit(i)" style="margin-left:0;">编辑</div>
                                            </td>
                                            <td v-text="item.deptType"></td>
                                            <td v-text="item.startDays"></td>
                                            <td v-text="item.endDays"></td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="layui-colla-item">
                        <h2 class="layui-colla-title">组织架构</h2>
                        <div class="layui-colla-content layui-show">
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <div @click="showAlertPart" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                        <i class="layui-icon">&#xe654;</i> 新增部门
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <div @click="showAlertGroup" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                        <i class="layui-icon">&#xe654;</i> 新增组
                                    </div>
                                </div>
                            </div>
                            <table class="layui-table" id="table">
                                <colgroup>
                                    <col width="30%">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>项目</th>
                                        <th>催收总监</th>
                                        <th>操作</th>
                                    </tr> 
                                </thead>
                                <tbody>
                                    <template v-for="(item,index) in table2">
                                        <tr class="tr-1">
                                            <td style="text-align:left;">
                                                {{item.deptName + ' （' + item.deptType + '）'}}
                                                <i v-if="item.groupList && item.groupList.length>0" class="layui-icon">&#xe623;</i>
                                            </td>
                                            <td>催收经理</td>
                                            <td>
                                                <div @click="edit2(index)" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit">修改</div>
                                                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius forbidden" @click="deleteItem2(index)" style="margin-left:0;">删除</div>
                                            </td>
                                        </tr>
                                        <template v-for="(group,groupIndex) in item.groupList">
                                            <tr class="tr-2">
                                                <td style="text-align:left;padding-left:80px;">{{group.groupName}}</td>
                                                <td>催收主管</td>
                                                <td>
                                                    <div @click="edit3(index,groupIndex)" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit">修改</div>
                                                    <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius forbidden" @click="deleteItem3(index,groupIndex)" style="margin-left:0;">删除</div>
                                                </td>
                                            </tr>
                                        </template>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;margin-top:40px;">
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit">
                            <i class="layui-icon">&#xe605;</i> 确定
                        </button>
                        <button type="reset" @click="back" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                            <i class="layui-icon">&#x1006;</i> 取消
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="layui-layer custom_alert" v-show="isShowAlert">
            <div class="layui-layer-title" v-if="!isEdit">新建</div>
            <div class="layui-layer-title" v-else>编辑</div>
            <span class="layui-layer-setwin" @click="isShowAlert=false;">
                <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
            </span>
            <form class="layui-form" id="form">
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <label class="layui-form-label">起 期 时 间</label>
                        <div class="layui-input-inline" style="width:auto;">
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" style="margin-top:4px;color:#e3e3e3;">
                                <i class="layui-icon">一</i>
                            </div>
                        </div>
                        <div class="layui-input-inline">
                            <input type="text" name="startDays" disabled v-model="startDays" class="layui-input">
                        </div>
                        <div class="layui-input-inline" style="width:auto;">
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" style="margin-top:4px;color:#e3e3e3;">
                                <i class="layui-icon">&#xe654;</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <label class="layui-form-label">请选择终期</label>
                        <div class="layui-input-inline" style="width:auto;">
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" style="margin-top:4px;" @click="endDays--;if(endDays<=startDays){endDays=startDays+1;}">
                                <i class="layui-icon">一</i>
                            </div>
                        </div>
                        <div class="layui-input-inline">
                            <input type="text" name="endDays" v-model="endDays" lay-verify="required|number" class="layui-input">
                        </div>
                        <div class="layui-input-inline" style="width:auto;">
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" style="margin-top:4px;" @click="endDays++;">
                                <i class="layui-icon">&#xe654;</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="alertCommit">
                            <i class="layui-icon">&#xe605;</i> 确定
                        </button>
                        <div type="reset" @click="startDays=0;endDays=0;isShowAlert=false;" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                            <i class="layui-icon">&#x1006;</i> 取消
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="layui-layer custom_alert" v-show="isShowAlertPart">
            <div class="layui-layer-title">新建</div>
            <span class="layui-layer-setwin" @click="isShowAlertPart=false;">
                <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
            </span>
            <form class="layui-form">
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <label class="layui-form-label">部门名称</label>
                        <div class="layui-input-inline">
                            <input  type="text" name="deptName" lay-verify="required" placeholder="请输入部门名称" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <label class="layui-form-label">部门类型</label>
                        <div class="layui-input-inline">
                            <select name="deptType" lay-verify="required">
                                <option v-for="(item,index) in table" :value="item.deptType">{{item.deptType}}</option>
                                <option value="M0">委外</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <div class="layui-input-inline">
                            <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="alertCommitPart">
                                <i class="layui-icon">&#xe605;</i> 确定
                            </button>
                            <div type="reset" @click="isShowAlertPart=false;" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                <i class="layui-icon">&#x1006;</i> 取消
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="layui-layer custom_alert" v-if="isShowAlertPart2">
            <div class="layui-layer-title">编辑</div>
            <span class="layui-layer-setwin" @click="isShowAlertPart2=false;">
                <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
            </span>
            <form class="layui-form">
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <label class="layui-form-label">部门名称</label>
                        <div class="layui-input-inline">
                            <input type="text" v-model="deptName" name="deptName" lay-verify="required" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <label class="layui-form-label">部门类型</label>
                        <div class="layui-input-inline">
                            <input type="text" v-model="table2[editIndexPart].deptType" name="deptType" lay-verify="required" class="layui-input" disabled style="border:0;">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="alertCommitPart2">
                            <i class="layui-icon">&#xe605;</i> 确定
                        </button>
                        <button type="reset" @click="isShowAlertPart2=false;" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                            <i class="layui-icon">&#x1006;</i> 取消
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="layui-layer custom_alert" v-show="isShowAlertGroup">
            <div class="layui-layer-title">新建</div>
            <span class="layui-layer-setwin" @click="isShowAlertGroup=false;">
                <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
            </span>
            <form class="layui-form">
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <label class="layui-form-label">所属部门</label>
                        <div class="layui-input-inline">
                            <select v-if="table2.length>0" name="deptName" lay-verify="required">
                                <option v-for="(item,index) in table2" :value="index">{{item.deptName}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <label class="layui-form-label">组名称</label>
                        <div class="layui-input-inline">
                            <input type="text" name="groupName" lay-verify="required" placeholder="请输入组名称" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="alertCommitGroup">
                            <i class="layui-icon">&#xe605;</i> 确定
                        </button>
                        <div type="reset" @click="isShowAlertGroup=false;" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                            <i class="layui-icon">&#x1006;</i> 取消
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="layui-layer custom_alert" v-if="isShowAlertGroup2">
            <div class="layui-layer-title">编辑</div>
            <span class="layui-layer-setwin" @click="isShowAlertGroup2=false;">
                <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
            </span>
            <form class="layui-form">
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <label class="layui-form-label">所属部门</label>
                        <div class="layui-input-inline">
                            <input type="text" v-model="table2[editIndexGroup].deptName" name="deptName" lay-verify="required" class="layui-input" disabled style="border:0;">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <label class="layui-form-label">组名称</label>
                        <div class="layui-input-inline">
                            <input type="text" name="groupName" v-model="groupName" lay-verify="required" placeholder="请输入组名称" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="alertCommitGroup2">
                            <i class="layui-icon">&#xe605;</i> 确定
                        </button>
                        <button type="reset" @click="isShowAlertGroup2=false;" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                            <i class="layui-icon">&#x1006;</i> 取消
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import {verify, date, page} from 'js/layuiCommon';
import request from 'js/interface/request';
import {tree, tab} from 'js/common';
export default {
    data () {
        return {
            privateKey: '',
            publicKey: '',
            isCreateKey: false,
            //
            isCommit: false, // 是否已经提交过
            //
            table: [], // 表数据内容
            index: 1, // 序号
            startDays: 0,
            endDays: 1,
            isShowAlert: false, // 是否显示弹框
            isEdit: false, // 是否是编辑(新增)
            editIndex: 0, // 编辑表格索引
            //
            isShowAlertPart: false, // 新增部门
            isShowAlertPart2: false, // 编辑部门
            editIndexPart: 0,
            deptName: '',
            //
            isShowAlertGroup: false, // 新增组
            isShowAlertGroup2: false, // 编辑组
            editIndexGroup: 0,
            editIndexGroupList: 0,
            groupName: '',
            //
            table2: []
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {
             //layui初始化
            window.layui.use('element', function () {
                var element = window.layui.element();
            });
            window.layui.use(['form'], () => {
                var form = window.layui.form();
                form.on('submit(alertCommit)', (data) => {
                    if (data.field.endDays === '0') {
                        window.layer.msg('终期时间不能为0');
                        return false;
                    }
                    if (parseInt(data.field.startDays) >= parseInt(data.field.endDays)) {
                        window.layer.msg('终期时间需大于起期时间');
                        return false;
                    }
                    this.save(data);
                    return false;
                });
                form.on('submit(alertCommitPart)', (data) => {
                    console.log('table2', this.table2)
                    if (data.field.deptType === 'M0') {
                        data.field.deptType = '委外'
                    }
                    this.table2.push(data.field);
                    this.isShowAlertPart = false;
                    this.$nextTick(() => {
                        tree.addTreeEvent('#table');
                    })
                    console.log('table2', this.table2)
                    return false;
                })
                form.on('submit(alertCommitPart2)', (data) => {
                    this.isShowAlertPart2 = false;
                    console.log(this.table2)
                    if (this.table2[this.editIndexPart].groupList) {
                        data.field.groupList = this.table2[this.editIndexPart].groupList;
                    }
                    this.table2[this.editIndexPart] = data.field;
                    console.log(this.table2);
                    return false;
                })
                form.on('submit(alertCommitGroup)', (data) => {
                    var index = data.field.deptName;
                    if (!(this.table2[index].groupList instanceof Array)) {
                        this.$set(this.table2[index], 'groupList', []);
                    }
                    this.table2[index].groupList.push({groupName: data.field.groupName})
                    this.isShowAlertGroup = false;
                    this.$nextTick(() => {
                        tree.addTreeEvent('#table');
                    })
                    console.log('table2', this.table2)
                    return false;
                })
                form.on('submit(alertCommitGroup2)', (data) => {
                    this.isShowAlertGroup2 = false;
                    this.table2[this.editIndexGroup].groupList[this.editIndexGroupList].groupName = data.field.groupName;
                    console.log('table2', this.table2);
                    return false;
                })
                form.on('submit(commit)', (data) => {
                    data.field.projectCode = data.field.projectCode.trim();
                    data.field.DepartmentTypeList = this.table;
                    let table2 = this.catchList = window.$.extend(true, [], this.table2);
                    table2.map((item) => {
                        if (item.deptType === '委外') {
                            item.deptType = 'M0';
                        }
                    })
                    data.field.departmentList = table2;
                    console.log(data.field)
                    request('/project/addProject.html', data.field, (response) => {
                        console.log(response)
                        if (response.data.respCode === '000000') {
                            window.layer.msg(response.data.respMsg);
                            setTimeout(() => {
                                window.location.href = './projectlist.html';
                            }, 1000)
                        } else {
                            window.layer.msg(response.data.respMsg);
                        }
                    }, (e) => {
                        console.log(e)
                    })
                    return false;
                })
                form.render();
            })
            window.layui.use('laydate', () => {
            })
        },
        // 保存
        save (data) {
            // 编辑
            if (this.isEdit) {
                var temp = this.editIndex;
                var startDays = parseInt(data.field.startDays);
                var endDays = parseInt(data.field.endDays);
                for (var i = temp; i < this.table.length; i++) {
                    let obj = {
                        deptType: 'M' + parseInt(i+1),
                        startDays: startDays,
                        endDays: endDays
                    }
                    this.table[i] = obj;
                    startDays = endDays + 1;
                    endDays = startDays + 1;
                }
                this.isShowAlert = false;
            } else {
            // 新增
                let obj = {
                    deptType: 'M' + this.index,
                    startDays: data.field.startDays,
                    endDays: data.field.endDays
                }
                this.table.push(obj);
                this.index++;
                this.isShowAlert = false;
            }
            console.log('save', this.table)
        },
        // 编辑
        edit (index) {
            this.startDays = parseInt(this.table[index].startDays);
            this.endDays = parseInt(this.table[index].endDays);
            this.editIndex = index;
            this.isEdit = true;
            this.isShowAlert = true;
        },
        // 删除
        deleteItem (index) {
            this.table.pop();
            this.index--;
            if (this.table.length === 0) {
                this.startDays = 0;
                this.endDays = 1;
            }
            this.table2 = [];
            console.log('deleteItem', this.table);
        },
        // 弹出框
        showAlert () {
            this.isEdit = false;
            this.isShowAlert = true;
            if (this.table.length < 1) {
                return;
            }
            this.startDays = parseInt(this.table[this.table.length-1].endDays) + 1;
            this.endDays = this.startDays + 1;
        },
        showAlertPart () {
            // if (this.table.length < 1) {
            //     window.layer.msg('请先添加部门类型');
            //     return;
            // }
            this.isShowAlertPart = true;
            this.reInitForm();
        },
        showAlertGroup () {
            // if (this.table.length < 1) {
            //     window.layer.msg('请先添加部门类型');
            //     return;
            // }
            if (this.table2.length < 1) {
                window.layer.msg('请先添加部门');
                return;
            }
            this.isShowAlertGroup = true;
            this.reInitForm();
        },
        reInitForm () {
            this.$nextTick(() => {
                window.layui.use('form', () => {
                    var form = window.layui.form();
                    form.render();
                });
            })
        },
        edit2 (index) {
            this.editIndexPart = index;
            this.isShowAlertPart2 = true;
            this.deptName = this.table2[this.editIndexPart].deptName;
            console.log('edit2')
        },
        deleteItem2 (index) {
            this.table2.splice(index, 1);
            console.log('deleteItem2', this.table2)
        },
        edit3 (index, groupIndex) {
            this.editIndexGroup = index;
            this.editIndexGroupList = groupIndex;
            this.isShowAlertGroup2 = true;
            this.groupName = this.table2[index].groupList[groupIndex].groupName;
            console.log('edit3')
        },
        deleteItem3 (index, groupIndex) {
            this.table2[index].groupList.splice(groupIndex, 1);
            this.reInitForm();
            console.log('deleteItem3', this.table2)
        },
        back () {
            // tab.tabDelete();
            tab.tabDelete('/project/addproject.html');
            return false;
        },
        createKey (keyType) {
            this.isCreateKey = true;
            request('/project/createKey.html', {keyType: keyType}, (response) => {
                if (response.data.respCode === '000000') {
                    console.log(response)
                    this.privateKey = response.data.data.privateKey;
                    this.publicKey = response.data.data.publicKey;
                } else {
                    window.layer.msg(response.data.respMsg);
                }
            }, (e) => {
                console.log(e)
            })
        }
    },
    filters: {
    }
}
</script>
