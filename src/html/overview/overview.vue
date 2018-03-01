<template>
    <div class="container">
        <div v-if="data">
            <div v-if="roleName=='staff'"></div>
            <div v-else class="all">
                <div><span class="title">订单总数：</span><span v-text="data.total"></span></div>
                <!--
                <div v-if="roleName=='director' || roleName=='manager'"><span class="title">未分配订单：</span><span v-text="data.unallocated"></span></div>
                <div v-if="roleName=='director' || roleName=='manager'"><span class="title">已分配订单：</span><span v-text="data.alreadyAssigned"></span></div>
                <div v-if="roleName=='supervisor'"><span class="title">未开始订单：</span><span v-text="data.notBegin"></span></div>
                <div v-if="roleName=='supervisor'"><span class="title">进行中订单：</span><span v-text="data.onHand"></span></div>
                <div><span class="title">已完成订单：</span><span v-text="data.completed"></span></div>
                -->
            </div>
            <div id="main"></div>
        </div>
    </div>
</template>
<script>
import {verify, date, page} from 'js/layuiCommon';
import request from 'js/interface/request';
export default {
    data () {
        return {
            roleName: window.localStorage.getItem('roleName') || '',
            isshow: true,
            myChart: '',
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
            request('/collection/overView.html', {}, (response) => {
                console.log(response)
                if (response.data.respCode === '000000') {
                    this.data = response.data.data;
                    this.init();
                } else {
                    this.data = '';
                    window.layui.use('form', () => {
                        window.layer.msg(response.data.respMsg);
                    });
                }
            }, (e) => {
                console.log(e)
            })
        },
        handle () {
            let obj = {
                name: ['未分配'],
                unallocated: ['', ''],
                alreadyAssigned: ['', ''],
                number: ''
            }
            if (this.roleName === 'director') {
                obj.name.push('委外');
                obj.number = this.data.outsourceCount;
            } else if (this.roleName === 'manager' || this.roleName === 'supervisor') {
                obj.name.push('协催');
                obj.number = this.data.helpFlgCount;
            }
            let list = this.data.list;
            // console.log(this.data)
            if (list && list.length > 0) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].type) {
                        obj.name.push(list[i].name + '(' + list[i].type + ')');
                    } else {
                        obj.name.push(list[i].name);
                    }
                    if (list[i].unallocated === 0) {
                        obj.unallocated.push('');
                    } else {
                        obj.unallocated.push(list[i].unallocated)
                    }
                    if (list[i].alreadyAssigned === 0) {
                        obj.alreadyAssigned.push('');
                    } else {
                        obj.alreadyAssigned.push(list[i].alreadyAssigned)
                    }
                }
            }
            return obj;
        },
        init () {
            // 登录人权限  admin 管理员 director 催收总监 manager 催收经理 supervisor 主管 staff 员工
            if (this.roleName === 'director') {
                this.bar(this.handle());
            } else if (this.roleName === 'manager') {
                this.bar(this.handle());
            } else if (this.roleName === 'supervisor') {
                this.bar(this.handle());
            } else if (this.roleName === 'staff') {
                // this.line();
            }
            window.$(window).resize(() => {
                this.addEventResize();
            })
        },
        line () {
            this.myChart = window.echarts.init(document.getElementById('main'));
            let option = {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['订单数']
                },
                toolbox: {
                    feature: {
                        // saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '订单数',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: {normal: {}},
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };
            this.myChart.setOption(option);
        },
        addEventResize () {
            if (this.myChart) {
                this.myChart.resize();
            }
        },
        bar (obj) {
            let name = this.roleName === 'supervisor' ? '未开始' : '未下发';
            let name2 = this.roleName === 'supervisor' ? '进行中' : '已下发';
            let xAxisName = '';
            if (this.roleName === 'director') {
                xAxisName = '部门';
            } else if (this.roleName === 'manager') {
                xAxisName = '组';
            } else if (this.roleName === 'supervisor') {
                xAxisName = '催收员';
            } else if (this.roleName === 'staff') {
                xAxisName = '时间';
            }
            this.myChart = window.echarts.init(document.getElementById('main'));
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
                    // trigger: 'axis',
                    // axisPointer: {
                    //     type: 'shadow',
                    //     shadowStyle: {
                    //         color: 'rgba(255,185,19,0.1)'
                    //     }
                    // }
                },
                legend: {
                    data: ['未分配', obj.name[1], name, name2],
                    // width: 100,
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: '16',
                        fontFamily: '微软雅黑'
                    }
                },
                color: [
                    '#ff5353', '#309fff', '#ff5353', '#e3e3e3'
                ],
                grid: {
                    left: '3%',
                    right: '140',
                    bottom: '100',
                    containLabel: true
                },
                xAxis: [{
                    name: xAxisName,
                    type: 'category',
                    data: obj.name,
                    axisLabel: {
                        interval: 0,
                        rotate: -20,
                        textStyle: {
                            fontSize: '14'
                        }
                    }
                }],
                yAxis: [
                    {
                        name: '订单（个）',
                        type: 'value',
                        minInterval: 1
                    }
                ],
                markLine: {
                    symbol: ['arrow']
                },
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
                        name: '未分配',
                        type: 'bar',
                        stack: '订单A',
                        data: [this.data.unallocated],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        // fontWeight: 'bolder',
                                        fontSize: '14',
                                        fontFamily: '微软雅黑'
                                    }
                                }
                            },
                            emphasis: {
                                color: '#ff5353'
                            }
                        },
                        barWidth: '50',
                        barGap: '-100%'
                    },
                    {
                        name: obj.name[1],
                        type: 'bar',
                        stack: '订单B',
                        data: ['', obj.number],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        // fontWeight: 'bolder',
                                        fontSize: '14',
                                        fontFamily: '微软雅黑'
                                    }
                                }
                            },
                            emphasis: {
                                color: '#309fff'
                            }
                        },
                        barWidth: '50'
                    },
                    {
                        name: name,
                        type: 'bar',
                        stack: '订单',
                        data: obj.unallocated,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        // fontWeight: 'bolder',
                                        fontSize: '14',
                                        fontFamily: '微软雅黑'
                                    }
                                }
                            },
                            emphasis: {
                                color: '#ff5353'
                            }
                        },
                        barWidth: '50'
                    },
                    {
                        name: name2,
                        type: 'bar',
                        stack: '订单',
                        data: obj.alreadyAssigned,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        // fontWeight: 'bolder',
                                        fontSize: '14',
                                        fontFamily: '微软雅黑',
                                        color: '#5a5e5c'
                                    }
                                }
                            },
                            // hover
                            emphasis: {
                                color: '#e3e3e3'
                            }
                        },
                        barWidth: '50'
                    }
                ]
            };
            this.myChart.setOption(option);
        },
        wrap (params) {
            // console.log(window.$('body').width());
            var newParamsName = '';// 最终拼接成的字符串
            var paramsNameNumber = params.length;// 实际标签的个数
            var provideNumber = 4;// 每行能显示的字的个数
            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
            /**
            * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
            */
            // 条件等同于rowNumber>1
            if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (var p = 0; p < rowNumber; p++) {
                    var tempStr = '';// 表示每一次截取的字符串
                    var start = p * provideNumber;// 开始截取的位置
                    var end = start + provideNumber;// 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p === rowNumber - 1) {
                        // 最后一次不换行
                        tempStr = params.substring(start, paramsNameNumber);
                    } else {
                        // 每一次拼接字符串并换行
                        tempStr = params.substring(start, end) + '\n';
                    }
                    newParamsName += tempStr;// 最终拼成的字符串
                }
            } else {
                // 将旧标签的值赋给新标签
                newParamsName = params;
            }
            //将最终的字符串返回
            return newParamsName
        }
    },
    filters: {
    }
}
</script>
