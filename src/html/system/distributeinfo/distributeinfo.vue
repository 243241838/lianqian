<template>
    <div class="container">
        <div class="animate">
            <div style="text-align:right;"><input id="file" type="file" name="file" lay-type="file" lay-ext="xls" class="layui-upload-file"></div>
            <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
                <legend>批量分配</legend>
            </fieldset>
            <form class="layui-form" id="commit_reset">
                    <table class="layui-table">
                        <colgroup>
                            <col width="200">
                            <col width="400">
                            <col width="400">
                            <col width="400">
                            <col width="400">
                            <col width="400">
                            <col width="200">
                            <col width="400">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>类型</th>
                                <th>未分配订单数</th>
                                <th>部门</th>
                                <th>经理</th>
                                <th>库存订单数</th>
                                <th>新配订单</th>
                                <th>分配订单数</th>
                            </tr> 
                        </thead>
                        <tbody>
                            <template v-for="(typeItem,index) in departmentTypeRateRecordList">
                                <tr class="tr-1">
                                    <td v-text="index+1"></td>
                                    <td v-text="typeItem.deptType"></td>
                                    <td v-text="typeItem.noneAssignCount"></td>
                                    <template v-for="(item,i) in typeItem.departmentInfoRecord" v-if="i==0">
                                        <td v-text="item.deptName"></td>
                                        <td v-text="item.managerName"></td>
                                        <td v-text="item.repertoryCount"></td>
                                        <td v-text="item.newAssignCount">新配订单</td>
                                        <td>
                                            <div class="layui-input-inline">
                                                <input type="text" class="layui-input" @input="formmort($event.srcElement ? $event.srcElement : $event.target, item, 'assignCount')">
                                            </div>
                                        </td>
                                        <!--<td>
                                            <div class="layui-form-item" style="margin:0;">
                                                <div class="layui-inline" style="margin-bottom:0;">
                                                    <div @click="reduce(item)" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                                        <i class="layui-icon">一</i>
                                                    </div>
                                                </div>
                                                <div class="layui-inline" style="margin-bottom:0;">
                                                    <input type="text" disabled style="text-align:center;" class="layui-input" v-model="item.autoRate">
                                                </div>
                                                <div class="layui-inline" style="margin:0;">
                                                    <div @click="add(item)" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                                        <i class="layui-icon">&#xe654;</i>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>-->
                                    </template>
                                </tr>
                                <template v-for="(item,k) in typeItem.departmentInfoRecord" v-if="k!=0">
                                    <tr class="tr-1">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td v-text="item.deptName"></td>
                                        <td v-text="item.managerName"></td>
                                        <td v-text="item.repertoryCount"></td>
                                        <td v-text="item.newAssignCount">新配订单</td>
                                        <td>
                                            <div class="layui-input-inline">
                                                <input type="text" class="layui-input" @input="formmort($event.srcElement ? $event.srcElement : $event.target, item, 'assignCount')">
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>委外</td>
                                    <td>/</td>
                                    <td v-text="typeItem.outsourceCount"></td>
                                    <td v-text="typeItem.newAssignCount">新配订单</td>
                                    <td>
                                        <div class="layui-input-inline">
                                            <input type="text" class="layui-input" @input="formmort($event.srcElement ? $event.srcElement : $event.target, typeItem, 'outsourceAssignCount')">
                                        </div>
                                    </td>
                                </tr>
                            </template>
                            <!--departmentTypeRateRecordList.length > 0-->
                            <tr v-show="false">
                                <td v-text="departmentTypeRateRecordList ? parseInt(departmentTypeRateRecordList.length) + 1 : 1"></td>
                                <td>过期订单</td>
                                <td v-text="output.overdueNoneAssignCount"></td>
                                <td>委外</td>
                                <td>/</td>
                                <td v-text="output.overdueRepertoryCount"></td>
                                <td v-text="output.overdueNewAssignCount"></td>
                                <td>
                                    <div class="layui-input-inline">
                                        <input type="text" class="layui-input" @input="formmort($event.srcElement ? $event.srcElement : $event.target, output, 'overdueAssignCount')">
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-show="!departmentTypeRateRecordList" style="text-align:center">暂无数据</div>
                    <div class="layui-form-item" style="text-align:center;">
                        <div class="layui-inline">
                            <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commit" >
                                <i class="layui-icon">&#xe605;</i> 保存
                            </button>
                            <button @click="reset()" type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                <i class="layui-icon">&#x1006;</i> 重置
                            </button>
                        </div>
                    </div>
            </form>
            <div>
                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
                    <legend>主管权限</legend>
                </fieldset>
                <form class="layui-form">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label" style="width:0;"></label>
                            <div class="layui-input-inline" style="width:20px;">
                                <input style="width:40px;" :checked ="isChecked" type="checkbox"lay-skin="primary" lay-filter="recycle">
                            </div>
                            <label class="layui-form-label" style="text-align:left;padding-left:0;width:200px;">不允许主管回收订单</label>
                        </div>
                    </div>
                </form>
            </div>     
            <div>
                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
                    <legend>黑名单规则</legend>
                </fieldset>
                <form class="layui-form">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label" style="width:120px;">借款人逾期还款 ＞</label>
                            <div class="layui-input-inline">
                                <input maxlength="4" v-model="blackDay" type="text" name="blackDay" lay-verify="required|number" autocomplete="off" class="layui-input">
                            </div>
                            <label class="layui-form-label" style="text-align:left;padding-left:0;width:200px;">天，拉入黑名单。</label>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label" style="width:120px;"></label>
                        <div class="layui-input-inline">
                            <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commitBlackDay">
                                <i class="layui-icon">&#xe605;</i> 保存
                            </button>
                            <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="resetBlackDay">
                                <i class="layui-icon">&#xe631;</i> 重置
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
                    <legend>订单逾期还款</legend>
                </fieldset>
                <form class="layui-form">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label" style="width:120px;">订单逾期还款 ＞</label>
                            <div class="layui-input-inline">
                                <input maxlength="4" v-model="OverdueDay" type="text" name="overdueDay" lay-verify="required|number" autocomplete="off" class="layui-input">
                            </div>
                            <label class="layui-form-label" style="text-align:left;padding-left:0;width:200px;">天，归入过期订单。</label>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label" style="width:120px;"></label>
                        <div class="layui-input-inline">
                            <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="commitOverdueDay">
                                <i class="layui-icon">&#xe605;</i> 保存
                            </button>
                            <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="resetOverdueDay">
                                <i class="layui-icon">&#xe631;</i> 重置
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {verify, date, page, Common} from 'js/layuiCommon';
import request from 'js/interface/request';
import {winLayer} from 'js/common';
export default {
    data () {
        return {
            isChecked: false,
            output: '', //派单总数据
            departmentTypeRateRecordList: [],
            blackDay: '', //黑名单天数
            OverdueDay: '', //逾期天数
            recordBlackDay: '', //重置黑名单天数
            recordOverdueDay: '', //重置过期天数
            catchOutput: '', //拷贝总数据
            catchList: [] // 拷贝的数据
        }
    },
    computed: {
    },
    created () {
    },
    mounted () {
        this.init();
        this.getDeptAutoRateList(); //获取部门派单比例
        this.getProjectBlackDay(); //获取黑名单天数
        this.getProjectOverdueDay(); //获取过期逾期天数
        this.uploadfile(); //导入订单
        this.supervisorJurisdiction(); //获取主管权限
    },
    methods: {
        init () {
            window.layui.use(['form'], () => {
                var form = window.layui.form();
                form.on('submit(commitBlackDay)', (data) => {
                    winLayer.loadOn(2);
                    request('/project/updateProjectBlackDay.html', data.field, (response) => {
                        console.log(response)
                        if (response.data.respCode === '000000') {
                            this.getProjectBlackDay();//获取黑名单天数
                        }
                        winLayer.loadOff();
                        Common.alert(response.data.respMsg);
                    }, (e) => {
                        console.log(e)
                    })
                    return false;
                });
                form.on('submit(commitOverdueDay)', (data) => {
                    console.log(data.field)
                    winLayer.loadOn(2);
                    request('/project/updateProjectOverdueDay.html', data.field, (response) => {
                        console.log(response.data.data)
                        if (response.data.respCode === '000000') {
                            this.getProjectOverdueDay();//获取逾期天数
                        }
                        winLayer.loadOff();
                        Common.alert(response.data.respMsg);
                    }, (e) => {
                        console.log(e)
                    })
                    return false;
                });
                form.on('checkbox(recycle)', (data) => {
                    // console.log(data.elem.checked); //是否被选中，true或者false
                    this.amend_supervisorJurisdiction(data.elem.checked)
                    form.render('checkbox');
                });
            });
             //验证(提交分配订单)
            verify.form('commit', (data) => {
                winLayer.loadOn(2);
                this.commit();
            });
        },
        //导入订单
        uploadfile () {
            let config = {
                isUpload: true
            }
            request('/upload/uploadFile.html', {elem: '#file', title: '导入逾期订单'}, (response) => {
                // console.log(response)
                if (response.data.message) {
                    Common.alert(response.data.message)
                } else {
                    Common.alert(response.respMsg)
                }
                winLayer.loadOff();
            }, (e) => {
                winLayer.loadOff();
                console.log(e)
            }, config)
        },
        //获取部门派单
        getDeptAutoRateList () {
            request('/project/collectionBatchAssignList.html', {}, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    this.output = response.data.data;
                    this.departmentTypeRateRecordList = this.output.collectionBatchAssignRecord;
                    this.catchList = window.$.extend(true, [], this.departmentTypeRateRecordList);
                    this.catchOutput = window.$.extend(true, [], this.output);
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                console.log(e)
            })
        },
        reduce (item) {
            let rate = parseInt(item.autoRate);
            rate -= 5;
            if (rate < 0) {
                rate = 0;
            }
            item.autoRate = rate + '%';
        },
        add (item) {
            let rate = parseInt(item.autoRate);
            rate += 5;
            if (rate > 100) {
                rate = 100;
            }
            item.autoRate = rate + '%';
        },
        //总监批量分配的判断
        commit () {
            // console.log(this.departmentTypeRateRecordList)
            //判断 同类型下，各部门分配订单数和委外分配订单数之和不能大于未分配订单数
            let arr = window.$.extend(true, [], this.departmentTypeRateRecordList);
            for (let i = 0; i < arr.length; i++) {
                let arr2 = arr[i].departmentInfoRecord;
                let number = 0;
                for (let k = 0; k < arr2.length; k++) {
                    if (arr2[k].assignCount === '') {
                        arr2[k].assignCount = 0;
                    }
                    number += parseInt(arr2[k].assignCount)
                }
                if (parseInt(arr[i].noneAssignCount) < parseInt(number) + parseInt(arr[i].outsourceAssignCount)) {
                    winLayer.loadOff();
                    Common.alert('同类型下，各部门分配订单数和委外分配订单数之和不能大于未分配订单数');
                    return false;
                }
            }
            if (parseInt(this.output.overdueNoneAssignCount) < parseInt(this.output.overdueAssignCount)) {
                winLayer.loadOff();
                Common.alert('过期订单分配，分配订单数不能大于未分配订单数');
                return false;
            }
            //数据格式化
            let collectionBatchAssignRecord = [];
            for (let i = 0; i < arr.length; i++) {
                let obj = {
                    deptType: arr[i].deptType,
                    outsourceAssignCount: arr[i].outsourceAssignCount ? arr[i].outsourceAssignCount : 0
                }
                let arr2 = arr[i].departmentInfoRecord;
                let departmentInfoRecord = [];
                for (let k = 0; k < arr2.length; k++) {
                    let data = {
                        deptId: arr2[k].deptId,
                        assignCount: arr2[k].assignCount ? arr2[k].assignCount : 0
                    }
                    if (parseInt(data.assignCount) !== 0 && data.assignCount !== '') {
                        departmentInfoRecord.push(data)
                    }
                }
                obj.departmentInfoRecord = departmentInfoRecord;
                collectionBatchAssignRecord.push(obj)
            }
            // console.log(collectionBatchAssignRecord)
           // 是否全部为空
            for (let i = 0; i < collectionBatchAssignRecord.length; i++) {
                if (collectionBatchAssignRecord[i].departmentInfoRecord.length === 0 && parseInt(collectionBatchAssignRecord[i].outsourceAssignCount) === 0) {
                    // console.log(i)
                    collectionBatchAssignRecord.splice(i, 1);
                    i = i - 1;
                }
            }
            //&& this.output.overdueAssignCount === 0
            if (collectionBatchAssignRecord.length === 0 && this.output.overdueAssignCount === 0) {
                winLayer.loadOff();
                Common.alert('同类型下各部门分配订单数和委外分配订单数之和及过期订单分配数不能同时为0');
                return false;
            }
            let obj = {
                overdueAssignCount: this.output.overdueAssignCount,
                collectionBatchAssignRecord: collectionBatchAssignRecord
            }
            console.log(obj)
            request('/project/collectionBatchAssign.html', obj, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    Common.alert(response.data.respMsg);
                    window.$('#commit_reset')[0].reset()
                    this.getDeptAutoRateList(); // 更新派单数量
                } else {
                    Common.alert(response.data.respMsg);
                }
                setTimeout(() => {
                    winLayer.loadOff();
                }, 500)
            }, (e) => {
                winLayer.loadOff();
                console.log(e)
            })
        },
        //获取黑名单逾期天数
        getProjectBlackDay () {
            request('/project/getProjectBlackDay.html', {}, (response) => {
                // console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    this.blackDay = response.data.data.blackDay;
                    this.recordBlackDay = this.blackDay;
                } else {
                    Common.alert(response.data.respMsg);
                }
                winLayer.loadOff();
            }, (e) => {
                console.log(e)
            })
        },
        //获取过期逾期天数
        getProjectOverdueDay () {
            request('/project/getProjectOverdueDay.html', {}, (response) => {
                // console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    this.OverdueDay = response.data.data.overdueDay;
                    this.recordOverdueDay = this.OverdueDay;
                } else {
                    Common.alert(response.data.respMsg);
                }
                winLayer.loadOff();
            }, (e) => {
                console.log(e)
            })
        },
         //主管权限
        supervisorJurisdiction () {
            request('/project/getProjectRecycleFlag.html', {}, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    let output = response.data.data;
                    if (output.recycleFlag === 0) {
                        this.isChecked = true;
                    } else {
                        this.isChecked = false;
                    }
                } else {
                    Common.alert(response.data.respMsg);
                }
                this.initialize(); //初始化
            }, (e) => {
                console.log(e)
            })
        },
        //修改主管权限
        amend_supervisorJurisdiction (isChecked) {
            let obj = {
                recycleFlag: isChecked ? 0 : 1
            }
            console.log(obj)
            request('/project/updateProjectRecycleFlag.html', obj, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    Common.alert(response.data.respMsg);
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                console.log(e)
            })
        },
        //输入格式限制
        formmort (that, item, name) {
            let value = window.$(that);
            value.val(value.val().replace(/[^\d]/g, ''));
            //多位时，首位不为0，和不能连续输入0
            if (value.val() !== '' && value.val().length ===2) {
                value.val(parseInt(value.val()));
            }
            item[name] = value.val();
            console.log(this.output)
        },
        //恢复数据
        reset () {
            this.departmentTypeRateRecordList = window.$.extend(true, [], this.catchList);
            this.output = window.$.extend(true, [], this.catchOutput);
        },
        //重置黑名单
        resetBlackDay () {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.blackDay = '';
                    this.blackDay = this.recordBlackDay;
                }, 0)
            })
        },
        //过期订单天数
        resetOverdueDay () {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.OverdueDay = '';
                    this.OverdueDay = this.recordOverdueDay;
                }, 0)
            })
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
