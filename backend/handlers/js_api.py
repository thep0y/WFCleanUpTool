import webview


class Api:
    def choose_path(self):
        path = webview.windows[0].create_file_dialog(webview.FOLDER_DIALOG)
        # TODO 返回已选择的文件夹里的分类文件
        if path and len(path) > 0:
            response = {'path': path[0]}
            return response
