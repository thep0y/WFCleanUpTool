# WFCleanUpTool
WeChat files clean up tool，用Python写的PC端微信文件清理工具。

### 简介
此工具用Python语言开发，使用的工具为PyWebview和FastAPI。

Windows上用Pyinstaller打包成exe。

### 使用
这只是一个简单的`PyWebview`示例项目，通常来说，使用flask即可完成后端设计，但由于我正在学习fastapi，所以后端采用的是fastapi搭建。

将项目 clone 至本地
```shell
git clone https://github.com/thep0y/WFCleanUpTool.git
```

进入项目目录
```shell
cd WFCleanUpTool
```

安装项目所需包
```shell
pip install -r requirements.txt
```

即可运行项目
```shell
python main.py
```


~~当然，也可以下载release，直接运行。~~

### 当前问题
不知为何，在打包exe后，fastapi报导包的错误：
```
Traceback (most recent call last):
  File "main.py", line 15, in <module>
  File "c:\venvs\gui\lib\site-packages\PyInstaller\loader\pyimod03_importers.py", line 493, in exec_module
    exec(bytecode, module.__dict__)
  File "backend\web.py", line 3, in <module>
  File "c:\venvs\gui\lib\site-packages\PyInstaller\loader\pyimod03_importers.py", line 493, in exec_module
    exec(bytecode, module.__dict__)
  File "fastapi\__init__.py", line 7, in <module>
  File "c:\venvs\gui\lib\site-packages\PyInstaller\loader\pyimod03_importers.py", line 493, in exec_module
    exec(bytecode, module.__dict__)
  File "fastapi\applications.py", line 3, in <module>
  File "c:\venvs\gui\lib\site-packages\PyInstaller\loader\pyimod03_importers.py", line 493, in exec_module
    exec(bytecode, module.__dict__)
  File "fastapi\routing.py", line 7, in <module>
  File "c:\venvs\gui\lib\site-packages\PyInstaller\loader\pyimod03_importers.py", line 493, in exec_module
    exec(bytecode, module.__dict__)
  File "fastapi\params.py", line 4, in <module>
  File "pydantic\__init__.py", line 2, in init pydantic.__init__
ImportError: cannot import name dataclasses
[10200] Failed to execute script main
```
未能找到解决之法。
