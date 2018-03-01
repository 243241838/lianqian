var checkbox = {
    checkAll: function (tableId) {
        window.layui.use('form', () => {
            var form = window.layui.form();
            form.on('checkbox(allChoose)', (data) => {
                window.$('#' + tableId).find('input[type="checkbox"]').each((index, item) => {
                    item.checked = data.elem.checked;
                });
                form.render('checkbox');
            });
        });
    },
    getSelected: function (data) {
        return data;
    }
}
export {
    checkbox
}