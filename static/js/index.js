let $ = layui.$
let url = 'http://127.0.0.1:8001/'


function choosePath() {
    pywebview.api.choose_path().then(function (response) {
        let folderInput = $('#wechat-files-folder')
        folderInput.val(response.path)
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