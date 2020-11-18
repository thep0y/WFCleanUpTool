#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: thepoy
# @Email:  thepoy@163.com
# @File:   main.py
# @Created time:   2020-11-15 21:17:47
# @Last Modified by:   thepoy
# @Last Modified time: 2020-11-15 21:17:47
import logging
import webview
import uvicorn

from multiprocessing import Process

from backend.handlers.js_api import Api
from backend.web import app

logger = logging.getLogger(__name__)


def server_start(port: int = 8001):
    uvicorn.run(app, port=port)


def create_window():
    api = Api()
    webview.create_window("微信文件清理工具",
                          "http://127.0.0.1:8001/",
                          js_api=api,
                          height=400,
                          resizable=False)

    webview.start(gui='qt', debug=True)


if __name__ == '__main__':
    # 由于 uvicorn 只能要主线程中运行， 所以需要单独为其开一个子进程
    p = Process(target=server_start)
    p.daemon = True
    p.start()

    create_window()
