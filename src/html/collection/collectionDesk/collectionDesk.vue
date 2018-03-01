<template>
  <div>
    <div class='container'>
        <!--
        <div @click="bb('aa')" >aa</div>
        <audio controls ref ="aa">
            <source src="http://101.200.189.178/monitor/17-10/26/1509005451.1654.mp3" type="audio/mpeg">
            Your browser does not support this audio format.
        </audio>
        -->
        <div class="animate">
            <div style="margin-bottom:10px;">
                <div class="layui-btn layui-btn-small layui-btn-normal" @click="next(1)">
                    <i class="layui-icon" >&#xe619;</i> 上一条
                </div>
                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="next(2)">
                    <i class="layui-icon" >&#xe61a;</i> 下一条
                </div>
            </div>
            <div class="layui-collapse">
                <div class="layui-colla-item" v-show="arbitionDetail && arbitionDetail.caseProgress">
                    <h2 class="layui-colla-title">仲裁信息</h2>
                    <div class="layui-colla-content layui-show">
                        <form class="layui-form">
                            <div class="layui-form-item" style="margin-bottom:0;">

                                <div class="layui-inline">
                                    <label class="layui-form-label">仲裁状态：</label>
                                    <div class="layui-input-inline">
                                        <p v-text="arbitionDetail.caseStatus" style="border:0;" disabled type="text" class="layui-input padding0"></p>
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label">案件进程：</label>
                                    <div class="layui-input-inline">
                                        <p v-text="arbitionDetail.caseProgress" style="border:0;" disabled type="text" class="layui-input padding0"></p>
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label">更新时间：</label>
                                    <div class="layui-input-inline">
                                        <p v-text="arbitionDetail.modifyDate" style="border:0;" disabled type="text" class="layui-input padding0"></p>
                                    </div>
                                </div>

                                <!-- <div class="layui-inline" style="float:right;">
                                    <div @click="goToHistory" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                        历史记录
                                    </div>
                                </div> -->

                            </div>
                        </form>
                    </div>
                </div>
                <div class="layui-colla-item" v-show="exceptionDetail">
                    <h2 class="layui-colla-title">异常处理</h2>
                    <div class="layui-colla-content layui-show">
                        <form class="layui-form">
                            <div class="layui-form-item" style="margin-bottom:0;">
                                <div class="layui-inline">
                                    <label class="layui-form-label">有效性：</label>
                                    <div class="layui-input-inline">
                                        <p v-text="exceptionDetail.enabled" style="border:0;" disabled type="text" class="layui-input padding0"></p>
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label">审核时间：</label>
                                    <div class="layui-input-inline">
                                        <p v-text="exceptionDetail.createTime" style="border:0;" disabled type="text" class="layui-input padding0"></p>
                                    </div>
                                </div>
                                <div class="layui-inline" style="float:right;">
                                    <div @click="goToHistory" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                        历史记录
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item layui-form-text">
                                <label class="layui-form-label">异常描述：</label>
                                <div class="layui-input-block">
                                    <textarea name="privateKey" style="border:0;color:#444;padding-top:9px;padding-left:0;" readonly v-model="exceptionDetail.exceptionsComment" class="layui-textarea"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">订单信息</h2>
                    <div class="layui-colla-content layui-show">
                        <form class="layui-form">
                            <div class="layui-form-item" style="margin-bottom:0;">
                                <div class="layui-inline">
                                    <label class="layui-form-label label">订单编号：</label>
                                    <div class="layui-input-inline">
                                        <p v-text="detail.orderId" style="border:0;min-width:400px; max-width:800px;" disabled type="text" class="layui-input padding0"></p>
                                    </div>
                                </div>
                                <div v-if="!exceptionDetail" class="layui-inline" style="float:right;">
                                    <div @click="goToHistory" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                        历史记录
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label label">订单状态：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="detail.collectionSts" style="border:0;" disabled type="text" class="layui-input padding0">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label label">协催：</label>
                                    <div v-show="detail.helpFlg==1" class="layui-input-inline">
                                        <input value="是" style="border:0;" disabled type="text" class="layui-input padding0">
                                    </div>
                                    <div v-show="detail.helpFlg==0" class="layui-input-inline">
                                        <input value="否" style="border:0;" disabled type="text" class="layui-input padding0">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label label">欠款人：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="detail.borrowerName" style="border:0;" disabled type="text" class="layui-input padding0">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label label">证件号：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="detail.idNumber" style="border:0;" disabled type="text" class="layui-input padding0">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label label">手机号：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="detail.borrowerMobile" style="border:0;" disabled type="text" class="layui-input padding0">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label label">应还款：</label>
                                    <div class="layui-input-inline">
                                        <input :value="detail.repayAmout ? (detail.repayAmout/100).toFixed(2) : 0" style="border:0;" disabled type="text" class="layui-input padding0">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label label">还款时间：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="detail.repayDate" style="border:0;" disabled type="text" class="layui-input padding0">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label label">最后催收时间：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="detail.lastCallTime" style="border:0;" disabled type="text" class="layui-input padding0">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label label">展期金额</label>
                                    <div class="layui-input-inline">
                                        <input :value="detail.extensionAmout ? (detail.extensionAmout/100).toFixed(2) : 0" style="border:0;" disabled type="text" class="layui-input padding0">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label label">订单倒计时：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="detail.collectionCountDown" style="border:0;" disabled type="text" class="layui-input padding0">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label label">委外：</label>
                                    <div v-show="detail.outsourceType==0" class="layui-input-inline">
                                        <input value="否" style="border:0;" disabled type="text" class="layui-input padding0">
                                    </div>
                                    <div v-show="detail.outsourceType==1" class="layui-input-inline">
                                        <input value="是" style="border:0;" disabled type="text" class="layui-input padding0">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label label">复借：</label>
                                    <div class="layui-input-inline">
                                        <input v-model="detail.userFlag" style="border:0;" disabled type="text" class="layui-input padding0">
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div v-if="detail.showSts" class="layui-form-item">
                            <div v-if="manager!='manager'" @click="requestAssistance" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                <i class="layui-icon">&#xe645;</i> 请求协催
                            </div>
                            <div @click="report" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                <i class="layui-icon">&#xe645;</i> 报告异常
                            </div>
                            <div @click="reportBlack" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                <i class="layui-icon">&#xe645;</i> 报告黑名单
                            </div>
                            <div @click="outsource" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" v-if="false">
                                <i class="layui-icon">&#xe645;</i> 提交委外
                            </div>
                            <div v-if="manager!='manager'" @click="payment" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                <i class="layui-icon">&#xe645;</i> 提交已还款
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">呼叫台</h2>
                    <div class="layui-colla-content layui-show">
                        <div class="clear">
                            <table class="layui-table" style="width:auto;float:left;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div id="hoverBox" style="min-height:500px;">
                                                <div v-show="borrowerInfo" style="">
                                                    <div class="layui-colla-item" v-show="borrowerInfo.order">
                                                        <h2 class="layui-colla-title" style="text-align:left;">{{borrowerInfo.order.title}}</h2>
                                                        <div style="text-align:left;" class="layui-colla-content layui-show layui-form-item">
                                                            <div class="layui-inline" v-for="item in borrowerInfo.order.data">
                                                                <label style="width:100px;" class="layui-form-label" v-text="item.key"></label>
                                                                <div class="layui-input-inline">
                                                                    <input readonly style="border:0;" v-model="item.value" type="text" class="layui-input">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="layui-colla-item" v-show="borrowerInfo.info">
                                                        <h2 class="layui-colla-title" style="text-align:left;">{{borrowerInfo.info.title}}</h2>
                                                        <div style="text-align:left;" class="layui-colla-content layui-show layui-form-item">
                                                            <div class="layui-inline" v-for="item in borrowerInfo.info.data">
                                                                <label style="width:100px;" class="layui-form-label" v-text="item.key"></label>
                                                                <div class="layui-input-inline">
                                                                    <input readonly style="border:0;" v-model="item.value" type="text" class="layui-input">
                                                                </div>
                                                            </div>
                                                            <div class="layui-inline" v-show="output.projectCode == 'ddhs'">
                                                                <label style="width:100px;" class="layui-form-label">寄回快递单号</label>
                                                                <div class="layui-input-inline">
                                                                    <input readonly style="border:0;" v-model="borrowerInfo.express_no" type="text" class="layui-input">
                                                                </div>
                                                            </div>
                                                            <div class="layui-inline" v-show="output.projectCode == 'ddhs'">
                                                                <label style="width:100px;" class="layui-form-label">单号提交时间</label>
                                                                <div class="layui-input-inline">
                                                                    <input readonly style="border:0;" v-model="borrowerInfo.express_created_at" type="text" class="layui-input">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="layui-colla-item" v-show="borrowerInfo.icloud">
                                                        <h2 class="layui-colla-title" style="text-align:left;">{{borrowerInfo.icloud.title}}</h2>
                                                        <div style="text-align:left;" class="layui-colla-content layui-show layui-form-item">
                                                            <div class="layui-inline" v-for="item in borrowerInfo.icloud.data">
                                                                <label style="width:100px;" class="layui-form-label" v-text="item.key"></label>
                                                                <div class="layui-input-inline">
                                                                    <input readonly style="border:0;" v-model="item.value" type="text" class="layui-input">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="layui-colla-item" v-show="borrowerInfo.oftenContact">
                                                        <h2 class="layui-colla-title" style="text-align:left;">{{borrowerInfo.oftenContact.title}}</h2>
                                                        <div style="text-align:left;" class="layui-colla-content layui-show layui-form-item">
                                                            <div class="layui-inline" v-for="item in borrowerInfo.oftenContact.data">
                                                                <label style="width:100px;" class="layui-form-label" v-text="item.key"></label>
                                                                <div class="layui-input-inline">
                                                                    <input readonly style="border:0;" v-model="item.value" type="text" class="layui-input">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="layui-colla-item" v-show="borrowerInfo.contact">
                                                        <h2 class="layui-colla-title" style="text-align:left;">{{borrowerInfo.contact.title}}</h2>
                                                        <div style="text-align:left;" class="layui-colla-content layui-show layui-form-item">
                                                            <div class="layui-inline" v-for="item in borrowerInfo.contact.data" @click="copy(item)">
                                                                <label style="width:100px;" class="layui-form-label" v-text="item.key"></label>
                                                                <div class="layui-input-inline">
                                                                    <input readonly style="border:0;" v-model="item.value" type="text" class="layui-input">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="layui-colla-item" v-show="borrowerInfo.bank">
                                                        <h2 class="layui-colla-title" style="text-align:left;">{{borrowerInfo.bank.title}}</h2>
                                                        <div style="text-align:left;" class="layui-colla-content layui-show layui-form-item">
                                                            <div class="layui-inline" v-for="item in borrowerInfo.bank.data">
                                                                <label style="width:100px;" class="layui-form-label" v-text="item.key"></label>
                                                                <div class="layui-input-inline">
                                                                    <input readonly style="border:0;" v-model="item.value" type="text" class="layui-input">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="layui-colla-item" v-show="borrowerInfo.identify">
                                                        <h2 class="layui-colla-title" style="text-align:left;">照片信息</h2>
                                                        <div style="text-align:left;" class="layui-colla-content layui-show layui-form-item">
                                                            <div class="layui-inline" v-for="item in borrowerInfo.identify.data">
                                                                <label style="width:100px;" class="layui-form-label" v-text="item.key"></label>
                                                                <img :src="item.value" style="width:300px;" alt="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="layui-colla-item" v-show="borrowerInfo.task">
                                                        <h2 class="layui-colla-title" style="text-align:left;">数聚魔盒</h2>
                                                        <div style="text-align:left;" class="layui-colla-content layui-show layui-form-item">
                                                            <div class="layui-inline" v-for="item in borrowerInfo.task.data">
                                                                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="open(item)" style="float:right;  margin-bottom:10px;">
                                                                    <i class="layui-icon" ></i> 查看更多信息
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td id="formbox" style="width:520px;position:relative;">
                                            <form id="form" class="layui-form">
                                                <div class="layui-form fl">
                                                    <div class="layui-form-item right">
                                                        <div class="layui-inline">
                                                            <label class="layui-form-label">被催收人：</label>
                                                            <div class="layui-input-inline">
                                                                <input name="callName"  placeholder="请填写被催收人" lay-verify="required" type="text" class="layui-input" v-model="By_collection">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="layui-form-item right">
                                                        <div class="layui-inline">
                                                            <label class="layui-form-label">电话：</label>
                                                            <div class="layui-input-inline">
                                                                <input name="callTel"  lay-verify="required|phone"  placeholder="请填写催收人电话"  type="text" class="layui-input" v-model="phone">
                                                            </div>
                                                        </div>
                                                        <div class="layui-inline" v-show="detail.showSts">
                                                             <div @click="call_phone()" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom call">
                                                                <i class="layui-icon iconfont">&#xe671;</i> 呼叫
                                                            </div>
                                                            <div @click="out_phone()" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" style="color:red">
                                                                <i class="layui-icon iconfont">&#xe601;</i> 挂机
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="layui-form-item right">
                                                        <div class="layui-inline">
                                                            <label class="layui-form-label">催收人：</label>
                                                            <div class="layui-input-inline">
                                                                <input id="staffName" name="staffName" v-model="staffName" lay-verify="required" placeholder="请填写催收人姓名" type="text" class="layui-input" disabled style="background:#e3e3e3;border:0;">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="layui-form-item right">
                                                        <div class="layui-inline">
                                                            <label class="layui-form-label">标签：</label>
                                                            <div class="layui-input-inline">
                                                                <select v-if="stsCollectionTagsRecordList.length>0" name="resultTag">
                                                                    <template v-for="(item,index) in stsCollectionTagsRecordList">
                                                                        <option v-if="index==0" :value="item.tagId" v-text="item.tagContent" selected></option>
                                                                        <option v-else :value="item.tagId" v-text="item.tagContent"></option>
                                                                    </template>
                                                                </select>
                                                            </div>
                                                            <div class="layui-input-inline">
                                                                <select v-if="relationCollectionTagsRecordList.length>0" name="resultTagRelation">
                                                                    <template v-for="(item,index) in relationCollectionTagsRecordList">
                                                                        <option v-if="index==0" :value="item.tagId" v-text="item.tagContent" selected></option>
                                                                        <option v-else :value="item.tagId" v-text="item.tagContent"></option>
                                                                    </template>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="layui-form-item right" v-show="false">
                                                        <div class="layui-inline">
                                                             <input name="callContent" v-model="callId" type="text" class="layui-input">
                                                        </div>
                                                    </div>
                                                    <div class="layui-form-item right">
                                                        <div class="layui-inline">
                                                            <label class="layui-form-label">备注：</label>
                                                            <div class="layui-input-inline">
                                                                <textarea style="width:400px;" lay-verify="required" name="comment" placeholder="请输入内容" class="layui-textarea"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="detail.showSts" class="layui-form-item">
                                                    <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="addCollectionLogsInfo">
                                                        <i class="layui-icon">&#xe605;</i> 确定
                                                    </button>
                                                    <button @click="resetCall" type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                                                        <i class="layui-icon">&#x1006;</i> 取消
                                                    </button>
                                                </div>
                                            </form>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="history" class="layui-colla-item">
                    <h2 class="layui-colla-title">催收历史</h2>
                    <div class="layui-colla-content layui-show">
                        <table class="layui-table" style="width:auto;" id="table">
                            <colgroup>
                                <col width="200">
                                <col width="400">
                                <col width="400">
                                <col width="400">
                                <col width="400">
                                <!--<col width="400">
                                <col width="400">-->
                                <col width="400">
                                <col width="400">
                                <col width="400">
                                <col width="400">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>状态标签</th>
                                    <th>关系标签</th>
                                    <th>催收时间</th>
                                    <th>被催收人</th>
                                    <th>电话号码</th>
                                    <!--<th>通话时长</th>-->
                                    <th>播放</th>
                                    <th>所在部门</th>
                                    <th>所在组</th>
                                    <th>催收人</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in collectionLogsRecord">
                                    <td v-text="index+1"></td>
                                    <td v-text="item.resultTag"></td>
                                    <td v-text="item.resultTagRelation"></td>
                                    <td v-text="item.callTime"></td>
                                    <td v-text="item.callName"></td>
                                    <td v-text="item.callTel"></td>
                                    <!--<td v-text="item.callDuration"></td>-->
                                    <td>
                                        <div @click="getrecord('mp3' + index, item)" class="audio_btn">
                                            <i v-show="item.audio == 1 && item.callContent" class="layui-icon">&#xe652;</i>
                                            <i v-show="item.audio == 2 && item.callContent" class="layui-icon">&#xe651;</i>
                                        </div>
                                        <audio :id="'mp3' + index" v-show="false" controls>
                                            <source :src="item.url" type="audio/mpeg">
                                            Your browser does not support this audio format.
                                        </audio>
                                    </td>
                                    <td v-text="item.deptName"></td>
                                    <td v-text="item.groupName"></td>
                                    <td v-text="item.staffName" style="width:120px;"></td>
                                    <td v-text="item.comment" style="width:15%"></td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-show="!collectionLogsRecord" style="text-align:center">暂无数据</div>
                    </div>
                </div>
            </div>
        </div>
        <div id="hoverToast" class="hoverToast"></div>
    </div>
    <formLayer :isshow="formLayer.isshow" :selectData="formLayer.blacklistReasonRecord"  @reset="formLayer.isshow=false;" @formLayerCommit="formLayerCommit"></formLayer>
  </div>
