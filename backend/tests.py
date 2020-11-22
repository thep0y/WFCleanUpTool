import unittest

from backend.handlers.file_handler import find_wx_username_and_logo


class TestHandlers(unittest.TestCase):
    def test_find_wx_username_and_logo(self):
        wx_files_folder = '/home/thepoy/Documents/WeChat Files'
        wx_id = 'wxid_mnuz9ij3ljy022'
        username, logo_url = find_wx_username_and_logo(wx_files_folder, wx_id)
        target_logo_url = 'http://wx.qlogo.cn/mmhead/ver_1/Tlbh9e3OI12046tEibFXHRbxmwPicpfUQhz7p0Lau5MqM3EVxqyNraHkJINMNbVSbj0Tq1UibNH115JhdldkUIw1sB2VSVRMjeSdocgjTXlwBM/132'
        self.assertEqual(username, 'thep0y')
        self.assertEqual(logo_url, target_logo_url)


if __name__ == "__main__":
    unittest.main()
