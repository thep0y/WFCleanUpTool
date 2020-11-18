import os
import re

from typing import Optional, Tuple


def find_wx_username_and_logo(wx_files_folder: str, wx_id: str) -> Tuple[Optional[str], Optional[str]]:
    acc_info_path = os.path.join(wx_files_folder, wx_id, 'config', 'AccInfo.dat')

    with open(acc_info_path, 'rb') as f:
        content = f.read()

    content = content.decode('utf-8', errors='ignore')

    # 删除\xXX字符
    pat = re.compile(r'[\x00-\x1f\x80-\xff]+')
    content = re.sub(pat, '', content)

    username = re.search(r'@(.*?)f', content)

    if username.groups() and len(username.groups()) > 0:
        content = content[username.span()[1]:]
        logo_url = re.search(r'http://.*?/132', content)
        return username.group(1), logo_url.group(0)
    else:
        return None, None


if __name__ == "__main__":
    find_wx_username('/home/thepoy/Documents/WeChat Files', 'wxid_mnuz9ij3ljy022')
