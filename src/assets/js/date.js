var date = {
    //时间控件 dataStart开始的id dataEnd结束的id isShowTime时间控件是否有时分秒
    date_input: function (dateStart, dateEnd, reset) {
        window.layui.use('laydate', () => {
            var laydate = window.layui.laydate;
            var start = {
                // min: laydate.now(), //layui的今天
                min: '', //格式2017-07-20
                max: '',
                istoday: false,
                choose: function(datas) {
                    // end.min = datas; //开始日选好后，重置结束日的最小日期
                    end.start = datas //将结束日的初始值设定为开始日
                }
            };
            var end = {
                min: '',
                max: '',
                istoday: false,
                choose: function(datas) {
                    // start.max = datas; //结束日选好后，重置开始日的最大日期
                }
            };
            //isShowTime时间控件是否有时分秒
            if (reset) {
                start.min = '';
                start.max = '';
                end.min = '';
                end.max = '';
            }
            if (dateStart) {
                document.getElementById(dateStart).onclick = function() {
                    start.elem = this;
                    laydate(start);
                }
            }
            if (dateEnd) {
                document.getElementById(dateEnd).onclick = function() {
                    end.elem = this
                    laydate(end);
                }
            }
        });
    }
}
export {
    date
}