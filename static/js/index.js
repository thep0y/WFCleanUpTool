let $ = layui.$
let url = 'http://127.0.0.1:8001/'
let folders = {
    'Msg': '聊天记录',
    'File': '文件',
    'Image': '图片',
    'Fav': '收藏',
    'TempFromPhone': '来自手机的临时文件',
    'General': '通用/其他',
    'Cache': '缓存',
    'Video': '视频',
    'Temp': '临时文件',
    'CustomEmotion': '用户表情',
}


function choosePath() {
    pywebview.api.choose_path().then(function (response) {
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
                    console.log(element.folders_size)
                    if (index === 0) {
                        html += '<input type="radio" name="user" value="thep0y" title=\'<img src="' + element.logo + '" class="logo">' + element.username + '\' checked="">'
                    } else {
                        html += '<input type="radio" name="user" value="thep0y" title=\'<img src="' + element.logo + '" class="logo">' + element.username + '\'>'
                    }
                })

                html += '</div></div>'

                // TODO 如果只有一个用户的文件夹，直接显示清理文件选项，否则默认选择第一个用户
                html += '<div class="layui-form-item">' + '<label class="layui-form-label">待清理内容</label>' + '<div class="layui-input-block" id="clean-up-files">'

                let fisrtUserfoldersSize = response.users[0].folders_size
                for (var i in fisrtUserfoldersSize) {
                    // console.log(i, fisrtUserfoldersSize[i])
                    if (fisrtUserfoldersSize[i]) {
                        html += '<input type="checkbox" name="' + i + '" title="' + folders[i] + ' (' + fisrtUserfoldersSize[i] + ' MB)"></input>'
                    }
                }
                html += '</div></div>'

                html += '</form>'

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