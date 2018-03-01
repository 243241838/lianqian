<template>
    <div class="container">
        <div class="animate">
            <form class="layui-form">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">标签</label>
                        <div class="layui-input-inline">
                            <input type="text" name="tagContent" maxlength="100"  placeholder="标签内容" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">标签状态</label>
                        <div class="layui-input-inline">
                            <select name="enabled">
                                <option value="all">全部</option>
                                <option value="1">正常</option>
                                <option value="0">被禁用</option>
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">标签类型</label>
                        <div class="layui-input-inline">
                            <select name="tagType">
                                <option value="">全部</option>
                                <option value="">全部</option>
                                <option value="1">状态标签</option>
                                <option value="2">关系标签</option>
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="search">
                            <i class="layui-icon" style="display:inline-block;transform:scale(0.9);">&#xe615;</i> 查询
                        </button>
                        <button type="reset" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" @click="getList()">
                            <i class="layui-icon">&#xe631;</i> 重置
                        </button>
                    </div>
                </div>
            </form>
            <form class="layui-form">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <div @click="isShowAdd=true;tagContent = '';tagId='';" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                            <i class="layui-icon">&#xe654;</i> 新增
                        </div>
                    </div>
                </div>
            </form>
            <table class="layui-table" style="width:auto;">
                <colgroup>
                    <col width="200">
                    <col width="400">
                    <col width="800">
                    <col width="400">
                </colgroup>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>操作项</th>
                        <th>标签</th>
                        <th>状态</th>
                    </tr> 
                </thead>
                <tbody>
                    <template v-for="(item,index) in collectionTagsRecord">
                        <tr>
                            <td v-text="(index+1)+((pageIndex-1)*pageSize)"></td>
                            <td>
                                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit"  @click.stop="isShowAdd=true;tagContent=item.tagContent;tagId=item.tagId;">编辑</div>
                                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius edit" v-show="item.enabled==0" style="margin-left:0;" @click.stop="updateEnable(item, 1)">恢复</div>
                                <div class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom radius forbidden"  v-show="item.enabled==1" style="margin-left:0;" @click.stop="updateEnable(item, 0)">禁用</div>
                            </td>
                            <td v-text="item.tagContent"></td>
                            <td v-if="item.enabled==1">正常</td>
                            <td v-else-if="item.enabled==0">被禁用</td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div v-show="!collectionTagsRecord" style="text-align:center">暂无数据</div>
            <div id="pagination" class="padd20" style="text-align:right"></div>
        </div>
        <div class="layui-layer custom_alert" v-show="isShowAdd">
            <div class="layui-layer-title">新增</div>
            <span class="layui-layer-setwin" @click="isShowAdd=false;">
                <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
            </span>
            <form class="layui-form">
              <div class="layui-form-item">
                        <label class="layui-form-label">标签类型</label>
                        <div class="layui-input-inline">
                            <select name="tagType">
                                <option value="1">状态标签</option>
                                <option value="2">关系标签</option>
                            </select>
                        </div>
                </div>
                <div class="layui-form-item">
                        <label class="layui-form-label">标签</label>
                        <div class="layui-input-inline" style="width:auto;">
                            <textarea v-model="tagContent" name="tagContent" lay-verify="required" placeholder="请输入标签内容" class="layui-textarea" style="width:300px;"></textarea>
                        </div>
                </div>
                <div class="layui-form-item" style="text-align:center;">
                    <div class="layui-inline" style="margin-right:0;">
                        <button class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom" lay-submit lay-filter="tagContent">
                            <i class="layui-icon">&#xe605;</i> 确定
                        </button>
                        <div type="reset" @click="isShowAdd=false;" class="layui-btn layui-btn-small layui-btn-normal layui-btn-custom">
                            <i class="layui-icon">&#x1006;</i> 取消
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import {verify, date, page, Common} from 'js/layuiCommon';
import request from 'js/interface/request';
export default {
    data () {
        return {
            pageIndex: 1,
            pageSize: 10,
            collectionTagsRecord: [],
            // 点击分页不更新
            isPaginationInit: true,
            // 新增弹框
            isShowAdd: false,
            tagContent: '',
            tagId: ''
        }
    },
    computed: {
    },
    created () {
        this.init();
    },
    mounted () {
        this.use();
    },
    methods: {
        init () {
            let obj = {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                tagContent: '',
                enabled: '',
                tagType: ''
            }
            this.isPaginationInit = true;
            this.getList(obj)
        },
        use () {
            this.$nextTick(() => {
                window.layui.use('form', () => {
                    var form = window.layui.form();
                    form.render();
                });
            })
            verify.form('search', (data) => {
                if (data.field.enabled === 'all') {
                    data.field.enabled = '';
                }
                // 初始化请求参数
                data.field.pageSize = this.pageSize;
                data.field.pageIndex = 1;
                this.isPaginationInit = true;
                console.log(data.field)
                this.getList(data.field)
            });
            verify.form('tagContent', (data) => {
                if (this.tagId) {
                    data.field.tagId = this.tagId;
                    request('/tag/updateInfo.html', data.field, (response) => {
                        console.log(response)
                        if (response.data.respCode === '000000') {
                            Common.alert(response.data.respMsg);
                            this.isShowAdd = false;
                            this.collectionTagsRecord.map((item) => {
                                if (item.tagId === this.tagId) {
                                    item.tagContent = this.tagContent;
                                }
                            })
                        } else {
                            Common.alert(response.data.respMsg);
                        }
                    }, (e) => {
                        console.log(e)
                    })
                } else {
                    request('/tag/add.html', data.field, (response) => {
                        console.log(response)
                        if (response.data.respCode === '000000') {
                            Common.alert(response.data.respMsg);
                            this.isShowAdd = false;
                            this.init();
                        } else {
                            Common.alert(response.data.respMsg);
                        }
                    }, (e) => {
                        console.log(e)
                    })
                }
            })
        },
        getList (obj) {
            let tableData = ''
            if (obj) {
                tableData = obj;
            }
            if (!obj) {
                let data = {
                    pageIndex: 1,
                    pageSize: 10
                }
                tableData = data
                this.pageSize = 10;
                this.isPaginationInit = true;
            }
            request('/tag/list.html', tableData, (response) => {
                console.log(response.data.data)
                if (response.data.respCode === '000000') {
                    this.pageIndex = tableData.pageIndex;
                    this.collectionTagsRecord = response.data.data.collectionTagsRecord;
                    if (this.isPaginationInit) {
                        this.isPaginationInit = false;
                        this.addPagination(response.data.data.page, response.data.data.totalCount, tableData);
                    }
                    if (!this.collectionTagsRecord) {
                        Common.alert(response.data.respMsg);
                    }
                } else {
                    Common.alert(response.data.respMsg);
                }
            }, (e) => {
                console.log(e)
            })
        },
        //添加分页
        addPagination (pages, totalCount, obj) {
            let config = {
                that: this,
                pagination: 'pagination',
                pages: pages, // 总页数
                totalCount: totalCount, //总条数
                pageIndexName: 'pageIndex',
                pageSizeName: 'pageSize',
                firstName: 'isPaginationInit',
                requestMethod: 'getList'
            }
            page.table_laypage(config, obj);
        },
        // 禁用、恢复
        updateEnable (item, sts) {
            let obj = {
                tagId: item.tagId,
                enabled: sts
            }
            console.log(obj)
            request('/tag/updateEnable.html', obj, (response) => {
                console.log(response)
                if (response.data.respCode === '000000') {
                    window.layer.msg(response.data.respMsg);
                    item.enabled = sts;
                } else {
                    window.layer.msg(response.data.respMsg);
                }
            }, (e) => {
                console.log(e)
            })
        },
        edit (item) {
            // console.log(item)
            // request('/tag/updateInfo.html', data.field, (response) => {
            //     console.log(response)
            //     if (response.data.respCode === '000000') {
            //         Common.alert(response.data.respMsg);
            //         this.isShowAdd = false;
            //         this.init();
            //     } else {
            //         Common.alert(response.data.respMsg);
            //     }
            // }, (e) => {
            //     console.log(e)
            // })
        }
    },
    filters: {
    }
}
</script>