</template>
<script>
import { verify, date, page, Common } from "js/layuiCommon";
import request from "js/interface/request";
import { tree, winLayer, tab } from "js/common";
import formLayer from "components/formLayer";
export default {
  components: {
    formLayer
  },
  data() {
    return {
      formLayer: {
        isshow: false,
        blacklistReasonRecord: null,
        desc: ""
      },
      arbitionDetail: "",
      aa: "", // 打电话
      //YRD201708291714548816652
      collectionId:
        Common.getQueryString("collectionId") || "DDHS201801031557213644868",
      detail: {},
      output: "", //大json总数据
      borrowerInfo: {
        bank: "", // 银行卡信息
        contact: "", //"联系人"
        icloud: "", //"iCloud信息"
        identify: "", //身份证正面照
        info: "", //"用户信息",
        oftenContact: "", // "常用联系人TOP"
        order: "", //订单信息
        task: "", //数聚魔盒
        express_no: "", //手机寄回的快递单号字段
        express_created_at: "" //单号提交的时间字段
      },
      By_collection: "", //被催收人
      phone: "", // 被催收人电话
      relationCollectionTagsRecordList: [], // 状态标签
      stsCollectionTagsRecordList: [], // 关系标签
      //
      collectionLogsRecord: [],
      manager: false, // 经理没有权限协催
      staffName:
        JSON.parse(window.localStorage.getItem("userInfo")).userRealName || "",
      exceptionDetail: "", //订单详情委外
      callId: "", //呼叫标识
      ip: ""
      // bank: '', // 银行卡信息
      // contact: '', //"联系人"
      // icloud: '', //"iCloud信息"
      // info: '', //"用户信息",
      // oftenContact: '', // "常用联系人TOP"
      // order: '' //订单信息
    };
  },
  computed: {},
  created() {
    this.manager = window.localStorage.getItem("roleName");
    this.getDetail(); //订单详情
    //ip赋值
    try {
      window.getIPs(ip => {
        console.log("aa");
        this.ip = ip;
      });
    } catch (e) {
      console.log(e);
    }
  },
  mounted() {
    this.init();
    this.listenWindowScroll(); //催收台滑动
    this.getCollectionTagsList(); //标签
  },
  methods: {
    // 报告黑名单
    formLayerCommit(data) {
      if ((data.textareaName + '').length == 0) {
        Common.alert('上报原因不能为空');
        return;
      }
      let obj = {
        collectionId: this.collectionId,
        reasonId: data.selectName,
        blackComment: data.textareaName
      };
      winLayer.loadOn(0, 0);
      request(
        "/collectiondesk/addBlackReport.html",
        obj,
        response => {
          this.formLayer.isshow = false;
          Common.alert(response.data.respMsg);
          winLayer.loadOff();
        },
        e => {
          winLayer.loadOff();
          console.log(e);
        }
      );
    },
    listenHover() {
      this.$nextTick(() => {
        let $ = window.$;
        let $inputs = $("#hoverBox").find("input");
        $inputs.hover(
          e => {
            e = e || window.event;
            if (e.target.value.length > 22) {
              let $toast = $("#hoverToast");
              $toast.css({
                left: e.clientX,
                top: e.clientY + 20,
                display: "block"
              });
              $toast.text(e.target.value);
            }
          },
          e => {
            $("#hoverToast").css({ display: "none" });
          }
        );
      });
    },
    //催收台滑动
    listenWindowScroll() {
      let $ = window.$;
      let $win = $(window);
      let $box = $("#formbox");
      let $form = $("#form");
      // let $history = $('#history');
      this.$nextTick(() => {
        $(window).scroll(e => {
          let wintop = $win.scrollTop();
          let boxtop = $box.offset().top;
          // let histop = $history.offset().top;
          // console.log(wintop, boxtop, histop, parseInt($form.css('top')) + $form.height())
          if (wintop > boxtop) {
            $form.css("top", wintop - boxtop + 20 + "px");
          }
          // if ($form.css('top') > histop) {
          //     $form.css('top', histop - 800 + 'px');
          // }
        });
      });
    },
    //保存提交信息
    init() {
      this.$nextTick(() => {
        window.layui.use("form", () => {
          var form = window.layui.form();
          // 呼叫台(提交)
          form.on("submit(addCollectionLogsInfo)", data => {
            data.field.collectionId = this.collectionId;
            this.addCollectionLogsInfo(data.field); //添加催收历史记录
            return false;
          });
          form.render();
        });
        window.layui.use("element", function() {
          var element = window.layui.element();
        });
      });
    },
    render() {
      this.$nextTick(() => {
        window.layui.use(["form", "element"], () => {
          var form = window.layui.form();
          var element = window.layui.element();
          form.render();
        });
      });
    },
    //添加催收历史
    addCollectionLogsInfo(data) {
      request(
        "/collectiondesk/addCollectionLogsInfo.html",
        data,
        response => {
          if (response.data.respCode === "000000") {
            Common.alert(response.data.respMsg);
            window.$("#form")[0].reset();
            //清空催收台数据
            this.phone = "";
            this.By_collection = "";
            this.collectionList(); // 更新历史记录
            this.staffName =
              JSON.parse(window.localStorage.getItem("userInfo"))
                .userRealName || "";
          } else {
            Common.alert(response.data.respMsg);
          }
        },
        e => {
          console.log(e);
        }
      );
    },
    // 订单信息
    getDetail(data) {
      request(
        "/collection/detail.html",
        { collectionId: this.collectionId },
        response => {
          if (response.data.respCode === "000000") {
            this.detail = response.data.data;
            this.exceptionDetail = this.detail.exceptionDetail
              ? this.detail.exceptionDetail
              : "";

            this.arbitionDetail = this.detail.arbitionDetail
              ? this.detail.arbitionDetail
              : "";
              console.log('arbitionDetail', this.arbitionDetail)
            //催收台欠款人和电话赋值
            this.By_collection = this.detail.borrowerName;
            this.phone = this.detail.borrowerMobile;
            this.render();
          } else {
            Common.alert(response.data.respMsg);
          }
          if (!data) {
            this.getBorrowerInfo();
          }
        },
        e => {
          console.log(e);
        }
      );
    },
    //催收台联系人的信息和好友电话
    getBorrowerInfo() {
      request(
        "/collectiondesk/getBorrowerInfo.html",
        { collectionId: this.collectionId },
        response => {
          this.output = response.data.data;
          if (response.data.respCode === "000000") {
            if (!response.data.data.borrowerInfo) {
              return false;
            }
            let borrowerInfo = JSON.parse(response.data.data.borrowerInfo);
            if (borrowerInfo.message) {
              return false;
            }
            // bank: '', // 银行卡信息
            if (borrowerInfo.bank) {
              this.borrowerInfo.bank = borrowerInfo.bank;
            }
            // contact: '', //"联系人"
            if (borrowerInfo.contact) {
              this.borrowerInfo.contact = borrowerInfo.contact;
            }
            // icloud: '', //"iCloud信息"
            if (borrowerInfo.icloud) {
              this.borrowerInfo.icloud = borrowerInfo.icloud;
            }
            // identify: '', //身份证正面照
            if (borrowerInfo.identify) {
              this.borrowerInfo.identify = borrowerInfo.identify;
            }
            // info: '', //"用户信息",
            if (borrowerInfo.info) {
              this.borrowerInfo.info = borrowerInfo.info;
            }
            // oftenContact: '', // "常用联系人TOP"
            if (borrowerInfo.oftenContact) {
              this.borrowerInfo.oftenContact = borrowerInfo.oftenContact;
            }
            // order: '' //订单信息
            if (borrowerInfo.order) {
              this.borrowerInfo.order = borrowerInfo.order;
            }
            //task 数据魔盒
            if (borrowerInfo.task) {
              this.borrowerInfo.task = borrowerInfo.task;
            }
            //手机寄回的快递单号字段
            if (borrowerInfo.express_no) {
              this.borrowerInfo.express_no = borrowerInfo.express_no;
            }
            //单号提交的时间字段
            if (borrowerInfo.express_created_at) {
              this.borrowerInfo.express_created_at =
                borrowerInfo.express_created_at;
            }
            this.listenHover();
            this.render(); // 初始化
          } else {
            Common.alert(response.data.respMsg);
          }
        },
        e => {
          console.log(e);
        }
      );
    },
    // 标签
    getCollectionTagsList() {
      request(
        "/collectiondesk/getCollectionTagsList.html",
        { collectionId: this.collectionId },
        response => {
          // console.log(response.data)
          if (response.data.respCode === "000000") {
            this.relationCollectionTagsRecordList = response.data.data
              .relationCollectionTagsRecordList
              ? response.data.data.relationCollectionTagsRecordList
              : "";
            this.stsCollectionTagsRecordList = response.data.data
              .stsCollectionTagsRecordList
              ? response.data.data.stsCollectionTagsRecordList
              : "";
            // console.log(this.collectionTagsRecordList)
            this.render();
          } else {
            Common.alert(response.data.respMsg);
          }
          this.collectionList();
        },
        e => {
          console.log(e);
        }
      );
    },
    // 催收历史记录
    collectionList() {
      request(
        "/collectionLogs/list.html",
        { collectionId: this.collectionId },
        response => {
          if (response.data.respCode === "000000") {
            this.collectionLogsRecord = response.data.data.collectionLogsRecord;
            //设置一个audio的属性性开关
            if (this.collectionLogsRecord) {
              this.collectionLogsRecord.map(item => {
                this.$set(item, "audio", 1);
                this.$set(item, "url", "");
              });
            }
          } else {
            Common.alert(response.data.respMsg);
          }
        },
        e => {
          console.log(e);
        }
      );
    },
    // 请求协催
    requestAssistance() {
      winLayer.confirm("是否确认请求协催", () => {
        request(
          "/collectiondesk/requestAssistance.html",
          { collectionId: this.collectionId },
          response => {
            if (response.data.respCode === "000000") {
              Common.alert(response.data.respMsg);
              this.getDetail(true);
              // window.location.reload();
            } else {
              Common.alert(response.data.respMsg);
            }
          },
          e => {
            console.log(e);
          }
        );
      });
    },
    // 报告异常
    report() {
      winLayer.textarea(data => {
        let obj = {
          exceptionsComment: data,
          collectionId: this.collectionId
        };
        request(
          "/collectiondesk/addException.html",
          obj,
          response => {
            if (response.data.respCode === "000000") {
              Common.alert(response.data.respMsg);
              // window.location.reload();
              this.getDetail(true);
            } else {
              Common.alert(response.data.respMsg);
            }
          },
          e => {
            console.log(e);
          }
        );
      });
    },
    // 黑名单原因
    reportBlack() {
      winLayer.loadOn(0, 0);
      request(
        "/collectiondesk/getBlacklistReason.html",
        null,
        response => {
          if (response.data.respCode === "000000") {
            this.formLayer.blacklistReasonRecord =
              response.data.data.blacklistReasonRecord;
            this.formLayer.isshow = true;
          }
          winLayer.loadOff();
        },
        e => {
          winLayer.loadOff();
          console.log(e);
        }
      );
    },
    // 委外
    outsource() {
      winLayer.confirm("是否委外", () => {
        let obj = {
          collectionId: this.collectionId
        };
        request(
          "/collectiondesk/tagOutsourceType.html",
          obj,
          response => {
            if (response.data.respCode === "000000") {
              Common.alert(response.data.respMsg);
              this.getDetail(true);
            } else {
              Common.alert(response.data.respMsg);
            }
          },
          e => {
            console.log(e);
          }
        );
      });
    },
    //置为已还款
    payment() {
      winLayer.confirm("是否已还款", () => {
        let obj = {
          collectionId: this.collectionId
        };
        console.log(obj);
        request(
          "/collectiondesk/preCompletionSts.html",
          obj,
          response => {
            console.log(response.data.data);
            if (response.data.respCode === "000000") {
              Common.alert(response.data.respMsg);
              this.getDetail(true); //更新订单状态
            } else {
              Common.alert(response.data.respMsg);
            }
          },
          e => {
            console.log(e);
          }
        );
      });
    },
    //复制联系人
    copy(item) {
      this.By_collection = item.key;
      this.phone = item.value;
    },
    //上一条
    next(number) {
      console.log(this.collectionId);
      request(
        "/collectiondesk/collectionOrder.html",
        { collectionId: this.collectionId },
        response => {
          console.log(response.data);
          if (response.data.respCode === "000000") {
            let output = response.data.data;
            console.log(output);
            if (!output) {
              return false;
            }
            if (number === 1) {
              if (!output.collectionIdUp) {
                Common.alert("已经是第一条了");
                return false;
              }
              this.collectionId = output.collectionIdUp;
            } else if (number === 2) {
              if (!output.collectionIdDown) {
                Common.alert("已经是最后一条了");
                return false;
              }
              this.collectionId = output.collectionIdDown;
            }
            //获取新的订单号请求
            this.getDetail(); //订单详情
            this.init();
            this.listenWindowScroll(); //催收台滑动
            this.getCollectionTagsList();
          } else {
            Common.alert(response.data.respMsg);
          }
        },
        e => {
          console.log(e);
        }
      );
    },
    //呼叫电话
    call_phone() {
      if (!this.phone) {
        Common.alert("被催收电话不能为空");
        return false;
      }
      winLayer.loadOn(0, 0);
      let obj = {
        telNum: this.phone,
        iP: this.ip
      };
      console.log(obj);
      request(
        "/call/MakeCall.html",
        obj,
        response => {
          console.log(response.data.data);
          if (response.data.respCode === "000000") {
            let output = response.data.data;
            this.callId = output.callId;
          } else {
            Common.alert(response.data.respMsg);
          }
          winLayer.loadOff();
        },
        e => {
          winLayer.loadOff();
          console.log(e);
        }
      );
    },
    //挂断电话
    out_phone() {
      let obj = {
        iP: this.ip
      };
      request(
        "/call/HangupCall.html",
        obj,
        response => {
          console.log(response);
          if (response.data.respCode === "000000") {
            winLayer.loadOff();
            Common.alert("成功挂断");
          } else {
            Common.alert(response.data.respMsg);
          }
        },
        e => {
          console.log(e);
        }
      );
    },
    //获取录音地址
    getrecord(id, item) {
      let obj = {
        callId: item.callContent
      };
      console.log(obj);
      request(
        "/call/GetRecordAddress.html",
        obj,
        response => {
          console.log(response.data.data);
          if (response.data.respCode === "000000") {
            let output = response.data.data;
            if (output.url) {
              item.url = output.url;
              this.play_audio(id, item);
            } else {
              Common.alert("暂无录音");
            }
          } else {
            Common.alert(response.data.respMsg);
          }
        },
        e => {
          console.log(e);
        }
      );
    },
    //表格的音频控制
    play_audio(id, item) {
      //1 暂停中 2 播放
      var audio = document.getElementById(id);
      var table = document.getElementById("table");
      audio.load();
      // 表格下所有音频暂停
      var tableAudio = window.$("audio");
      tableAudio.map((itm, value) => {
        //判断是否有在播放的音频，有就暂停， 避免没有音频播放暂停报错
        if (!value.paused) {
          value.pause();
        }
      });
      //判断播放暂停和图标切换
      if (item.audio === 1) {
        this.collectionLogsRecord.map(item => {
          item.audio = 1;
        });
        item.audio = 2;
        audio.currentTime = 0; // 重头开始播放
        audio.play();
        audio.addEventListener(
          "ended",
          function() {
            console.log("完成");
            item.audio = 1;
          },
          false
        );
      } else {
        this.collectionLogsRecord.map(item => {
          item.audio = 1;
        });
        item.audio = 1;
        audio.pause();
      }
    },
    //跳转数据魔盒
    open(item) {
      window.parent.open(
        "https://portal.shujumohe.com/main/customerReport/" + item.value
      );
    },
    //测试音频状态
    bb(a) {
      let audio = this.$refs[a];
      console.log("缓冲对象" + audio.buffered.length);
      console.log("音频时长" + audio.duration);
      switch (audio.networkState) {
        case 0:
          console.log("网络状态：音频/视频尚未初始化" + audio.networkState);
          break;
        case 1:
          console.log(
            "网络状态：音频/视频是活动的且已选取资源，但并未使用网络" +
              audio.networkState
          );
          break;
        case 2:
          console.log("网络状态：浏览器正在下载数据" + audio.networkState);
          break;
        case 3:
          console.log("网络状态：未找到音频/视频来源" + audio.networkState);
          break;
      }
      switch (audio.readyState) {
        case 0:
          console.log("就绪状态:没有关于音频是否就绪的信息" + audio.readyState);
          break;
        case 1:
          console.log("就绪状态:关于音频就绪的元数据" + audio.readyState);
          break;
        case 2:
          console.log(
            "就绪状态: 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒" +
              audio.readyState
          );
          break;
        case 3:
          console.log(
            "就绪状态: 当前及至少下一帧的数据是可用的" + audio.readyState
          );
          break;
        case 4:
          console.log("就绪状态: 可用数据足以开始播放" + audio.readyState);
          break;
      }
      console.log("音频查找" + audio.seeking);
      if (audio.canPlayType("audio/mpeg") !== "") {
        console.log("支持MP3");
      }
    },
    //跳转历史记录
    goToHistory() {
      tab.tabAdd(
        "历史记录",
        "./collection/history.html?collectionId=" + this.collectionId
      );
    },
    resetCall() {
      this.$nextTick(() => {
        setTimeout(() => {
          var s = this.staffName;
          this.staffName = "";
          this.staffName = s;
          //催收台欠款人和电话赋值
          this.By_collection = this.detail.borrowerName;
          this.phone = this.detail.borrowerMobile;
        }, 0);
      });
    }
  },
  filters: {}
};
</script>
