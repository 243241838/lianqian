<template>
     <div class='container'>
         <div class="animate">
            <form class="layui-form">
                <div class="layui-form-item form">
                    <div class="layui-inline">
                        <label class="layui-form-label">姓名</label>
                        <div class="layui-input-inline">
                            <input type="text" name="borrowerName"    placeholder="请输入姓名" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">手机号</label>
                        <div class="layui-input-inline">
                            <input type="text" name="borrowerMobile" @input="change($event.srcElement ? $event.srcElement : $event.target)"   placeholder="请输入手机号" autocomplete="off" class="layui-input">
                        </div>
                    </div> 
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit" style="background:#37a3ff;color:#fff;border-radius:2px;">
                            <i class="layui-icon" style="display:inline-block;transform:scale(0.9);">&#xe615;</i> 查询
                        </button>
                        <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
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
                        <th>订单号</th>
                        <th>订单状态</th>
                        <th>欠款人</th>
                        <th>手机号</th>
                        <th>证件号</th>
                        <th>欠款金额</th>
                        <th>应还款时间</th>
                        <th>所在部</th>
                        <th>所在组</th>
                        <th>催收人</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr class="tr-1" v-for="(item,index) in list">
                        <td v-if="pageIndex-1==0" v-text="index+1"></td>
                        <td v-else v-text="pageSize*(pageIndex-1) + index + 1"></td>
                        <td v-text="item.orderId">订单号</td>
                        <td v-text="item.collectionSts">订单状态</td>
                        <td v-text="item.borrowerName">欠款人</td>
                        <td v-text="item.borrowerMobile">手机号</td>
                        <td >{{item.idNumber | ellipsisId}}</td>
                        <td v-text="item.repayAmout ? (item.repayAmout/100).toFixed(2) : '0.00'">欠款</td>
                        <td v-text="item.repayDate">应还款时间</td>
                        <td v-text="item.deptName">所在部</td>
                        <td v-text="item.groupName">所在组</td>
                        <td v-text="item.dealUserName">催收人</td>
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
                // 点击查询页码赋值为1；
                if (data1.borrowerName === '' && data1.borrowerMobile === '') {
                    Common.alert('至少输入一个条件');
                    return false;
                }
                data1.pageIndex = 1;
                data1.pageSize = this.pageSize;
                data1.orderBy = 'create_time';
                data1.dir = 'desc';
                this.first = true;
                console.log(data1)
                this.getTable(data1)
            });
            // this.getTable();
        },
        //表格数据
        getTable (data) {
            let tableDate = {};
            if (data) {
                tableDate = data;
            } else {
                tableDate = {
                    pageIndex: 1,
                    pageSize: 10,
                    dir: 'desc',
                    orderBy: 'create_time'
                }
            }
            request('/collection/directorCollectionList.html', tableDate, (response) => {
                console.log(response)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.list = output.collectionRecord; // 数据list
                    this.pageIndex = tableDate.pageIndex;
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
                requestMethod: 'getTable',
                totalCount: totalCount
            }
            page.table_laypage(config, obj);
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
