let $ = layui.$
let url = 'http://127.0.0.1:8001/'


function choosePath() {
    pywebview.api.choose_path().then(function (response) {
        console.log(response)
        let msg = '请确认微信文件夹路径是否正确：\n\n' + response.path
        layer.confirm(msg, {
            title: '确认',
            btn: ['确认', '取消'],
            yes: function (index) {
                let folderInput = $('#wechat-files-folder')
                folderInput.val(response.path)

                let funcs = $('#functions')
                let html = '<form class="layui-form" action="">' +
                    '<div class="layui-form-item">' +
                    '<label class="layui-form-label">选择用户</label>' +
                    '<div class="layui-input-block">'

                response.users.forEach(function (element, index) {
                    console.log(element, index)
                    if (index === 0) {
                        html += '<input type="radio" name="user" value="thep0y" title=\'<img src="' + element.logo + '" class="logo">' + element.username + '\' checked="">'
                    } else {
                        html += '<input type="radio" name="user" value="thep0y" title=\'<img src="' + element.logo + '" class="logo">' + element.username + '\'>'
                    }
                })

                html += '</div></div></form>'

                html += '<script>layui.form.render();</script>'

                funcs.html(html)

                layer.close(index);
            }
        });
    })
}

layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element', 'form', 'colorpicker'], function () {
    var laydate = layui.laydate //日期
        ,
        laypage = layui.laypage //分页
        ,
        layer = layui.layer //弹层
        ,
        table = layui.table //表格
        ,
        carousel = layui.carousel //轮播
        ,
        upload = layui.upload //上传
        ,
        element = layui.element //元素操作 等等...
        ,
        form = layui.form //元素操作 等等...
    ;

});