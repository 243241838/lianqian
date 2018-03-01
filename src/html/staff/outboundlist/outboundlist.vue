<template>
     <div class='container'>
         <div class="animate">
            <form class="layui-form">
                <div class="layui-form-item form">
                    <div class="layui-inline">
                        <label class="layui-form-label">座席号</label>
                        <div class="layui-input-inline">
                            <input type="text" name="extNumber" @input="change($event.srcElement ? $event.srcElement : $event.target)" placeholder="请输入座席号" autocomplete="off" class="layui-input">
                        </div>
                    </div>   
                    <div class="layui-inline">
                        <label class="layui-form-label">关联人</label>
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
                    </div> 
                    <div class="layui-inline">
                    <!--选择框-->
                        <label class="layui-form-label">账户状态</label>
                        <div class="layui-input-inline">
                            <select name="enabled">
                                <option value="">全部</option>
                                <option value="">全部</option>
                                <option value="1">正常</option>
                                <option value="0">禁用</option>
                            </select>
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
            <table class="layui-table" id="table">
                <colgroup>
                </colgroup>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>操作</th>
                        <th>外呼座席号</th>
                        <th>坐席类型</th>
                        <th>开通时间</th>
                        <th>关联人</th>
                        <th>关联项目</th>
                        <th>账户状态</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list">
                        <td v-if="pageIndex-1==0" v-text="index+1"></td>
                        <td v-else v-text="pageSize*(pageIndex-1) + index + 1"></td>
                        <td>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" v-if="item.enabled == 0" @click="iSforbidden(item, index)">恢复</div>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius forbidden" v-show="item.enabled == 1" @click="iSforbidden(item, index)">禁用</div>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click="reset(item)">重置</div>
                        </td>
                        <td v-text="item.extNumber">外呼座席号</td>
                        <td v-text="item.agentType">坐席类型</td>
                        <td v-text="item.openTime">开通时间</td>
                        <td v-text="item.staffName">关联人</td>
                        <td v-text="item.projectName">关联项目</td>
                        <td v-show="item.enabled == 0">禁用</td>
                        <td v-show="item.enabled == 1">正常</td>
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
import {tab, winLayer} from 'js/common';
export default {
    data () {
        return {
            first: true,
            project: '', //项目数据
            pageSize: 10, //一页多少条
            pageIndex: 1, // 当前页码
            form_table: '', //存储查询数据
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
        this.initialize();
    },
    methods: {
        //初始化
        init () {
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
            this.getTable(); //获取表格数据
            this.getProject(); // 获取项目数据
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
            this.form_table = tableDate;
            // console.log(tableDate)
            request('/staff/getExtensionNumberList.html', tableDate, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.list = output.extenNumberRecordList; // 数据list
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
        //是否禁用账号
        iSforbidden (item, index) {
            let text = parseInt(item.enabled) === 0 ? '是否恢复座席号？' : '是否禁用座席号？';
            winLayer.confirm(text, () => {
                let obj = {
                    numberId: item.numberId,
                    staffId: item.staffId ? item.staffId : '',
                    enabled: parseInt(item.enabled) === 0 ? 1 : 0
                }
                request('/staff/extenNumberUpdateSts.html', obj, (response) => {
                    console.log(response.data.data)
                    if (response.data.respCode === '000000') {
                        Common.alert(response.data.respMsg);
                        this.getTable(this.form_table); //更新列表
                    } else {
                        Common.alert(response.data.respMsg);
                    }
                }, (e) => {
                    console.log(e)
                })
            })
        },
        //重置密码
        reset (item, index) {
            winLayer.confirm('是否重置座席号', () => {
                let obj = {
                    staffId: item.staffId
                }
                request('/staff/extenNumberReset.html', obj, (response) => {
                    console.log(response.data.data)
                    if (response.data.respCode === '000000') {
                        Common.alert(response.data.respMsg);
                        this.getTable(this.form_table); //更新列表
                    } else {
                        Common.alert(response.data.respMsg);
                    }
                }, (e) => {
                    console.log(e)
                })
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
