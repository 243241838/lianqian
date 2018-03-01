<template>
    <div class="container">
        <div class="animate">
            <template v-if="data">
                <div class="block">
                    <fieldset class="layui-elem-field layui-field-title">
                        <legend>逾期总订单数</legend>
                    </fieldset>
                    <div class="item">
                        <div id="allCount" class="pie"></div>
                        <div class="tablebox">
                            <span class="fr" style="margin-bottom:10px;">截止至 {{data.statisticsDay}}</span>
                            <table class="layui-table table">
                                <colgroup>
                                    <col width="400">
                                    <col width="400">
                                    <col width="400">
                                    <col width="400">
                                    <col width="400">
                                    <col width="400">
                                </colgroup>
                                <tbody class="tbodyH">
                                    <tr>
                                        <td rowspan="3">逾期总订单数</td>
                                        <td rowspan="3">{{data.totalCount}} 笔</td>
                                        <td>催回订单数</td>
                                        <td>{{data.finishCount}} 笔</td>
                                    </tr>
                                    <tr>
                                        <td>应催订单数</td>
                                        <td>{{data.waitCount}} 笔</td>
                                    </tr>
                                    <tr>
                                        <td>过期订单数</td>
                                        <td>{{data.overdueConut}} 笔</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <fieldset class="layui-elem-field layui-field-title">
                        <legend>逾期总金额</legend>
                    </fieldset>
                    <div class="item">
                        <div id="allAmout" class="pie"></div>
                        <div class="tablebox">
                            <span class="fr" style="margin-bottom:10px;">截止至 {{data.statisticsDay}}</span>
                            <table class="layui-table table">
                                <colgroup>
                                    <col width="400">
                                    <col width="400">
                                    <col width="400">
                                    <col width="400">
                                    <col width="400">
                                    <col width="400">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td rowspan="6">逾期总金额（元）</td>
                                        <td rowspan="6">{{data.totalMoney|formatMoney}}</td>
                                        <td rowspan="2">催回金额（元）</td>
                                        <td rowspan="2">{{data.finishMoney|formatMoney}}</td>
                                        <td>催回本金（元）</td>
                                        <td>{{data.finishShouldMoney|formatMoney}}</td>
                                        <td rowspan="6">催回滞纳金（元）</td>
                                        <td rowspan="6">{{data.finishDelayMoney|formatMoney}}</td>
                                    </tr>
                                    <tr>
                                        <td>催回服务费（元）</td>
                                        <td>{{data.finishServiceMoney|formatMoney}}</td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2">应催金额（元）</td>
                                        <td rowspan="2">{{data.waitMoney|formatMoney}}</td>
                                        <td>应催本金（元）</td>
                                        <td>{{data.waitShouldMoney|formatMoney}}</td>
                                    </tr>
                                    <tr>
                                        <td>应催服务费（元）</td>
                                        <td>{{data.waitServiceMoney|formatMoney}}</td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2">过期金额（元）</td>
                                        <td rowspan="2">{{data.overdueMoney|formatMoney}}</td>
                                        <td>过期本金（元）</td>
                                        <td>{{data.overdueShouldMoney|formatMoney}}</td>
                                    </tr>
                                    <tr>
                                        <td>过期服务费（元）</td>
                                        <td>{{data.overdueServiceMoney|formatMoney}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <span class="fl" style="font-size:12px;">注：超过180天未催回订单设为过期订单</span>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="item">
                        <div id="pie1" class="pie three"></div>
                        <div id="pie2" class="pie three"></div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div style="text-align:center;">暂无数据</div>
            </template>
        </div>
    </div>
</template>
<script>
import {verify, date, page} from 'js/layuiCommon';
import request from 'js/interface/request';
export default {
    data () {
        return {
            pie: {},
            data: {}
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
        this.getData();
    },
    methods: {
        getData () {
            request('/collectionStatistics/statisticsList.html', {}, (response) => {
                console.log(response)
                if (response.data.respCode === '000000') {
                    this.data = response.data.data;
                    if (this.data) {
                        this.$nextTick(() => {
                            this.paint();
                        })
                    }
                }
            }, (error) => {
                console.log(error)
            })
        },
        paint () {
            try {
                this.pieChart1('allCount');
                this.pieChart2('allAmout');
                let obj = {
                    title: '累计本金',
                    arr: ['催回本金', '过期本金', '应催本金'],
                    moneyRate: [this.data.totalFinishPercent, this.data.totalOverduePercent, this.data.totalShouldPercent]
                }
                this.pieChart3('pie1', obj);
                obj = {
                    title: '累计服务费',
                    arr: ['催回服务费', '过期服务费', '应催服务费'],
                    moneyRate: [this.data.serviceFinishPercent, this.data.serviceOverduePercent, this.data.serviceShouldPercent]
                }
                this.pieChart3('pie2', obj);
            } catch (e) {
                console.log(e)
            }
        },
        pieChart1 (id) {
            this.pie[id] = window.echarts.init(document.getElementById(id));
            let option = {
                title: {
                    text: '',
                    textStyle: {
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#333'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}'
                    // formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    y: 'center',
                    data: ['催回订单数', '应催订单数', '过期订单数']
                },
                color: ['#feb913', '#309fff', '#eb5617'],
                series: [
                    {
                        name: '',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '60%'],
                        textStyle: {
                            color: '#980',
                            fontSize: 18
                        },
                        label: {
                            normal: {
                                position: 'outside'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data: [
                            {value: this.data.finishPercent, name: '催回订单数 ' + this.data.finishPercent + '%', selected: true},
                            {value: this.data.waitPercent, name: '应催订单数' + this.data.waitPercent + '%'},
                            {value: this.data.overduePercent, name: '过期订单数' + this.data.overduePercent + '%'}
                        ]
                    }
                ]
            };
            this.pie[id].setOption(option);
            window.$(window).resize(() => {
                this.pie[id].resize();
            })
        },
        pieChart2 (id) {
            this.pie[id] = window.echarts.init(document.getElementById(id));
            let option = {
                title: {
                    // text: '',
                    // textStyle: {
                    //     fontSize: 18,
                    //     fontWeight: 'bolder',
                    //     color: '#333'
                    // }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}'
                    // formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    y: 'center',
                    data: ['催回金额', '过期金额', '应催金额', '催回服务费', '催回本金', '过期本金', '过期服务费', '应催本金', '应催服务费']
                },
                color: ['#feb913', '#e3dfc7', '#eb5617', '#309fff', '#feb913', '#e3dfc7', '#5452ce', '#eb5617', '#2dce8f'],
                series: [
                    {
                        name: '',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '40%'],
                        label: {
                            normal: {
                                position: 'inner',
                                color: '#000',
                                fontSize: 23
                            }
                        },
                        // labelLine: {
                        //     normal: {
                        //         show: true
                        //     }
                        // },
                        data: [
                            {value: this.data.finishMoneyPercent, name: '催回金额 ' + this.data.finishMoneyPercent + '%', selected: true},
                            {value: this.data.overdueMoneyPercent, name: '过期金额 ' + this.data.overdueMoneyPercent + '%'},
                            {value: this.data.waitMoneyPercent, name: '应催金额 ' + this.data.waitMoneyPercent + '%'}
                        ]
                    },
                    {
                        name: '',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        data: [
                            {value: this.data.finishServiceMoneyPercent, name: '催回服务费 ' + this.data.finishServiceMoneyPercent + '%'},
                            {value: this.data.finishShouldMoneyPercent, name: '催回本金 ' + this.data.finishShouldMoneyPercent + '%'},
                            {value: this.data.overdueShouldMoneyPercent, name: '过期本金 ' + this.data.overdueShouldMoneyPercent + '%'},
                            {value: this.data.overdueServiceMoneyPercent, name: '过期服务费 ' + this.data.overdueServiceMoneyPercent + '%'},
                            {value: this.data.waitShouldMoneyPercent, name: '应催本金 ' + this.data.waitShouldMoneyPercent + '%'},
                            {value: this.data.waitServiceMoneyPercent, name: '应催服务费 ' + this.data.waitServiceMoneyPercent + '%'}
                        ]
                    }
                ]
            };
            this.pie[id].setOption(option);
            window.$(window).resize(() => {
                this.pie[id].resize();
            })
        },
        pieChart3 (id, obj) {
            this.pie[id] = window.echarts.init(document.getElementById(id));
            let option = {
                title: {
                    text: obj.title,
                    x: 'center',
                    y: 'bottom',
                    textStyle: {
                        fontSize: 18,
                        fontWeight: 'normal',
                        color: '#333'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}'
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: [obj.arr[0], obj.arr[1], obj.arr[2]]
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '50%'],
                        label: {
                            normal: {
                                position: 'outside'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data: [
                            {value: obj.moneyRate[0], name: obj.arr[0] + obj.moneyRate[0] + '%', selected: true},
                            {value: obj.moneyRate[1], name: obj.arr[1] + obj.moneyRate[1] + '%'},
                            {value: obj.moneyRate[2], name: obj.arr[2] + obj.moneyRate[2] + '%'}
                        ]
                    }
                ]
            };
            if (id === 'pie1') {
                option.color = ['#feb913', '#309fff', '#eb5617'];
            } else {
                option.color = ['#309fff', '#54525e', '#2dce8f'];
            }
            console.log(id)
            this.pie[id].setOption(option);
            window.$(window).resize(() => {
                this.pie[id].resize();
            })
        }
    },
    filters: {
        formatMoney: function (value) {
            if (value === 0 || value === '0') {
                return '0.00';
            }
            if (!value) {
                return value;
            }
            return parseFloat(value / 100).toFixed(2);
        }
    }
}
</script>
