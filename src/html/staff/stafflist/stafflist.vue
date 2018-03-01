<template>
     <div class='container'>
         <div class="animate">
            <form class="layui-form">
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
                            <input class="layui-input" readonly  name="createStartTime" placeholder="请输入注册开始时间" id="start">
                        </div>
                        <label class="layui-form-label" style="width:auto">至</label>
                        <div class="layui-input-inline">
                            <input class="layui-input" readonly name="createEndTime" placeholder="请输入注册截止时间" id="end">
                        </div>
                    </div>
                    <!--
                    <div class="layui-inline">
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
                    -->  
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit" style="background:#37a3ff;color:#fff;border-radius:2px;">
                            <i class="layui-icon" style="display:inline-block;transform:scale(0.9);">&#xe615;</i> 查询
                        </button>
                        <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="getTable()">
                            <i class="layui-icon">&#xe631;</i> 重置
                        </button>
                    </div>
                </div>
            </form>
            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="add()">
                <i class="layui-icon" >&#43;</i> 新增
            </div>
            <table class="layui-table" id="table">
                <colgroup>
                </colgroup>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>操作</th>
                        <th>姓名</th>
                        <th>账号</th>
                        <th>工号</th>
                        <th>邮箱</th>
                        <th>手机号</th>
                        <th>注册时间</th>
                        <!--<th>账户状态</th>-->
                        <th>外呼座席号</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr class="tr-1" v-for="(item,index) in list">
                        <td v-if="pageIndex-1==0" v-text="index+1"></td>
                        <td v-else v-text="pageSize*(pageIndex-1) + index + 1"></td>
                        <td>
                            <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click="edit(item.staffId)">编辑</div>
                        </td>
                        <td>
                            <span class="name" v-text="item.staffName" @click="go_detail(item.staffId)"></span>
                        </td>
                        <td v-text="item.mainAccount"></td>
                        <td v-text="item.jobNo"></td>
                        <td v-text="item.email"></td>
                        <td v-text="item.mobile"></td>
                        <td v-text="item.createTime"></td>
                        <!--
                        <td v-show="item.enabled == 0">禁用</td>
                        <td v-show="item.enabled == 1">正常</td>
                        -->
                        <td v-text="item.extNumber"></td>
                    </tr>
                </tbody>
            </table>
            <div id="pagination" class="padd20" style="text-align:right"></div>
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
            first: true,
            pageSize: 10, //一页多少条
            pageIndex: 1, // 当前页码
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
    },
    methods: {
        //初始化
        init () {
            //layui初始化
            this.initialize();
            //验证
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
                console.log(data1)
                this.getTable(data1)
            });
            // window.layui.use('form', () => {
            //     var form = window.layui.form();
            //     form.on('select(group)', (data) => {
            //         console.log(data)
            //     });
            //     form.render();
            // });
            //时间控件id
            date.date_input('start', 'end');
            this.getTable(); //获取表格数据
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
                this.pageSize = 10;
                this.first = true;
            }
            console.log(tableDate)
            request('/staff/list.html', tableDate, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.list = output.staffRecord; // 数据list
                    this.pageIndex = tableDate.pageIndex; // 赋值页码
                    //分页第一次和搜索时要更新页码
                    if (this.first) {
                        this.first = false;
                        this.addPagination(output.page, tableDate, output.totalCount);// //总页码赋值
                    }
                    //layui初始化
                    this.initialize();
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
        // 编辑跳转编辑页面
        edit (staffId) {
            tab.tabAdd('员工编辑', './staff/editstaff.html?staffId=' + staffId);
        },
        //去员工详情
        go_detail (staffId) {
            tab.tabAdd('员工详情', './staff/detailstaff.html?staffId=' + staffId);
        },
        //去空格
        change (that) {
            that.value = that.value.trim();
        },
        //跳转新增页面
        add () {
            tab.tabAdd('新增员工', './staff/addstaff.html');
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
