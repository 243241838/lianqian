<template>
     <div class='container'>
         <div class="animate">
            <form class="layui-form" id="form">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">订单号</label>
                        <div class="layui-input-inline">
                            <input type="text" name="orderId" @input="change($event.srcElement ? $event.srcElement : $event.target)" placeholder="请输入订单号" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label" style="width:84px">订单创建时间</label>
                        <div class="layui-input-inline" style="margin-right:0;">
                            <input class="layui-input" readonly  name="createStartTime" placeholder="请选择" id="start">
                        </div>
                        <label class="layui-form-label" style="width:auto">至</label>
                        <div class="layui-input-inline">
                            <input class="layui-input" readonly name="createEndTime" placeholder="请选择" id="end">
                        </div>
                    </div>   
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom"  lay-submit lay-filter="seach" style="background:#37a3ff;color:#fff;border-radius:2px;">
                            <i class="layui-icon" style="display:inline-block;transform:scale(0.9);">&#xe615;</i> 查询
                        </button>
                        <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom"  @click="reset()">
                            <i class="layui-icon">&#xe631;</i> 重置
                        </button>
                    </div>
                </div>
            </form>
            <form class="layui-form">
                <div class="layui-form-item" style="padding-top:10px;">
                    <div class="layui-inline">
                        <label class="layui-form-label" style="width:auto;padding-left:0px;">选中订单标记为</label>
                        <div class="layui-input-inline" style="width:110px;">
                                <select name="enabled" lay-verify="required">
                                    <option value="2">黑名单</option>
                                    <option value="0">驳回</option>
                                </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit_allot">
                            <i class="layui-icon">&#xe605;</i> 确认
                        </button>
                    </div>
                </div>
                <table class="layui-table" id="table">
                    <colgroup>
                    </colgroup>
                    <thead>
                        <th><input type="checkbox" name="" lay-skin="primary" lay-filter="allChoose"></th>
                        <th>序号</th>
                        <th>操作</th>
                        <th>订单号</th>
                        <th>订单创建时间</th>
                        <th>欠款人</th>
                        <th>证件号</th>
                        <th>原因</th>
                        <th>催收人</th>
                    </thead>
                    <tbody>
                        <tr  v-for="(item,index) in list">
                            <td><input type="checkbox" :name="index" lay-skin="primary" :value="item.collectionId"></td>
                            <td v-if="pageIndex-1==0" v-text="index+1"></td>
                            <td v-else v-text="pageSize*(pageIndex-1) + index + 1"></td>
                            <td>
                                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" @click="go_url(item)">查看</div>
                            </td>
                            <td v-text="item.orderId">订单号</td>
                            <td v-text="item.createTime">订单创建时间</td>
                            <td v-text="item.borrowerName">欠款人</td>
                            <td>{{item.idNumber | ellipsisId}}</td>
                            <td>{{item.blackComment.length > 10 ? item.blackComment.substring(0,10) + '...' : item.blackComment}}</td>
                            <td v-text="item.dealUserName">催收人</td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div id="pagination" style="text-align:right"></div>
            <div v-show="!list" style="text-align:center">暂无数据</div>
        </div>
    </div>
</template>
<script>
import {verify, date, page, Common, checkbox} from 'js/layuiCommon';
import request from 'js/interface/request';
import {tab, winLayer} from 'js/common';
export default {
    data () {
        return {
            roleName: '', //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
            //0代表没有排序， 1代表正序 2代表倒叙
            first: true,
            pageSize: 10, //一页多少条
            pageIndex: 1, // 当前页码
            form_table: '', //点击查询时存储查询数据
            list: '' //表格数据
        }
    },
    computed: {
    },
    created () {
        //登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor主管 staff 员工
        this.roleName = window.localStorage.getItem('roleName'); // 获取职位
    },
    mounted () {
         //初始化
        this.init();
        this.initialize();
    },
    methods: {
        //初始化
        init () {
            //表单搜索
            verify.form('seach', (data) => {
                let data1 = data.field;
                 // createStartTime createEndTime 订单创建时间
                if (data1.createStartTime&&data1.createEndTime) {
                    if (data1.createStartTime > data1.createEndTime) {
                        Common.alert('开始时间必须小于等于结束时间')
                        return false;
                    }
                }
                // 点击查询页码赋值为1；
                data1.pageIndex = 1;
                data1.pageSize = this.pageSize;
                data1.orderBy = 'create_time';
                data1.dir = 'desc';
                this.first = true;
                console.log(data1)
                this.getTable(data1)
            });
             //调整分配人员
            verify.form('commit_allot', (data) => {
                let data1 = data.field;
                this.orderData(data1); //有效无效订单数据处理
            });
            date.date_input('start', 'end'); // 还款时间
            this.getTable(); //获取表格数据
            checkbox.checkAll('table'); //表格全选
        },
        //表格数据
        getTable (data) {
            window.$('#table input').prop('checked', false);
            let tableDate = ''
            if (data) {
                tableDate = data;
            } else {
                tableDate = {
                    pageIndex: 1,
                    pageSize: 10,
                    dir: 'desc',
                    orderBy: 'create_time'
                }
                this.first = true;
                this.pageSize = 10;
            }
            this.form_table = tableDate; // 搜索条件备用
            console.log(tableDate)
            request('/collection/collectionBlackList.html', tableDate, (response) => {
                // console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (output) {
                        this.list = output.collectionBlackList; // 数据list
                        console.log(this.list)
                        this.pageIndex = tableDate.pageIndex; //成功后页码赋值
                    } else {
                        return false;
                    }
                    //分页第一次和搜索时要更新页码
                    if (this.first) {
                        this.first = false;
                        this.addPagination(output.page, tableDate, output.totalCount);// //总页码赋值
                    }
                    this.initialize(); // 初始化控件
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
        //订单分配的数据处理
        orderData (data) {
            console.log(data)
            let enabled = data.enabled; //保存
            delete data.enabled; // 删除属性只要订单号
            let arr = Object.values(data); //只取value值
            //判断至少有一个订单号
            // console.log(arr)
            if (arr.length <= 0) {
                Common.alert('至少选择一个订单！');
                return false;
            }
            winLayer.loadOn(2) // 开始加载
            let obj = {
                enabled: enabled
            };
            let collectionIdRecord = [];
            for (let i = 0; i < arr.length; i++) {
                let obj = {
                    collectionId: arr[i]
                }
                collectionIdRecord.push(obj)
            }
            obj.collectionIdRecord = collectionIdRecord;
            console.log(obj)
            this.order_allocation(obj); //分配订单
        },
        //订单分配提交
        order_allocation (data) {
            request('/collection/collectionBlackDeal.html', data, (response) => {
                console.log(response.data)
                if (response.data.respCode === '000000') {
                    Common.alert(response.data.respMsg);
                    window.$('#table input[type="checkbox"]').prop('checked', false);
                    this.first = true; //更新分页
                    this.getTable(this.form_table);
                    winLayer.loadOff() // 关闭load
                } else {
                    winLayer.loadOff() // 关闭load
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                winLayer.loadOff() // 关闭load
                Common.alert(e);
            })
        },
        //重置
        reset () {
            this.getTable();
        },
        //跳转协催
        go_url (item) {
            tab.tabAdd('订单详情', './collection/detailorder.html?collectionId=' + item.collectionId);
        },
        //去空格
        change (that) {
            that.value = that.value.trim();
        },
        //跳转第三方
        go_three () {
            let a = 'TASKYYS100000201709071028350681101299'
            window.parent.open('https://portal.shujumohe.com/main/customerReport/' + a + '?user_name=543564353');
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
