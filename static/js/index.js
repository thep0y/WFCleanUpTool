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
                let html = '<form class="layui-form" id="clean" action>' +
                    '<div class="layui-form-item">' +
                    '<label class="layui-form-label">选择用户</label>' +
                    '<div class="layui-input-block">'

                response.users.forEach(function (element, index) {
                    console.log(element.folders_size)
                    if (index === 0) {
                        html += '<input type="radio" data-wx-id="' + element.wx_id + '" name="user" value="thep0y" title=\'<img src="' + element.logo + '" class="logo">' + element.username + '\' checked="">'
                    } else {
                        html += '<input type="radio" data-wx-id="' + element.wx_id + '" name="user" value="thep0y" title=\'<img src="' + element.logo + '" class="logo">' + element.username + '\'>'
                    }
                })

                html += '</div></div>'

                // TODO 如果只有一个用户的文件夹，直接显示清理文件选项，否则默认选择第一个用户
                html += '<div class="layui-form-item">' + '<label class="layui-form-label">待清理内容</label>' + '<div class="layui-input-block" id="clean-up-files">'

                let fisrtUserfoldersSize = response.users[0].folders_size
                for (var i in fisrtUserfoldersSize) {
                    // console.log(i, fisrtUserfoldersSize[i])
                    if (fisrtUserfoldersSize[i]) {
                        html += '<input type="checkbox" name="folders" value="' + i + '" title="' + folders[i] + ' (' + fisrtUserfoldersSize[i] + ' MB)"></input>'
                    }
                }
                html += '</div></div>'

                html += '<div class="layui-form-item"><div class="layui-input-block">' + '<button class="layui-btn" lay-submit="" lay-filter="to-clean">开始清理</button></div></div>'

                html += '</form>'

                html += '<script>'

                html += 'layui.form.render();'

                html += '$("#clean").submit(function(a){a.preventDefault(),workdir=$("#wechat-files-folder").val(),checkedWxID=$(\'input:radio[name="user"]:checked\')[0].dataset.wxId,folders=new Array,$(\'input:checkbox[name="folders"]:checked\').each(function(a){folders[a]=$(this).val()}),$.ajax({type:"POST",url:url+"clean/",data:JSON.stringify({work_dir:workdir,wx_id:checkedWxID,folders:folders})}).done(function(a){console.log(a)})});'

                html += '</script>'

                funcs.html(html)

                layer.close(index);
            }
        });
    })
}

$('#clean').submit(function (event) {
    event.preventDefault()

    let workdir = $('#wechat-files-folder').val()
    let checkedWxID = $('input:radio[name="user"]:checked')[0].dataset.wxId

    let folders = new Array()
    $('input:checkbox[name="folders"]:checked').each(function (i) {
        folders[i] = $(this).val()
    })

    $.ajax({
            type: "POST",
            url: url + 'clean/',
            data: JSON.stringify({
                work_dir: workdir,
                wx_id: checkedWxID,
                folders: folders
            })
        })
        .done(function (response) {
            console.log(response)
        })
})

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