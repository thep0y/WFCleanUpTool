import os
import re
import shutil

from typing import Optional, Tuple, Dict, List


def find_wx_username_and_logo(
        wx_files_folder: str,
        wx_id: str) -> Tuple[Optional[str], Optional[str]]:
    acc_info_path = os.path.join(wx_files_folder, wx_id, 'config',
                                 'AccInfo.dat')

    with open(acc_info_path, 'rb') as f:
        content = f.read()

    content = content.decode('utf-8', errors='ignore')

    # 删除\xXX字符
    # pat = re.compile(r'[\x00-\x1f\x80-\xff]+')

    # username = re.search(r'@(.*?)f', content)
    username = re.search(r'\x12\x06(.*?)\x1a', content)

    if username.groups() and len(username.groups()) > 0:
        # username = re.sub(pat, '', username.group(1))
        username = username.group(1)
        logo_url = re.search(r'http://.*?/132', content)
        return username, logo_url.group(0)
    else:
        return None, None


def all_folders_size(wx_files_folder: str,
                     wx_id: str) -> Dict[str, Optional[float]]:
    size = {}
    base_dir = os.path.join(wx_files_folder, wx_id)

    msg_path = os.path.join(base_dir, 'Msg')
    msg_size = folder_size(msg_path)
    size['Msg'] = msg_size if msg_size else None

    file_storage_path = os.path.join(base_dir, 'FileStorage')

    for file in os.listdir(file_storage_path):
        file_absolute_path = os.path.join(file_storage_path, file)
        if os.path.isdir(file_absolute_path):
            current_dir_size = folder_size(file_absolute_path)
            size[file] = current_dir_size if current_dir_size else None

    return size


def folder_size(folder: str) -> float:
    size = 0
    for root, dirs, files in os.walk(folder):
        size += sum(
            [os.path.getsize(os.path.join(root, name)) for name in files])
    size = size / (1024 * 1024)  # m
    return round(size, 3)  # 保留三位小数，以兆为单位返回


def delete_files(wx_files_folder: str, wx_id: str, folders: List[str]):
    for folder in folders:
        if folder == 'Msg':
            for file in os.listdir(os.path.join(wx_files_folder, wx_id,
                                                'Msg')):
                if os.path.isdir(file):
                    shutil.rmtree(file)
                else:
                    os.remove(file)
        else:
            for file in os.listdir(
                    os.path.join(wx_files_folder, wx_id, 'FileStorage',
                                 folder)):
                if os.path.isdir(file):
                    shutil.rmtree(file)
                else:
                    os.remove(file)


if __name__ == "__main__":
    # find_wx_username_and_logo('/home/thepoy/Documents/WeChat Files', 'wxid_mnuz9ij3ljy022')
    print(
        all_folders_size('/home/thepoy/Documents/WeChat Files',
                         'wxid_mnuz9ij3ljy022'))
