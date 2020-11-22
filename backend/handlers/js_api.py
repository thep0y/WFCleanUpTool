import os

import webview

from backend.handlers.file_handler import find_wx_username_and_logo, all_folders_size


class Api:
    def choose_path(self):
        path = webview.windows[0].create_file_dialog(webview.FOLDER_DIALOG)
        # TODO 返回已选择的文件夹里的分类文件
        if path and len(path) > 0:
            folders = os.listdir(path[0])
            folders.remove('All Users')
            folders.remove('Applet')
            users = []
            for wx_id in folders:
                user = {}
                username, logo = find_wx_username_and_logo(path[0], wx_id)
                if username:
                    user['username'] = username
                if logo:
                    user['logo'] = logo
                user['wx_id'] = wx_id
                user['folders_size'] = all_folders_size(path[0], wx_id)
                if user:
                    users.append(user)

            response = {'path': path[0], 'users': users}

            return response
