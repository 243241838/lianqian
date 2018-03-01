<template>
     <div class='container'>
         <div class="animate">
            <div class="echarts">
                 <div id="main" style="width:100%;height:700px;"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {verify, date, page, Common} from 'js/layuiCommon';
import request from 'js/interface/request';
import {tab, winLayer} from 'js/common';
import {map, province} from 'js/map'; //引入全国各省地图资源和各省名字
export default {
    data () {
        return {
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
        // this.echarts();
        this.getdata();
    },
    methods: {
        getdata () {
            request('/collectionStatistics/statisticsTerritory.html', {}, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    this.echarts(output);
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        },
         //折线图
        echarts (output) {
            //http://gallery.echartsjs.com/editor.html?c=xSyxuDklzHl 地图原型网址
            var myChart = window.echarts.init(document.getElementById('main'));
            myChart.showLoading(); //加载
            var provinces = map; //各省地图
            var data1 = output.provinceTotal.length > 0 ? output.provinceTotal : []; //省名字赋值
            let option = {
                tooltip: {
                    //trigger: 'item'
                    trigger: 'item',
                    // '{b}<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ddb926"></span>{a0}:{c}%'
                    formatter: (params) => {
                        // console.log(params)
                        let data = '';
                        let number = params.value ? params.value : 0;
                        let name = params.name ? params.name : '';
                        // console.log(params)
                        data += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ddb926"></span>' + name + '<br>' + '条数：' + number;
                        return data;
                    }
                },
                visualMap: {
                    // seriesIndex: 1,
                    orient: 'horizontal',
                    left: 'left',
                    min: 0,
                    max: 1000,
                    // color: ['#ccc', 'yellow'],
                    text: ['高', '低'] // 文本，默认为数值文本
                    // splitNumber: 0
                },
                //工具窗
                toolbox: {
                    show: false,
                    orient: 'vertical',
                    x: 'right',
                    y: 'center',
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        }
                    }
                },
                series: [{
                    name: '省（条）',
                    type: 'map',
                    mapType: 'china',
                    left: 'left',
                    top: '5%',
                    width: '50%',
                    height: '78%',
                    roam: true,
                    selectedMode: 'single',
                    showLegendSymbol: false,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true
                            }
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    data: data1
                }],
                animation: false
            };
            myChart.setOption(option, true);
            myChart.hideLoading();//结束加载
            setTimeout(delay, 1000);
            function delay() {
                //myChart.on("mapselectchanged", function (param)
                myChart.on('click', function(param) {
                    var selectedProvince = param.name;
                    // console.log(provinces[selectedProvince])
                    //判断是否省（）
                    if (!provinces[selectedProvince]) {
                        // option.series.splice(1);
                        // option.legend = null;
                        // option.visualMap = null;
                        // myChart.setOption(option, true);
                        return false; //去掉点击省内市的点击事件
                    }
                    let number = [];
                    //$.get('http://echarts.baidu.com/gallery/vendors/echarts/map/json/province/' + provinces[selectedProvince] + '.json', function (geoJson) {
                    //通过路径请求
                    // window.$.get(provinces[selectedProvince], function(geoJson) {})
                    window.echarts.registerMap(selectedProvince, provinces[selectedProvince]);
                    if (output.cityTotal.length > 0) {
                        for (let i = 0; i < provinces[selectedProvince].features.length; i++) {
                            let name = provinces[selectedProvince].features[i].properties.name;
                            for (let k = 0; k < output.cityTotal.length; k++) {
                                let city = output.cityTotal[k]
                                if (city.name.substr(0, 2) === name.substr(0, 2)) {
                                    let obj = {
                                        name: name,
                                        value: city.value
                                    }
                                    number.push(obj);
                                }
                            }
                        }
                    }
                    //判断特别地区不显示
                    let name = selectedProvince;
                    if (name === '新疆' || name === '西藏' || name === '内蒙古' || name === '海南') {
                        name = '';
                    }
                    option.series[1] = {
                        name: '市（条）',
                        type: 'map',
                        mapType: name, //name为空时，不限时省内地图
                        left: '50%',
                        top: '5%',
                        width: '50%',
                        height: '78%',
                        roam: true,
                        selectedMode: 'single',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: number
                    };
                    option.legend = {
                        left: 'right',
                        data: ['随机数据']
                    };
                    option.visualMap = {
                        // seriesIndex: 1,
                        orient: 'horizontal',
                        left: 'left',
                        min: 0,
                        max: 500,
                        // color: ['orange', 'yellow'],
                        // text: ['高', '低'] // 文本，默认为数值文本
                        splitNumber: 0
                    };
                    option.tooltip = {
                        //trigger: 'item'
                        trigger: 'item',
                        // '{b}<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ddb926"></span>{a0}:{c}%'
                        formatter: (params) => {
                            // console.log(params)
                            let data = '';
                            let number = params.value ? params.value : 0;
                            let name = params.name ? params.name : '';
                            // console.log(params)
                            data += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ddb926"></span>' + name + '<br>' + '条数：' + number;
                            return data;
                        }
                    };
                    myChart.setOption(option, true);
                });
            }
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
