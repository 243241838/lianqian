<template>
    <div class="container">
        <div class="animate">
            <div class="layui-collapse">
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">项目信息</h2>
                    <div class="layui-colla-content layui-show">
                        <form>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">项目名：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="projectRecord.projectName" style="border:0;" disabled type="text" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">项目编号：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="projectRecord.projectCode" style="border:0;" disabled type="text" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">项目总监：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="projectRecord.staffName" style="border:0;" disabled type="text" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">项目状态：</label>
                                    <div class="layui-input-inline">
                                        <input v-if="projectRecord.enabled==1" value="正常" style="border:0;" disabled type="text" class="layui-input">
                                        <input v-else value="被禁用" style="border:0;" disabled type="text" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">创建时间：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="projectRecord.createTime" style="border:0;" disabled type="text" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">开始时间：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="projectRecord.startTime" style="border:0;" disabled type="text" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">公钥：</label>
                                    <div class="layui-input-inline">
                                        <p style="padding:9px 0 0 10px;" v-text="projectRecord.publicKey"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">私钥：</label>
                                    <div class="layui-input-inline">
                                        <p style="padding:9px 0 0 10px;" v-text="projectRecord.privateKey"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item layui-form-text">
                                <label class="layui-form-label">简介：</label>
                                <div class="layui-input-block">
                                    <p style="padding:9px 0 0 10px;" v-text="projectRecord.projectDesc"></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="layui-colla-item" v-if="projectId">
                    <h2 class="layui-colla-title">部门类型</h2>
                    <div class="layui-colla-content layui-show">
                        <table class="layui-table">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>部门类型</th>
                                    <th>起期（天）</th>
                                    <th>终期(天)</th>
                                </tr> 
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in departmentTypeRecordList">
                                    <td v-text="index+1"></td>
                                    <td v-text="item.deptType"></td>
                                    <td v-text="item.startDays"></td>
                                    <td v-text="item.endDays"></td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-show="!departmentTypeRecordList" style="text-align:center">暂无数据</div>
                    </div>
                </div>
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">组织架构</h2>
                    <div class="layui-colla-content layui-show">
                        <table class="layui-table" id="table">
                            <thead>
                                <tr>
                                    <th>目录</th>
                                    <th>岗位</th>
                                    <th>员工姓名</th>
                                    <th>座席号</th>
                                    <th>注册时间</th>
                                    <th>最后登录时间</th>
                                    <th>外呼类型</th>
                                </tr> 
                            </thead>
                            <tbody>
                                <template>
                                    <tr class="tr-1">
                                        <td>
                                            <i v-if="userRecord.userManagerRecordList&&userRecord.userManagerRecordList.length>0" class="layui-icon">&#xe623;项目</i>
                                        </td>
                                        <td>催收总监</td>
                                        <td v-text="userRecord.staffName"></td>
                                        <td v-text="userRecord.userName"></td>
                                        <td v-text="userRecord.createTime"></td>
                                        <td v-text="userRecord.lastLoginTime"></td>
                                        <td v-if="userRecord.callType == 'JH'">金鸿</td>
                                        <td v-else-if="userRecord.callType == 'HYX'">慧营销</td>
                                        <td v-else></td>
                                    </tr>
                                    <template v-for="manager in userRecord.userManagerRecordList">
                                        <tr class="tr-2">
                                            <td>
                                                <i class="layui-icon" v-if="manager.userLeaderRecordList&&manager.userLeaderRecordList.length>0">&#xe623;</i>
                                                {{manager.deptName + ' （' + manager.deptType + '）'}}
                                            </td>
                                            <td v-text="manager.description"></td>
                                            <td v-text="manager.staffName"></td>
                                            <td v-text="manager.userName"></td>
                                            <td v-text="manager.createTime"></td>
                                            <td v-text="manager.lastLoginTime"></td>
                                            <td v-if="manager.callType == 'JH'">金鸿</td>
                                            <td v-else-if="manager.callType == 'HYX'">慧营销</td>
                                            <td v-else></td>
                                        </tr>
                                        <template v-for="leader in manager.userLeaderRecordList">
                                            <tr class="tr-3">
                                                <td>
                                                    <i v-if="leader.userRecordList&&leader.userRecordList.length>0" class="layui-icon">&#xe623;</i>
                                                    {{leader.groupName}}
                                                </td>
                                                <td v-text="leader.description"></td>
                                                <td v-text="leader.staffName"></td>
                                                <td v-text="leader.userName"></td>
                                                <td v-text="leader.createTime"></td>
                                                <td v-text="leader.lastLoginTime"></td>
                                                <td v-if="leader.callType == 'JH'">金鸿</td>
                                                <td v-else-if="leader.callType == 'HYX'">慧营销</td>
                                                 <td v-else></td>
                                            </tr>
                                            <template v-for="(record,index) in leader.userRecordList">
                                                <tr class="tr-4">
                                                    <td v-text="index+1"></td>
                                                    <td v-text="record.description"></td>
                                                    <td v-text="record.staffName"></td>
                                                    <td v-text="record.userName"></td>
                                                    <td v-text="record.createTime"></td>
                                                    <td v-text="record.lastLoginTime"></td>
                                                    <td v-if="record.callType == 'JH'">金鸿</td>
                                                    <td v-else-if="record.callType == 'HYX'">慧营销</td>
                                                    <td v-else></td>
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
    </div>
</template>
<script>
import {verify, date, page, Common} from 'js/layuiCommon';
import request from 'js/interface/request';
import {tree, winLayer} from 'js/common';
export default {
    data () {
        return {
            projectId: Common.getQueryString('projectId') || '',
            projectRecord: {},
            userRecord: {},
            departmentTypeRecordList: []
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
        this.initCollapse();
        this.getProjectInfo();
    },
    methods: {
        getProjectInfo () {
            console.log({projectId: this.projectId})
            request('/project/getProjectInfo.html', {projectId: this.projectId}, (response) => {
                console.log(response)
                if (response.data.respCode === '000000') {
                    if (response.data.data) {
                        this.projectRecord = response.data.data.projectRecord;
                        this.userRecord = response.data.data.userRecord;
                        this.$nextTick(() => {
                            tree.addTreeEvent('#table');
                        })
                    }
                } else {
                    window.layer.msg(response.data.respMsg);
                }
                this.getDepartType();
            }, (e) => {
                console.log(e)
            })
        },
        getDepartType () {
            // 部门类型
            if (this.projectId) {
                request('/departmentType/getDepartType.html', {projectId: this.projectId}, (response) => {
                    console.log(response)
                    if (response.data.respCode === '000000') {
                        if (response.data.data) {
                            this.departmentTypeRecordList = response.data.data.departmentTypeRecordList;
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
            window.layui.use('element', function () {
                var element = window.layui.element();
            });
        }
    },
    filters: {
    }
}
</script>
