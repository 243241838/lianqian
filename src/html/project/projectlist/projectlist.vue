<template>
    <div class='container layui-show'>
        <div class="animate">
            <!--搜索-->
            <form class="layui-form">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">项目编号</label>
                        <div class="layui-input-inline">
                            <input type="text" name="projectCode"   placeholder="请输入项目编号" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">项目名</label>
                        <div class="layui-input-inline">
                            <input type="text" name="projectName"  placeholder="请输入项目名称" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline" style="margin-right:0;">
                        <label class="layui-form-label">开始时间</label>
                        <div class="layui-input-inline" style="margin-right:0;">
                            <input name="startTimeSts" class="layui-input" placeholder="请输入项目开始时间" onclick="layui.laydate({elem: this})">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label" style="width:auto;">至</label>
                        <div class="layui-input-inline">
                            <input name="endTimeSts" class="layui-input" placeholder="请输入项目结束时间" onclick="layui.laydate({elem: this})">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">项目状态</label>
                        <div class="layui-input-inline">
                            <select name="enabled">
                                <option value="all">全部</option>
                                <option value="1">正常</option>
                                <option value="0">被禁用</option>
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <button style="background:#37a3ff;color:#fff;border-radius:2px;" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="search">
                            <i class="layui-icon" style="display:inline-block;transform:scale(0.9);">&#xe615;</i> 保存
                        </button>
                        <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="initData('reset')">
                            <i class="layui-icon">&#xe631;</i> 重置
                        </button>
                    </div>
                </div>
            </form>
            <!--表格-->
            <form class="layui-form">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <div @click="addProject" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                            <i class="layui-icon">&#xe654;</i> 添加
                        </div>
                    </div>
                </div>
            </form>
            <table class="layui-table" style="width:auto;">
                <colgroup>
                    <col width="200">
                    <col width="400">
                    <col width="400">
                    <col width="400">
                    <col width="400">
                    <col width="400">
                    <col width="400">
                    <col width="400">
                </colgroup>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>操作项</th>
                        <th>项目编号</th>
                        <th>项目名</th>
                        <th>项目总监</th>
                        <th>开始时间</th>
                        <th>简介</th>
                        <th>项目状态</th>
                    </tr> 
                </thead>
                <tbody>
                    <template v-for="(item,index) in data.projectList">
                        <tr>
                            <td v-text="(index+1)+((page-1)*size)"></td>
                            <td>
                                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click.stop="edit(item)">编辑</div>
                                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" v-show="item.enabled==0" style="margin-left:0;" @click.stop="updateProjectSts(item, 1)">恢复</div>
                                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius forbidden"  v-show="item.enabled==1" style="margin-left:0;" @click.stop="updateProjectSts(item, 0)">禁用</div>
                            </td>
                            <td v-text="item.projectCode"></td>
                            <td>
                                <span class="name" v-text="item.projectName" @click="gotoDetail(item)"></span>
                            </td>
                            <td v-text="item.staffName"></td>
                            <td v-text="item.startTime"></td>
                            <td v-if="item.projectDesc.length>10">{{item.projectDesc.substring(0, 10)}}...</td>
                            <td v-else v-text="item.projectDesc"></td>
                            <td v-if="item.enabled==1">正常</td>
                            <td v-else-if="item.enabled==0">被禁用</td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div v-show="!data.projectList" style="text-align:center">暂无数据</div>
            <div id="pagination" class="padd20" style="text-align:right"></div>
        </div>
    </div>
</template>
<script>
import {verify, date, page} from 'js/layuiCommon';
import request from 'js/interface/request';
import {tree, tab, winLayer} from 'js/common';
export default {
    data () {
        return {
            table: [],
            index: 1,
            startTime: 0,
            endTime: 0,
            isShow: false,
            isEdit: false,
            editIndex: 0,
            // 分页
            size: 10, // 每一页数量
            page: 1, // 当前页数
            data: {},
            // 点击分页不更新
            isPaginationInit: true
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
        this.init();
        this.use();
    },
    methods: {
        use () {
            this.$nextTick(() => {
                window.layui.use('form', () => {
                    var form = window.layui.form();
                    form.render();
                });
            })
        },
        init () {
            window.layui.use(['element', 'laydate'], function () {
                var element = window.layui.element();
            });
            this.initData();
            verify.form('search', (data) => {
                if (data.field.endTimeSts && data.field.startTimeSts) {
                    if (data.field.endTimeSts < data.field.startTimeSts) {
                        window.layer.msg('开始时间必须小于等于结束时间')
                        return;
                    }
                }
                if (data.field.enabled === 'all') {
                    data.field.enabled = '';
                }
                // 初始化请求参数
                data.field.size = this.size;
                data.field.page = 1;
                this.isPaginationInit = true;
                this.getData(data.field)
            });
        },
        initData (reset) {
            let obj = {
                enabled: '',
                endTimeSts: '',
                page: 1,
                projectCode: '',
                projectName: '',
                size: 10,
                startTimeSts: ''
            }
            if (reset) {
                this.size = 10;
                this.isPaginationInit = true;
            }
            this.getData(obj);
        },
        getData (obj, reset) {
            console.log(reset)
            if (obj) {
                // this.page = obj.page;
            }
            console.log(obj);
            request('/project/getProjectList.html', obj, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    if (response.data.data) {
                        try {
                            this.data = response.data.data;
                            this.page = obj.page;
                            if (this.isPaginationInit) {
                                this.isPaginationInit = false;
                                this.addPagination(this.data.pageCount, this.data.total, obj);
                            }
                            if (!this.data.projectList) {
                                window.layer.msg(response.data.respMsg)
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }
                } else {
                    window.layer.msg(response.data.respMsg);
                }
            }, (e) => {
                console.log(e)
            })
        },
        //添加分页
        addPagination (pages, totalCount, obj) {
            let config = {
                that: this,
                pagination: 'pagination',
                pages: pages, // 总页数
                totalCount: totalCount, //总条数
                pageIndexName: 'page',
                pageSizeName: 'size',
                firstName: 'isPaginationInit',
                requestMethod: 'getData'
            }
            page.table_laypage(config, obj);
        },
        gotoDetail (item) {
            tab.tabAdd(item.projectName, './project/projectinfo.html?projectId=' + item.projectId);
        },
        // 禁用、恢复
        updateProjectSts (item, sts) {
            let obj = {
                projectId: item.projectId,
                enabled: sts
            }
            let data = sts === 1 ? '是否恢复' : '是否禁用';
            winLayer.confirm(data, () => {
                request('/project/updateProjectSts.html', obj, (response) => {
                    console.log(response)
                    if (response.data.respCode === '000000') {
                        window.layer.msg(response.data.respMsg);
                        item.enabled = sts;
                    } else {
                        window.layer.msg(response.data.respMsg);
                    }
                }, (e) => {
                    console.log(e)
                })
            });
        },
        edit (item) {
            tab.tabAdd(item.projectCode, './project/editproject.html?projectId=' + item.projectId);
        },
        addProject () {
            tab.tabAdd('新建项目', './project/addproject.html');
        }
    },
    filters: {
    }
}
</script>
