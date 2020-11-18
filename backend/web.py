import webview

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from backend.settings import TEMPLATES_DIR, STATIC_DIR

app = FastAPI()

app.mount("/static", StaticFiles(directory=STATIC_DIR), name='static')

templates = Jinja2Templates(directory=TEMPLATES_DIR)


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse('index.html', {"request": request})


@app.post('/choose/path')
def choose_path():
    print(webview.windows)
    path = webview.windows[0].create_file_dialog(webview.FOLDER_DIALOG)
    return {'path': path}
