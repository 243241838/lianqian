<template>
     <div class='container'>
        <div class="animate">
        <!--分割-->
            <div class="center">
                <div class="write">
                    <template v-for="(item, index) in list">
                        <div class="year" v-text="item.year" :class="{padding_top:index!=0}" v-show="item.year"></div>
                        <div class="month" v-for="(itm,m) in item.monthlist">
                            <div class="monthDate" @click="month(itm)" :class="{show:itm.show}">
                                <span v-text="itm.month"></span>
                                <span class="icon">
                                    <i class="layui-icon" v-if="!itm.show">&#xe625;</i>
                                    <i class="layui-icon rotate" v-else>&#xe625;</i>
                                </span>
                                <span></span>
                            </div>
                            <div class="day" v-for="day in itm.daylist" v-show="!itm.show">
                                <div class="left" style="float:left">
                                    <div v-text="day.date"></div>
                                    <div v-text="day.date2"></div>
                                    <div>
                                        <img src="./images/radius.png" alt="">
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="head"></div>
                                    <div class="text">
                                        <div class="img">
                                            <img v-show="day.sts==1" src="./images/b1.png" alt="">
                                            <img v-show="day.sts==2" src="./images/b2.png" alt="">
                                            <img v-show="day.sts==3" src="./images/b3.png" alt="">
                                            <img v-show="day.sts==4" src="./images/b4.png" alt="">
                                            <img v-show="day.sts==5" src="./images/b5.png" alt="">
                                            <img v-show="day.sts==6" src="./images/b6.png" alt="">
                                            <img v-show="day.sts==7" src="./images/b7.png" alt="">
                                            <img v-show="day.sts==9" src="./images/b9.png" alt="">
                                            <img v-show="day.sts==10" src="./images/b5.png" alt="">
                                        </div>
                                        <div class="content">
                                            <div class="tittle" v-text="day.title"></div>
                                            <div v-html="day.text"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="over" v-show="list.length-1==index&&item.monthlist.length-1==m&&!itm.show">
                                <div class="left" style="float:left">
                                    <div v-text="item.date"></div>
                                    <div v-text="item.date2"></div>
                                    <div>
                                        <img src="./images/radius.png" alt="">
                                    </div>
                                </div>
                                <div class="right">订单生成</div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>    
        <!--分割-->
        </div>
        <ul id="demo"></ul>
    </div>
</template>
<script>
import {verify, date, page, Common, checkbox} from 'js/layuiCommon';
import request from 'js/interface/request';
export default {
    data () {
        return {
            //转移类型 1:分配 2:协催 3:转移 4:回收 5:还款
            list: ''
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
        month (itm) {
            if (typeof itm.show === 'undefined') {
                this.$set(itm, 'show');
                itm.show = true;
            } else {
                itm.show = !itm.show;
            }
        },
        getData () {
            let obj = {
                collectionId: Common.getQueryString('collectionId')
               //'CESHI201708041140515879976'
            }
            request('/collectionTransferLogs/historyList.html', obj, (response) => {
                console.log(response.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (!output) {
                        return false;
                    }
                    if (!output.list[0].monthlist) {
                        Common.alert('暂无数据');
                        return false;
                    }
                    this.list = output.list;
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                Common.alert(e);
            })
        }
    },
    filters: {
    }
}
</script>
