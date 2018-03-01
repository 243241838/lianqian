var page = {
    //  let config = {
    //     that: this,
    //     pagination: 'pagination',
    //     pages: 'pages',
    //     pageIndexName: 'pageIndexName',
    //     pageSizeName: 'pageSize',
    //     firstName: 'first',
    //     requestMethod: 'getTable',
    //     totalCount: totalCount // 总计数
    // }
    table_laypage: function (config, requestParams) {
        var first = true;
        window.layui.use(['laypage', 'form'], () => {
            var laypage = window.layui.laypage;
            var form = window.layui.form();
            var $ = window.$;
            //调用分页
            laypage({
                cont: config.pagination,
                pages: config.pages, //得到总页数 设置分页数
                first: 1,
                last: config.pages,
                curr: requestParams[config.pageIndexName], //当前页设置
                skip: true,
                jump: (obj) => {
                    requestParams[config.pageIndexName] = obj.curr;
                    console.log(obj.first)
                    if (first) {
                        first = false;
                    } else {
                        if (config.requestMethod) {
                            config.that[config.requestMethod](requestParams); // 更新表格
                        }
                    }
                    $('.layui-laypage-skip').attr('max', config.pages);
                    $('.layui-laypage-skip').blur(function () {
                        if (parseInt($(this).val()) > parseInt(config.pages)) {
                            $(this).val(config.pages)
                        } else if (parseInt($(this).val()) < 1) {
                            $(this).val(1)
                        }
                    })
                    if (config.totalCount) {
                        $('#' + config.pagination).find('.layui-box.layui-laypage.layui-laypage-default').eq(0).append('<span style="border:0;padding:0 5px">共' + config.totalCount + '条</span>');
                        // console.log($('#layui-laypage-0'))
                    }
                    //添加分页一页几条设置
                    if (config.pageSizeName) {
                        $('#' + config.pagination).find('.layui-box.layui-laypage.layui-laypage-default').eq(0).append('<select class="page_select" lay-filter="group"><option value="10">10</option><option value="20">20</option><option value="50">50</option><option value="100">100</option></select>');
                        //下拉框
                        this.select_on(config, requestParams);
                    }
                }
            })
        });
    },
    select_on: function (config, requestParams) {
        let select = window.$('#' + config.pagination).find('.page_select').eq(0);
        select.val(config.that[config.pageSizeName]); // 下拉框设置默认值;
        select.change(function() {
            //表格传递数据改动
            requestParams[config.pageSizeName] = this.value; //页面分页条数
            requestParams[config.pageIndexName] = 1;//页码为1
            //页面变量改动
            config.that[config.pageSizeName] = this.value; //一页几条改变(页面变量修改)
            config.that[config.firstName] = true; //分页重置
            if (config.requestMethod) {
                config.that[config.requestMethod](requestParams); // 更新表格
            }
        })
    }
}
export {
    page
}