<template>
    <div class="container">
        <div class="animate">
            <form class="layui-form" id="form">
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
                                <td>
                                    <div class="layui-input-inline" v-if="userRecord.userId">
                                        <select :name="userRecord.userId" >
                                            <option value="NULL">请选择</option>
                                            <option value="JH" :selected="userRecord.callType == 'JH'">金鸿</option>
                                            <option value="HYX" :selected="userRecord.callType == 'HYX'">慧营销</option>
                                        </select>
                                     </div>   
                                </td>
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
                                    <td>
                                        <div class="layui-input-inline" v-if="manager.userId">
                                            <select :name="manager.userId">
                                                <option value="0">请选择</option>
                                                <option value="JH" :selected="manager.callType == 'JH'">金鸿</option>
                                                <option value="HYX" :selected="manager.callType == 'HYX'">慧营销</option>
                                            </select>
                                        </div>   
                                    </td>
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
                                        <td>
                                            <div class="layui-input-inline" v-if="leader.userId">
                                                <select :name="leader.userId">
                                                    <option value="0">请选择</option>
                                                    <option value="JH" :selected="leader.callType == 'JH'">金鸿</option>
                                                    <option value="HYX" :selected="leader.callType == 'HYX'">慧营销</option>
                                                </select>
                                            </div>   
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
                                            <td>
                                                <div class="layui-input-inline" v-if="record.userId">
                                                    <select :name="record.userId">
                                                        <option value="0">请选择</option>
                                                        <option value="JH" :selected="record.callType == 'JH'">金鸿</option>
                                                        <option value="HYX" :selected="record.callType == 'HYX'">慧营销</option>
                                                    </select>
                                                </div>   
                                            </td>
                                        </tr>
                                    </template>
                                </template>
                            </template>
                        </template>
                    </tbody>
                </table>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit">
                            <i class="layui-icon">&#xe605;</i> 保存
                        </button>
                        <button type="reset" @click="reset()" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" >
                                <i class="layui-icon">&#x1006;</i> 重置
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
            userRecord: {}
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
             //验证
            verify.form('commit', (data) => {
                let data1 = data.field;
                let keys = Object.keys(data1);
                let values = Object.values(data1); //只取value值
                let callTypeList = [];
                for (var i = 0; i < keys.length; i++) {
                    let obj = {
                        userId: keys[i],
                        callType: values[i]
                    }
                    callTypeList.push(obj)
                }
                this.commit(callTypeList)
            });
            this.initCollapse();
            this.getProjectInfo();
        },
        //获取信息
        getProjectInfo () {
            console.log('aa' + this.projectId)
            request('/project/getProjectInfo.html', {projectId: this.projectId}, (response) => {
                // console.log(response)
                if (response.data.respCode === '000000') {
                    if (response.data.data) {
                        this.userRecord = response.data.data.userRecord;
                        this.CopyuserRecord = window.$.extend(true, [], response.data.data.userRecord);
                        console.log(this.userRecord)
                        this.$nextTick(() => {
                            tree.addTreeEvent('#table'); //树形渲染
                            this.initCollapse();
                        })
                    }
                } else {
                    window.layer.msg(response.data.respMsg);
                }
            }, (e) => {
                console.log(e)
            })
        },
        commit (callTypeList) {
            let obj = {
                callTypeList: callTypeList
            }
            console.log(obj)
            request('/staff/updateCallType.html', obj, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    window.layer.msg(response.data.respMsg);
                } else {
                    window.layer.msg(response.data.respMsg);
                }
            }, (e) => {
                console.log(e)
            })
        },
        reset () {
            this.userRecord = this.CopyuserRecord
        },
        initCollapse () {
            window.layui.use(['element', 'form'], function () {
                var element = window.layui.element();
                var form = window.layui.form();
                form.render('select'); //更新全部
            });
        }
    },
    filters: {
    }
}
</script>
