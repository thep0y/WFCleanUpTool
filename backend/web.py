from typing import List

from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from pydantic import BaseModel

from backend.settings import TEMPLATES_DIR, STATIC_DIR
from backend.handlers.file_handler import delete_files

app = FastAPI()

app.mount("/static", StaticFiles(directory=STATIC_DIR), name='static')

templates = Jinja2Templates(directory=TEMPLATES_DIR)


class CleanModel(BaseModel):
    work_dir: str
    wx_id: str
    folders: List[str]


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse('index.html', {"request": request})


@app.post('/clean/')
async def clean(item: CleanModel):
    try:
        delete_files(item.work_dir, item.wx_id, item.folders)
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=e.args[0])
