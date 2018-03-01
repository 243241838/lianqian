<template>
     <div class='container'>
         <div class="animate">
            <form class="layui-form">
                <div class="layui-form-item form">
                    <div class="layui-inline">
                        <label class="layui-form-label">统计方式</label>
                        <div class="layui-input-inline">
                            <select name="flag" lay-filter="Date">
                                <option value="day">按日统计</option>
                                <option value="month">按月统计</option>
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline" v-show="iSday">
                        <label class="layui-form-label">时间</label>
                        <div class="layui-input-inline" style="margin-right: 0px;">
                            <input class="layui-input" readonly name="startTime" placeholder="请选择开始时间" @click="isMouth($event.srcElement ? $event.srcElement : $event.target)">
                        </div>
                        <label class="layui-form-label" style="width:auto">至</label>
                        <div class="layui-input-inline">
                            <input class="layui-input" readonly name="endTime" placeholder="请选择截止时间" @click="isMouth($event.srcElement ? $event.srcElement : $event.target)">
                        </div>
                    </div>
                    <div class="layui-inline" v-show="!iSday">
                        <label class="layui-form-label">时间</label>
                        <div class="layui-input-inline" style="margin-right: 0px;">
                            <input class="layui-input" readonly  name="startTime1" placeholder="请选择开始时间" @click="isMouth($event.srcElement ? $event.srcElement : $event.target)">
                        </div>
                        <label class="layui-form-label" style="width:auto">至</label>
                        <div class="layui-input-inline">
                            <input class="layui-input" readonly name="endTime1" placeholder="请选择截止时间" @click="isMouth($event.srcElement ? $event.srcElement : $event.target)">
                        </div>
                    </div> 
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="seach" style="background:#37a3ff;color:#fff;border-radius:2px;">
                            <i class="layui-icon" style="display:inline-block;transform:scale(0.9);">&#xe615;</i> 查询
                        </button>
                        <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="reset()">
                            <i class="layui-icon">&#xe631;</i> 重置
                        </button>
                    </div>
                </div>
            </form>
            <template v-if="isShow">
                <hr>
                <p style="text-align:center;">请选择统计方式和时间</p>
            </template>
            <div v-show="pandect">
                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="derive()" style="float:right;  margin-bottom:10px;">
                    <i class="layui-icon" ></i> 导出报表
                </div>
            </div>
            <table class="layui-table table" v-show="pandect">
                <colgroup>
                </colgroup>
                <tbody>
                     <tr>
                         <td rowspan="4">逾期金额（元）</td>
                         <td rowspan="4" v-text="pandect.repayMoneyTotal ? (pandect.repayMoneyTotal / 100).toFixed(2) :' 0.00'">逾期金额（元）</td>
                         <td rowspan="4">逾期订单数（笔）</td>
                         <td rowspan="4" v-text="pandect.repayCountTotal ? pandect.repayCountTotal : 0">逾期订单数（笔）</td>
                         <td rowspan="4">催回率</td>
                         <td rowspan="4" v-text="pandect.finishPercentTotal ? pandect.finishPercentTotal + '%' : 0">催回率</td>
                         <td rowspan="2">催回金额（元）</td>
                         <td rowspan="2" v-text="pandect.finishMoneyTotal ? (pandect.finishMoneyTotal / 100).toFixed(2) :' 0.00'">催回金额（元）</td>
                         <td rowspan="2">催回订单笔数（笔）</td>
                         <td rowspan="2" v-text="pandect.finishConutTotal ? pandect.finishConutTotal : 0">催回订单笔数（笔）</td>
                         <td>催回本金（元）</td>
                         <td v-text="pandect.finishShouldMoneyTotal ? (pandect.finishShouldMoneyTotal / 100).toFixed(2) :' 0.00'">催回本金（元）</td>
                         <td rowspan="4">催回滞纳金（元）</td> 
                         <td rowspan="4" v-text="pandect.finishDelayMoneyTotal ? (pandect.finishDelayMoneyTotal / 100).toFixed(2) :' 0.00'">催回滞纳金（元）</td> 
                     </tr>
                     <tr>
                         <td>催回服务费（元）</td>
                         <td v-text="pandect.finishServiceMoneyTotal ? (pandect.finishServiceMoneyTotal / 100).toFixed(2) :' 0.00'">催回服务费（元）</td>
                     </tr>
                     <tr>
                         <td rowspan="2">应催金额（元）</td>
                         <td rowspan="2" v-text="pandect.waitMoneyTotal ? (pandect.waitMoneyTotal / 100).toFixed(2) :' 0.00'">应催金额（元）</td> 
                         <td rowspan="2">应催订单笔数（笔）</td>
                         <td rowspan="2" v-text="pandect.waitCountTotal ? pandect.waitCountTotal : 0">应催订单笔数（笔）</td>
                         <td>应催本金（元）</td>
                         <td v-text="pandect.waitShouldMoneyTotal ? (pandect.waitShouldMoneyTotal / 100).toFixed(2) :' 0.00'">应催本金（元）</td>
                     </tr>
                     <tr>
                         <td>应催服务费（元）</td>
                         <td v-text="pandect.waitServiceMoneyTotal ? (pandect.waitServiceMoneyTotal / 100).toFixed(2) :' 0.00'">应服务费（元）（元）</td>
                     </tr>
                </tbody>
            </table>
            <div class="echarts" v-show="true">
                 <div id="main" style="width:70%;height:400px;"></div>
            </div>
            <table class="layui-table" id="table" v-show="list && list.length>0" style="">
                <colgroup>
                </colgroup>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>日期</th>
                        <th>逾期金额</th>
                        <th>逾期订单数</th>
                        <th>催回金额</th>
                        <th>催回滞纳金</th>
                        <th>催回服务费</th>
                        <th>催回订单数</th>
                        <th>展期金额</th>
                        <th>展期订单数</th>
                        <th>催回率</th>
                        <th>应催金额</th>
                        <th>应催服务费</th>
                        <th>应催订单数</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list">
                        <td v-if="pageIndex-1==0" v-text="index+1">序号</td>
                        <td v-else v-text="pageSize*(pageIndex-1) + index + 1">序号</td>
                        <td v-text="item.statisticsDay">日期</td>
                        <td v-text="item.repayMoney ? (item.repayMoney / 100).toFixed(2) : '0.00'">逾期金额</td>
                        <td v-text="item.repayCount ? item.repayCount : 0">逾期订单数</td>
                        <td v-text="item.finishMoney ? (item.finishMoney / 100).toFixed(2) : '0.00'">催回金额</td>
                        <td v-text="item.finishDelayMoney ? (item.finishDelayMoney / 100).toFixed(2) : '0.00'">催回滞纳金</td>
                        <td v-text="item.finishServiceMoney ? (item.finishServiceMoney / 100).toFixed(2) : '0.00'">催回服务费</td>
                        <td v-text="item.finishConut ? item.finishConut : 0">催回订单数</td>
                        <td v-text="item.partMoney ? (item.partMoney / 100).toFixed(2) : '0.00'">展期金额</td>
                        <td v-text="item.partCount ? item.partCount : 0">展期订单数</td>
                        <td v-text="item.finishPercent ? item.finishPercent + '%' : 0">摧回率</td>
                        <td v-text="item.waitMoney ? (item.waitMoney / 100).toFixed(2) : '0.00'">应催金额</td>
                        <td v-text="item.waitServiceMoney ? (item.waitServiceMoney / 100).toFixed(2) : '0.00'">应催服务费</td>
                        <td v-text="item.waitCount ? item.waitCount : 0">应催订单数</td>
                    </tr>
                </tbody>
            </table>
            <div id="pagination" class="padd20" style="text-align:right;"></div>
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
            isShow: true,
            first: true,
            pageSize: 10, //一页多少条
            pageIndex: 1, // 当前页码
            pandect: '', // 总览
            list: '', //表格数据
            echartsList: '', //图标数据
            iSday: true,
            deriveData: '' // 导出 报表需要的数据
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
        //初始化
        try {
            this.init();
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        //初始化
        init () {
            //layui初始化
            this.initialize();
            //复选框
            window.layui.use('form', () => {
                var form = window.layui.form();
                form.on('select(Date)', (data) => {
                    //value 0 日 1 月
                    let $ = window.$;
                    let value = data.value;
                    if (value === 'day') {
                        this.iSday = true;
                        window.$('#laydate_table').css('display', 'block');
                    } else if (value === 'month') {
                        this.iSday = false;
                    }
                });
                form.render();
            });
             //验证
            verify.form('seach', (data) => {
                let data1 = data.field;
                // console.log(data1)
                // console.log(this.iSday)
                if (this.iSday && !data1.endTime && !data1.startTime) {
                    Common.alert('时间至少选择一个');
                    return false;
                }
                if (!this.iSday && !data1.endTime1 && !data1.startTime1) {
                    Common.alert('时间至少选择一个');
                    return false;
                }
                //天
                if (this.iSday && data1.startTime && data1.endTime) {
                    if (data1.startTime > data1.endTime) {
                        Common.alert('开始时间必须小于等于结束时间')
                        return false;
                    }
                    let start = new Date(data1.startTime.replace(/-/g, '/'));
                    let maxDate = this.GetDatestr(start, 93, 1);
                    if (data1.endTime > maxDate) {
                        Common.alert('按日统计最大跨度93天');
                        return false;
                    }
                }
                if (!this.iSday && data1.startTime1&&data1.endTime1) {
                    if (data1.startTime1 > data1.endTime1) {
                        Common.alert('开始时间必须小于等于结束时间')
                        return false;
                    }
                    let start = new Date((data1.startTime1).replace(/-/g, '/'));
                    let maxDate = this.GetDatestr(start, 12, 2)
                    if (data1.endTime1 > maxDate) {
                        Common.alert('按月最大跨度12个月');
                        return false;
                    }
                }
                this.first = true;
                this.isShow = false;
                winLayer.loadOn(2) // 开始加载
                let getData = {
                    flag: data1.flag
                }
                if (this.iSday) {
                    getData.startTime = data1.startTime;
                    getData.endTime = data1.endTime
                } else {
                    getData.startTime = data1.startTime1;
                    getData.endTime = data1.endTime1
                }
                // console.log(getData)
                //点击搜索重置为空
                this.list = '';
                this.pandect = '';
                this.getPandect(getData); // 总览
                setTimeout(() => {
                    this.getTable(getData); // 获取分段
                })
            });
        },
        //选择月份  天模块消失
        isMouth (that) {
            let $ = window.$;
            //移除确定键的所有事件
            $('#laydate_ok').unbind();
            $('#laydate_ms span').unbind();
            window.layui.laydate({
                elem: that,
                istoday: this.iSday //是否显示今天
            })
            if (!this.iSday) {
                let day = $(that).val();
                if (day.length >= 10) {
                    $(that).val(day.substring(0, day.length-3));
                }
                window.$('#laydate_table').css('display', 'none');
                //绑定确认按钮
                $('#laydate_ok').on('click', () => {
                    let start = $(that).val();
                    $(that).val(start.substring(0, start.length - 3));
                })
                //绑定月份
                let save = this;
                $('#laydate_ms span').on('click', function () {
                    let year = $('#laydate_y').val();
                    let month = this.innerHTML;
                    let date = year.substring(0, year.length-1) + '-' + month.substring(0, month.length-1);
                    $(that).val(date);
                    $('#laydate_box').css('display', 'none');
                })
            }
        },
        //获取月的最后一天
        getLastDay () {
            let td = window.$('#laydate_table tr td');
            let arr = [];
            for (let i = 0; i < td.length; i++) {
                if (!td.eq(i).is('.laydate_nothis')) {
                    arr.push(td.eq(i))
                }
            }
            return arr[arr.length - 1].html()
        },
        //设置什么时间的多少天后时间
        GetDatestr(date, AddDayCount, number) {
            if (number === 1) {
                date.setDate(date.getDate() + AddDayCount);
            } else {
                date.setMonth(date.getMonth() + AddDayCount);
            }
            var y = date.getFullYear();
            var m = date.getMonth()+1;//获取当前月份的日期
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        },
        //获取总览
        getPandect (data) {
            let obj = {
                flag: data.flag,
                startTime: data.startTime,
                endTime: data.endTime
            }
            this.deriveData = obj; // 导出表格要的数据
            // console.log(obj)
            request('/collectionStatistics/subsectionList.html', obj, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    if (output.subsectionTotal) {
                        this.pandect = output.subsectionTotal;
                    }
                    if (output.subsectionRecordList) {
                        this.echartsList = output.subsectionRecordList;
                        this.echartsFormatting(this.echartsList)
                    }
                    //layui初始化
                    this.initialize();
                } else {
                    winLayer.loadOff() // 关闭load
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                winLayer.loadOff() // 关闭load
                Common.alert(e);
            })
        },
         //表格数据
        getTable (data) {
            if (this.first) {
                data.pageIndex = 1;
                data.pageSize = this.pageSize;
                this.pageIndex = 1;
            } else {
                this.pageIndex = data.pageIndex;
            }
            // console.log(data)
            request('/collectionStatistics/subsectionPageList.html', data, (response) => {
                // console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    winLayer.loadOff() // 关闭load
                    if (!output) {
                        return false;
                    }
                    if (output.subsectionRecord) {
                        this.list = output.subsectionRecord; // 数据list
                    }
                    //分页第一次和搜索时要更新页码
                    if (this.first) {
                        this.first = false;
                        this.addPagination(output.page, data, output.totalCount);// //总页码赋值
                    }
                    //layui初始化
                    this.initialize();
                } else {
                    winLayer.loadOff() // 关闭load
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                winLayer.loadOff() // 关闭load
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
        //echarts数据格式化
        echartsFormatting (data) {
            // console.log(data);
            let waitMoney = []; // 累计应催金额 waitMoney
            let finishMoney = []; // 累计催回金额 finishMoney
            let waitCount = []; //累计应催订单数 waitCount
            let finishConut = []; //累计催回订单数 finishConut
            let finishDelayMoney = []; // 催回滞纳金 finishDelayMoney
            let statisticsDay = []; // statisticsDay
            for (let i = 0; i < data.length; i++) {
                // 累计应催金额 waitMoney
                if (data[i].waitMoney) {
                    waitMoney.push(data[i].waitMoney / 100)
                } else {
                    waitMoney.push(0)
                }
                // 累计催回金额 finishMoney
                if (data[i].finishMoney) {
                    finishMoney.push(data[i].finishMoney / 100)
                } else {
                    finishMoney.push(0)
                }
                //累计应催订单数 waitCount
                if (data[i].waitCount) {
                    waitCount.push(data[i].waitCount)
                } else {
                    waitCount.push(0)
                }
                //累计催回订单数 finishConut
                if (data[i].finishConut) {
                    finishConut.push(data[i].finishConut)
                } else {
                    finishConut.push(0)
                }
                // 催回滞纳金 finishDelayMoney
                if (data[i].finishDelayMoney) {
                    finishDelayMoney.push(data[i].finishDelayMoney / 100)
                } else {
                    finishDelayMoney.push(0)
                }
                // statisticsDay
                if (data[i].statisticsDay) {
                    statisticsDay.push(data[i].statisticsDay)
                } else {
                    statisticsDay.push(0)
                }
            }
            let obj = {
                waitMoney: waitMoney,
                finishMoney: finishMoney,
                waitCount: waitCount,
                finishConut: finishConut,
                finishDelayMoney: finishDelayMoney,
                statisticsDay: statisticsDay
            }
            this.echarts(obj)
        },
        //折线图
        echarts (data) {
            let main = window.$('#main')
            let echarts = window.$('.echarts').eq(0)
            main.css('width', parseInt(echarts.css('width')));
            var myChart = window.echarts.init(document.getElementById('main'));
            // myChart.showLoading(); //加载
            // 指定图表的配置项和数据
            let arr = data;
            if (!arr) {
                arr = ''
            }
            let option = {
                //柱状颜色
                color: ['#eb5617', '#feb913', '#2dce8f', '#309fff', '#ccc'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { //鼠标移动出现坐标轴
                        type: 'shadow',
                        label: {
                            show: true
                        }
                    }
                },
                legend: {
                    data: ['累计应催金额', '累计催回金额', '累计应催订单数', '累计催回订单数', '催回滞纳金']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '18%', //放大缩小的组件距离
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        // name: '时间',
                        // nameLocation: 'middle', //名字位置
                        data: arr.statisticsDay,
                        axisPointer: {
                            type: 'shadow' //line | shadow
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: -40
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '金额（元）',
                        minInterval: 1,
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            // formatter: (value) => { //坐标轴输出格式化
                            //     return parseInt(value)
                            // }
                        }
                    },
                    {
                        type: 'value',
                        name: '订单数（笔）',
                        minInterval: 1,
                        splitLine: {
                            show: false
                        },
                        axisLabel: { //输出格式
                            // formatter: (value) => {
                            //     return parseInt(value)
                            // }
                        }
                    }
                ],
                dataZoom: [
                    {
                        show: true,
                        start: 0,
                        end: 50
                    },
                    {
                        type: 'inside',
                        start: 0
                        // end: 30
                    }
                    // {
                    //     show: true,
                    //     yAxisIndex: 0,
                    //     filterMode: 'empty',
                    //     width: 10,
                    //     height: '80%',
                    //     showDataShadow: false,
                    //     left: '93%'
                    // }
                ],
                series: [
                    {
                        name: '累计应催金额',
                        type: 'bar',
                        barGap: '10%',
                        yAxisIndex: 0,
                        barMaxWidth: 30, //最大宽度
                        stack: 'a', //值一样的可合并成一个柱
                        data: arr.waitMoney
                        // itemStyle: {
                        //     normal: {
                        //         label: {
                        //             show: true,
                        //             position: 'insideTop'
                        //         }
                        //     }
                        // }
                    },
                    {
                        name: '累计催回金额',
                        type: 'bar',
                        stack: 'a',
                        yAxisIndex: 0, //对应第几个Y轴
                        barMaxWidth: 30, //最大宽度
                        data: arr.finishMoney
                    },
                    {
                        name: '累计应催订单数',
                        type: 'bar',
                        stack: 'b',
                        barGap: '10%',
                        barMaxWidth: 30, //最大宽度
                        yAxisIndex: 1,
                        data: arr.waitCount
                    },
                    {
                        name: '累计催回订单数',
                        type: 'bar',
                        stack: 'b',
                        barMaxWidth: 30, //最大宽度
                        yAxisIndex: 1,
                        data: arr.finishConut
                    },
                    {
                        name: '催回滞纳金',
                        type: 'bar',
                        barMaxWidth: 30, //最大宽度
                        yAxisIndex: 0,
                        data: arr.finishDelayMoney
                    }
                ]
            };
            myChart.setOption(option);
            window.onresize = myChart.resize; //解决问题4：如果窗口大小变化，图表可以自动进行调整；
            // myChart.hideLoading();//结束加载
        },
        //导出报表
        derive () {
            let config = {
                isDownload: true
            }
            // console.log(this.deriveData)
            request('/download/downExcel.html', this.deriveData, (response) => {
                // console.log(response)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            }, config)
        },
        reset () {
            this.iSday = true;
            window.$('#laydate_table').css('display', 'block');
        },
        //layui初始化控件（要多次初始化）
        initialize () {
            this.$nextTick(() => {
                window.layui.use(['form', 'laydate'], () => {
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
