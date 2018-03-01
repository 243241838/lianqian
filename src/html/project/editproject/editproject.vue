<template>
    <div class="container">
        <div class="animate">
            <div class="layui-collapse">
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">项目信息</h2>
                    <div class="layui-colla-content layui-show">
                        <form class="layui-form">
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">项目名：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="projectRecord.projectName" name="projectName" style="border:0;" disabled type="text" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">项目编号：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="projectRecord.projectCode" name="projectCode" style="border:0;" disabled type="text" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">项目总监：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="projectRecord.staffName" name="staffName" style="border:0;" disabled type="text" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">项目状态：</label>
                                    <div class="layui-input-inline">
                                        <select v-if="projectRecord.enabled==1" name="enabled" lay-verify="required">
                                            <option value="1">正常</option>
                                            <option value="0">被禁用</option>
                                        </select>
                                        <select v-if="projectRecord.enabled==0" name="enabled" lay-verify="required">
                                            <option value="0">被禁用</option>
                                            <option value="1">正常</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">创建时间：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="projectRecord.createTime" name="createTime" style="border:0;" disabled type="text" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">开始时间：</label>
                                    <div class="layui-input-inline">
                                        <!--<input  name="startTime" type="text" class="layui-input">-->
                                        <input v-model="projectRecord.startTime" class="layui-input" lay-verify="required" name="startTime" placeholder="请输入项目开始时间" onclick="layui.laydate({elem: this, istime: true, format: 'YYYY-MM-DD hh:mm:ss', min: laydate.now()})">
                                    </div>
                                </div>
                            </div>
                            <!--<div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">逾期天数</label>
                                    <div class="layui-input-inline">
                                        <input v-model="projectRecord.overdueDay" type="text" name="overdueDay"   lay-verify="required|number"  placeholder="请输入逾期天数" autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>-->
                            <div class="layui-form-item layui-form-text">
                                <label class="layui-form-label">公钥</label>
                                <div class="layui-input-block">
                                    <textarea style="background:#e3e3e3;" v-model="projectRecord.publicKey" readonly name="publicKey"  lay-verify="required|lettersAndNumbers"  placeholder="请输入公钥" class="layui-textarea"></textarea>
                                </div>
                            </div>
                            <div class="layui-form-item layui-form-text">
                                <label class="layui-form-label">私钥</label>
                                <div class="layui-input-block">
                                    <textarea style="background:#e3e3e3;" v-model="projectRecord.privateKey" readonly name="privateKey" lay-verify="required|lettersAndNumbers"  placeholder="请输入私钥" class="layui-textarea"></textarea>
                                </div>
                            </div>
                            <div class="layui-form-item layui-form-text">
                                <label class="layui-form-label">简介</label>
                                <div class="layui-input-block">
                                    <textarea v-model="projectRecord.projectDesc" name="projectDesc" lay-verify="" placeholder="请输入内容" class="layui-textarea"></textarea>
                                </div>
                            </div>
                            <div class="layui-form-item" style="text-align:center;">
                                <div class="layui-inline">
                                    <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit1">
                                        <i class="layui-icon">&#xe605;</i> 保存
                                    </button>
                                    <div type="reset" @click="getProjectInfo" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                        <i class="layui-icon">&#x1006;</i> 取消
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">部门类型</h2>
                    <div class="layui-colla-content layui-show">
                        <form class="layui-form">
                            <div class="layui-form-item" style="text-align:center;" v-show="isgetDepartmentType">
                                <div class="layui-inline">
                                    <div @click="showAddPart" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                        <i class="layui-icon">&#xe654;</i> 新增
                                    </div>
                                    <div @click="editPart" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                        <i class="layui-icon">&#xe642;</i> 修改
                                    </div>
                                    <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="editPart">
                                        <i class="layui-icon">&#xe605;</i> 保存
                                    </button>
                                    <div type="reset" @click="cancel" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                        <i class="layui-icon">&#x1006;</i> 取消
                                    </div>
                                </div>
                            </div>
                            <table class="layui-table">
                                <thead>
                                    <tr>
                                        <th>操作</th>
                                        <th>序号</th>
                                        <th>部门类型</th>
                                        <th>起期（天）</th>
                                        <th>终期(天)</th>
                                    </tr> 
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in departmentTypeRecordList">
                                        <td style="text-align:center;">
                                            <div v-if="departmentTypeRecordList.length==index+1" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius forbidden"  @click="deletePart(item)">删除</div>
                                        </td>
                                        <td v-text="index+1"></td>
                                        <td v-text="item.deptType"></td>
                                        <td>
                                            <input v-model="item.startDays" name="startDays" lay-verify="required|number"  style="border:0;text-align:center;" disabled type="text" class="layui-input" :class="{'part-input': index!=0}">
                                        </td>
                                        <td>
                                            <input v-model="item.endDays" name="endDays" lay-verify="required|number" style="border:0;text-align:center;" disabled type="text" class="layui-input part-input">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-show="!departmentTypeRecordList" style="text-align:center">暂无数据</div>
                        </form>
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
                            <thead>
                                <tr>
                                    <th>项目</th>
                                    <th>岗位</th>
                                    <th>员工姓名</th>
                                    <th>座席号</th>
                                    <th>注册时间</th>
                                    <th>最后登录时间</th>
                                    <th>操作</th>
                                </tr> 
                            </thead>
                            <tbody>
                                <template>
                                    <tr class="tr-1">
                                        <td class="pointer">
                                            <i v-if="userRecord.userManagerRecordList&&userRecord.userManagerRecordList.length>0" class="layui-icon">&#xe623;项目</i>
                                        </td>
                                        <td>催收总监</td>
                                        <td v-text="userRecord.staffName"></td>
                                        <td v-text="userRecord.userName"></td>
                                        <td v-text="userRecord.createTime"></td>
                                        <td v-text="userRecord.lastLoginTime"></td>
                                        <td></td>
                                    </tr>
                                    <template v-for="(manager,managerIndex) in userRecord.userManagerRecordList">
                                        <tr class="tr-2">
                                            <td class="pointer">
                                                <i class="layui-icon" v-if="manager.userLeaderRecordList&&manager.userLeaderRecordList.length>0">&#xe623;</i>
                                                {{manager.deptName + ' （' + manager.deptType + '）'}}
                                            </td>
                                            <td v-text="manager.description"></td>
                                            <td v-text="manager.staffName"></td>
                                            <td v-text="manager.userName"></td>
                                            <td v-text="manager.createTime"></td>
                                            <td v-text="manager.lastLoginTime"></td>
                                            <td>
                                                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click.stop="edit1(managerIndex)">编辑</div>
                                                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius forbidden" style="margin-left:0;" @click.stop="delete1(manager)">删除</div>
                                            </td>
                                        </tr>
                                        <template v-for="(leader,leaderIndex) in manager.userLeaderRecordList">
                                            <tr class="tr-3">
                                                <td class="pointer">
                                                    <i v-if="leader.userRecordList&&leader.userRecordList.length>0" class="layui-icon">&#xe623;</i>
                                                    {{leader.groupName}}
                                                </td>
                                                <td v-text="leader.description"></td>
                                                <td v-text="leader.staffName"></td>
                                                <td v-text="leader.userName"></td>
                                                <td v-text="leader.createTime"></td>
                                                <td v-text="leader.lastLoginTime"></td>
                                                <td>
                                                    <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click.stop="edit2(managerIndex,leaderIndex)">编辑</div>
                                                    <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius forbidden" style="margin-left:0;" @click.stop="delete2(leader, manager)">删除</div>
                                                </td>
                                            </tr>
                                            <template v-for="(record,index) in leader.userRecordList">
                                                <tr class="tr-4">
                                                    <td v-text="index+1"></td>
                                                    <td v-text="record.description"></td>
                                                    <td v-text="record.staffName"></td>
                                                    <td v-text="record.userName"></td>
                                                    <td v-text="record.createTime"></td>
                                                    <td v-text="record.lastLoginTime"></td>
                                                    <td></td>
                                                </tr>
                                            </template>
                                        </template>
                                    </template>
                                </template>
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
        </div>
        <!--新增部门类型-->
        <div class="layui-layer custom_alert" v-show="isShowAlert">
            <div class="layui-layer-title">新建</div>
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
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="addPart">
                            <i class="layui-icon">&#xe605;</i> 确定
                        </button>
                        <div type="reset" @click="isShowAlert=false;" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                            <i class="layui-icon">&#x1006;</i> 取消
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <!--新增部门-->
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
                            <select  name="deptType" lay-verify="required">
                                <option v-for="(item,index) in departmentTypeRecordList" :value="item.deptType">{{item.deptType}}</option>
                                <option value="M0">委外</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="alertCommitPart">
                            <i class="layui-icon">&#xe605;</i> 确定
                        </button>
                        <div type="reset" @click="isShowAlertPart=false;" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                            <i class="layui-icon">&#x1006;</i> 取消
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <!--新增组-->
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
                            <select v-if="userRecord.userManagerRecordList&&userRecord.userManagerRecordList.length>0" name="deptId" lay-verify="required">
                                <option v-for="(item,index) in userRecord.userManagerRecordList" :value="item.departmentId">{{item.deptName}}</option>
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
        <!--修改部门-->
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
                            <input type="text" v-model="userRecord.userManagerRecordList[editIndexPart].deptName" name="deptName" lay-verify="required" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <label class="layui-form-label">部门类型</label>
                        <div class="layui-input-inline">
                            <input type="text" v-model="userRecord.userManagerRecordList[editIndexPart].deptType" name="deptType" lay-verify="required" class="layui-input" disabled style="border:0;">
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
        <!--修改组-->
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
                            <input type="text" v-model="userRecord.userManagerRecordList[editIndexGroup].deptName" name="deptName" lay-verify="required" class="layui-input" disabled style="border:0;">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <label class="layui-form-label">组名称</label>
                        <div class="layui-input-inline">
                            <input type="text" name="groupName" v-model="userRecord.userManagerRecordList[editIndexGroup].userLeaderRecordList[editIndexGroupList].groupName" lay-verify="required" placeholder="请输入组名称" class="layui-input">
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
import {verify, date, page, Common} from 'js/layuiCommon';
import request from 'js/interface/request';
import {tree, winLayer} from 'js/common';
export default {
    data () {
        return {
            projectId: Common.getQueryString('projectId'),
            projectRecord: {},
            userRecord: {},
            departmentTypeRecordList: [],
            isgetDepartmentType: false,
            isEditPart: false,
            //
            isShowAlert: false, // 是否显示弹框
            editIndex: 0, // 编辑表格索引
            startDays: 0,
            endDays: 1,
            //
            isShowAlertPart: false,
            isShowAlertGroup: false,
            isShowAlertPart2: false,
            isShowAlertGroup2: false,
            editIndexPart: 0,
            editIndexGroup: 0,
            editIndexGroupList: 0
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
        try {
            this.getProjectInfo();
            this.getDepartType();
            this.initCollapse();
        } catch (e) {
            console.log(e)
        }
    },
    methods: {
        // 部门类型
        getDepartType () {
            if (this.projectId) {
                request('/departmentType/getDepartType.html', {projectId: this.projectId}, (response) => {
                    console.log(response)
                    if (response.data.respCode === '000000') {
                        if (response.data.data) {
                            this.departmentTypeRecordList = response.data.data.departmentTypeRecordList ? response.data.data.departmentTypeRecordList : [];
                            this.isgetDepartmentType = true;
                            //
                            this.isEditPart = false;
                            window.$('.part-input').attr('disabled', 'disabled');
                            window.$('.part-input').css('border', 'none');
                            //
                            this.reInitForm();
                        }
                    } else {
                        window.layer.msg(response.data.respMsg);
                    }
                }, (e) => {
                    console.log(e)
                })
            }
        },
        // 项目信息
        getProjectInfo () {
            if (this.projectId) {
                request('/project/getProjectInfo.html', {projectId: this.projectId}, (response) => {
                    console.log(response)
                    if (response.data.respCode === '000000') {
                        if (response.data.data) {
                            this.projectRecord = response.data.data.projectRecord;
                            this.userRecord = response.data.data.userRecord;
                            this.$nextTick(() => {
                                tree.addTreeEvent('#table');
                                this.reInitForm();
                            })
                        }
                    } else {
                        window.layer.msg(response.data.respMsg);
                    }
                }, (e) => {
                    console.log(e)
                })
            }
        },
        initCollapse () {
            window.layui.use(['element', 'laydate'], function () {
                var element = window.layui.element();
            });
            window.layui.use(['form'], () => {
                var form = window.layui.form();
                // 修改项目信息
                form.on('submit(commit1)', (data) => {
                    data.field.projectId = this.projectId;

                    request('/project/updateProjectInfo.html', data.field, (response) => {
                        console.log(response)
                        if (response.data.respCode === '000000') {
                            window.layer.msg(response.data.respMsg);
                        } else {
                            window.layer.msg(response.data.respMsg);
                        }
                    }, (e) => {
                        console.log(e)
                    })
                    console.log(data.field)
                    return false;
                });
                // 新增部门类型
                form.on('submit(addPart)', (data) => {
                    if (parseInt(data.field.startDays) >= parseInt(data.field.endDays)) {
                        window.layer.msg('终期必须大于起期');
                        return false;
                    }
                    data.field.projectId = this.projectId;
                    data.field.deptType = '';
                    if (!this.departmentTypeRecordList || this.departmentTypeRecordList.length === 0) {
                        data.field.deptType = 'M1';
                    } else {
                        data.field.deptType = this.departmentTypeRecordList[this.departmentTypeRecordList.length-1].deptType;
                        data.field.deptType = 'M' + (parseInt(data.field.deptType.split('M')[1]) + 1);
                    }
                    console.log(data.field);

                    request('/departmentType/addDepartType.html', data.field, (response) => {
                        console.log(response)
                        if (response.data.respCode === '000000') {
                            window.layer.msg(response.data.respMsg);
                            this.isShowAlert = false;
                            this.getDepartType();
                        } else {
                            window.layer.msg(response.data.respMsg);
                        }
                    }, (e) => {
                        console.log(e)
                    })
                    return false;
                })
                // 修改部门类型
                form.on('submit(editPart)', (data) => {
                    if (parseInt(data.field.startDays) >= parseInt(data.field.endDays)) {
                        window.layer.msg('终期必须大于起期');
                        return false;
                    }
                    // 没有编辑
                    if (!this.isEditPart) {
                        return false;
                    }
                    this.isEditPart = false;
                    let obj = {
                        projectId: this.projectId,
                        departmentTypeList: this.departmentTypeRecordList
                    }
                    console.log(obj)
                    request('/departmentType/updateDepartType.html', obj, (response) => {
                        console.log(response)
                        window.layer.msg(response.data.respMsg);
                        this.getDepartType();
                    }, (e) => {
                        console.log(e)
                    })
                    return false;
                });
                // （组织架构）新增部门
                form.on('submit(alertCommitPart)', (data) => {
                    for (let i = 0; i < this.departmentTypeRecordList.length; i++) {
                        if (this.departmentTypeRecordList[i].deptType === data.field.deptType) {
                            data.field.deptTypeId = this.departmentTypeRecordList[i].deptTypeId;
                        }
                    }
                    if (data.field.deptType === 'M0') {
                        data.field.deptTypeId = 0;
                    }
                    data.field.projectId = this.projectId;
                    console.log(data.field)
                    request('/department/addDepartment.html', data.field, (response) => {
                        console.log(response)
                        window.layer.msg(response.data.respMsg);
                        this.isShowAlertPart = false;
                        this.getProjectInfo();
                    }, (e) => {
                        console.log(e)
                    })
                    return false;
                })
                // （组织架构）新增组
                form.on('submit(alertCommitGroup)', (data) => {
                    data.field.projectId = this.projectId;
                    console.log(data.field)

                    request('/group/addGroup.html', data.field, (response) => {
                        console.log(response)
                        window.layer.msg(response.data.respMsg);
                        this.isShowAlertGroup = false;
                        this.getProjectInfo();
                    }, (e) => {
                        console.log(e)
                    })
                    return false;
                })
                // （组织架构）编辑部门
                form.on('submit(alertCommitPart2)', (data) => {
                    let obj = {
                        deptId: this.userRecord.userManagerRecordList[this.editIndexPart].departmentId,
                        deptName: data.field.deptName
                    }
                    console.log(obj);
                    request('/department/updateDepartment.html', obj, (response) => {
                        console.log(response)
                        window.layer.msg(response.data.respMsg);
                        this.isShowAlertPart2 = false;
                        this.getProjectInfo();
                    }, (e) => {
                        console.log(e)
                    })
                    return false;
                })
                // （组织架构）编辑组
                form.on('submit(alertCommitGroup2)', (data) => {
                    data.field.groupId = this.userRecord.userManagerRecordList[this.editIndexGroup].userLeaderRecordList[this.editIndexGroupList].groupId;
                    console.log(data.field)
                    request('/group/updateGroup.html', data.field, (response) => {
                        console.log(response)
                        window.layer.msg(response.data.respMsg);
                        this.isShowAlertGroup2 = false;
                        this.getProjectInfo();
                    }, (e) => {
                        console.log(e)
                    })
                    return false;
                })
            })
        },
        // 显示增加部门弹框
        showAddPart () {
            if (this.departmentTypeRecordList && this.departmentTypeRecordList.length !== 0) {
                let last = this.departmentTypeRecordList[this.departmentTypeRecordList.length-1];
                this.startDays = last.endDays + 1;
                this.endDays = this.startDays + 1;
            } else {
                this.startDays = 0;
                this.endDays = 1;
            }
            this.isShowAlert = true;
        },
        editPart () {
            let $ = window.$;
            $('.part-input').removeAttr('disabled');
            $('.part-input').css('border', '1px solid #e3e3e3');
            this.isEditPart = true;
        },
        // 删除部门类型
        deletePart (item) {
            console.log(item)
            winLayer.confirm('是否删除部门类型', () => {
                request('/departmentType/deleteDepartType.html', item, (response) => {
                    console.log(response)
                    if (response.data.respCode === '000000') {
                        window.layer.msg(response.data.respMsg);
                        this.getDepartType();
                    } else {
                        window.layer.msg(response.data.respMsg);
                    }
                }, (e) => {
                    console.log(e)
                })
            })
        },
        reInitForm () {
            this.$nextTick(() => {
                window.layui.use('form', () => {
                    var form = window.layui.form();
                    form.render();
                });
            })
        },
        cancel () {
            // 没有编辑
            if (!this.isEditPart) {
                return false;
            }
            this.isEditPart = false;
            this.getDepartType();
        },
        // --------------
        edit1 (index) {
            this.editIndexPart = index;
            this.isShowAlertPart2 = true;
        },
        edit2 (managerIndex, leaderIndex) {
            this.editIndexGroup = managerIndex;
            this.editIndexGroupList = leaderIndex;
            this.isShowAlertGroup2 = true;
        },
        // 删除部门（组织架构）
        delete1 (item) {
            let obj = {
                projectId: this.projectId,
                deptId: item.departmentId,
                deptType: item.deptType
            }
            console.log(obj)
            winLayer.confirm('是否删除部门', () => {
                request('/department/deleteDepartment.html', obj, (response) => {
                    console.log(response)
                    window.layer.msg(response.data.respMsg);
                    this.getProjectInfo();
                }, (e) => {
                    console.log(e)
                })
            });
        },
        // 删除组（组织架构）
        delete2 (item, manager) {
            let obj = {
                projectId: this.projectId,
                deptId: manager.departmentId,
                groupId: item.groupId
            }
            console.log(obj)
            winLayer.confirm('是否删除组', () => {
                request('/group/deleteGroup.html', obj, (response) => {
                    console.log(response)
                    window.layer.msg(response.data.respMsg);
                    this.getProjectInfo();
                }, (e) => {
                    console.log(e)
                })
            })
        },
        // -----
        showAlertPart () {
            // if (this.departmentTypeRecordList.length < 1) {
            //     window.layer.msg('请先添加部门类型');
            //     return;
            // }
            this.isShowAlertPart = true;
            this.reInitForm();
        },
        showAlertGroup () {
            // if (this.departmentTypeRecordList.length < 1) {
            //     window.layer.msg('请先添加部门类型');
            //     return;
            // }
            if (this.userRecord.userManagerRecordList.length < 1) {
                window.layer.msg('请先添加部门');
                return;
            }
            this.isShowAlertGroup = true;
            this.reInitForm();
        }
    },
    filters: {
    }
}
</script>
