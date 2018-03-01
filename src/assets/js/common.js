import {Common} from 'js/layuiCommon';
var tree = {
    addTreeEvent: function (tableId) {
        // this.$nextTick(() => {// });
        let $ = window.$;
        $(tableId).find('.tr-1').each((index, item) => {
            $(item).children('td').eq(0).css('text-align', 'left');
            $(item).children('td').eq(0).unbind('click');
            $(item).children('td').eq(0).bind('click', function () {
                let that = $(this).parent().next('tr');
                let none = false;
                // 下面是隐藏状态
                if (that.css('display') === 'none') {
                    none = true;
                }
                function fn (that) {
                    if (that.length === 0) {
                        return;
                    }
                    if (!none) {
                        that.hide();
                    } else {
                        if (that.hasClass('tr-2')) {
                            that.show();
                        }
                    }
                    fn(that.next('tr:not(.tr-1)'));
                }
                if (!that.hasClass('tr-1')) {
                    fn(that)
                }
            })
        })
        $(tableId).find('.tr-2').each((index, item) => {
            $(item).children('td').eq(0).css({'text-align': 'left', 'padding-left': '45px'});
            $(item).children('td').eq(0).unbind('click');
            $(item).children('td').eq(0).bind('click', function () {
                let that = $(this).parent().next('tr');
                let none = false;
                if (that.css('display') === 'none') {
                    none = true;
                }
                function fn (that) {
                    if (that.length === 0) {
                        return;
                    }
                    if (!none) {
                        that.hide();
                    } else {
                        if (that.hasClass('tr-3')) {
                            that.show();
                        }
                    }
                    fn(that.next('tr:not(.tr-2, .tr-1)'));
                }
                if (!that.hasClass('tr-2') && !that.hasClass('tr-1')) {
                    fn(that)
                }
            })
        })
        $(tableId).find('.tr-3').each((index, item) => {
            $(item).children('td').eq(0).css({'text-align': 'left', 'padding-left': '75px'});
            $(item).children('td').eq(0).unbind('click');
            $(item).children('td').eq(0).bind('click', function () {
                let that = $(this).parent().next('tr');
                let none = false;
                if (that.css('display') === 'none') {
                    none = true;
                }
                function fn (that) {
                    if (that.length === 0) {
                        return;
                    }
                    if (!none) {
                        that.hide();
                    } else {
                        if (that.hasClass('tr-4')) {
                            that.show();
                        }
                    }
                    fn(that.next('tr:not(.tr-3, .tr-2, .tr-1)'));
                }
                if (!that.hasClass('tr-3') && !that.hasClass('tr-2') && !that.hasClass('tr-1')) {
                    fn(that)
                }
            })
        })
        $(tableId).find('.tr-4').each((index, item) => {
            $(item).children('td').eq(0).css({'text-align': 'left', 'padding-left': '105px'});
        })
    }
}
var winLayer = {
    textarea: function (fn) {
        window.layui.use('layer', () => { // 独立版的layer无需执行这一句
            var $ = window.layui.jquery;
            var layer = window.layui.layer; // 独立版的layer无需执行这一句
            layer.open({
                type: 1, // 此处以iframe举例
                title: '提示',
                shade: 0.2,
                btnAlign: 'c',
                content: '<div><div style="text-align:center;padding:20px;">' + '<textarea style="width:320px;" name="report" placeholder="请输入内容" class="layui-textarea"></textarea>' + '</div></div>',
                btn: ['确认', '取消'], // 只是为了演示
                yes: function (index, arr) {
                    let content = $(arr[0]).find('textarea').val();
                    if (content.length === 0) {
                        winLayer.toast('请输入报告内容');
                        return;
                    }
                    if (typeof fn === 'function') {
                        fn(content);
                    }
                    layer.close(index);
                },
                btn2: function (index) {
                    layer.close(index);
                },
                zIndex: layer.zIndex, // 重点1
                success: (layero) => {
                    layer.setTop(layero);// 重点2
                }
            });
        });
    },
    toast: function (data, fn) {
        window.layui.use('layer', function () { // 独立版的layer无需执行这一句
            var $ = window.layui.jquery;
            var layer = window.layui.layer; // 独立版的layer无需执行这一句
            layer.open({
                type: 1, // 此处以iframe举例
                title: '提示',
                shade: 0.2,
                btnAlign: 'c',
                content: '<div style="width:300px;"><div style="text-align:center;padding:20px;">' + data + '</div></div>',
                btn: ['知道啦'], // 只是为了演示
                yes: function (index) {
                    layer.close(index);
                    if (typeof fn === 'function') {
                        fn();
                    }
                },
                zIndex: layer.zIndex, // 重点1
                success: function (layero) {
                    layer.setTop(layero);// 重点2
                }
            });
        });
    },
    confirm: function (data, fn) {
        var info = '是否确认删除';
        if (data) {
            info = data;
        }
        window.layui.use('layer', function () { // 独立版的layer无需执行这一句
            var $ = window.layui.jquery;
            var layer = window.layui.layer; // 独立版的layer无需执行这一句
            layer.open({
                type: 1, // 此处以iframe举例
                title: '提示',
                shade: 0.2,
                btnAlign: 'c',
                content: '<div style="width:300px;"><div style="text-align:center;padding:20px;">' + info + '</div></div>',
                btn: ['确认', '取消'], // 只是为了演示
                yes: function (index) {
                    layer.close(index);
                    if (typeof fn === 'function') {
                        fn();
                    }
                },
                btn2: function (index) {
                    layer.close(index);
                    // layer.closeAll();
                },
                zIndex: layer.zIndex, // 重点1
                success: function (layero) {
                    layer.setTop(layero);// 重点2
                }
            });
        });
    },
    // 0 1 2
    loadOn: function (type, number) {
        let lucency = number;
        if (!number) {
            lucency = 0.1;
        }
        if (number === 0) {
            lucency = 0;
        }
        window.layui.use(['layer', 'form'], function() {
            window.____loadName____ = window.layer.load(type, {shade: lucency});
        });
    },
    loadOff: function () {
        window.layui.use(['layer', 'form'], function() {
            var layer = window.layui.layer
            layer.close(window.____loadName____);
            setTimeout(() => {
                layer.close(window.____loadName____);
            }, 1000)
        });
    }
}
var tab = {
    tabAdd: function (name, url) {
        window.parent.layui.use('element', () => {
            var element = window.parent.layui.element();
            var $ = window.parent.$;
            var $tabContent = $(window.parent.document).find('.layui-tab-content.clildFrame');
            var $tabTitle = $(window.parent.document).find('#demo .layui-tab-title');
            var has = false;
            function change () {
                // let iframe =$('<iframe src=' + url + '></iframe>')
                element.tabChange('demo', url);
                // $tabContent.find('.layui-tab-item.layui-show').html(iframe);
            }
            if ($('.layui-tab-content.clildFrame').children().length === 4) {
                Common.alert('浏览器最多支持打开4个标签，请先关闭其他标签');
                return false;
            }
            function add () {
                element.tabAdd('demo', {
                    title: name,
                    content: '<iframe style="display" src=' + url + '></iframe>',
                    id: url
                })
                // $tabContent.find('.layui-tab-item iframe').each(function () {
                //     $(this).parent().text($(this).attr('src'));
                // })
                change();
            }
            $tabTitle.children('li').each(function () {
                if ($(this).attr('lay-id') === url) {
                    has = true;
                }
            })
            if (has) {
                change();
            } else {
                add();
            }
        });
    },
    tabDelete: function (id) {
        window.parent.layui.use('element', () => {
            var $ = window.parent.layui.jquery;
            var element = window.parent.layui.element();
            element.tabDelete('demo', id);
        });
    }
}
export {
    tree, winLayer, tab
}
