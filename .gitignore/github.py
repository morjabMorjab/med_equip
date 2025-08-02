# -*- coding: utf-8 -*-
import os
import shutil
from pathlib import Path
import tkinter as tk
from tkinter import messagebox
import subprocess
from datetime import datetime

# تنظیمات مسیرها
REPO_URL = "https://github.com/morjabMorjab/med_equip.git"
LOCAL_REPO = Path("C:/Users/m.jaber/Desktop/bazar/med_equip_temp")
BACK_SRC = Path("C:/Users/m.jaber/Desktop/bazar/back")
FRONT_SRC = Path("C:/Users/m.jaber/Desktop/bazar/front")
TARGET_BRANCH = "main"

def show_popup(status, title, message):
    root = tk.Tk()
    root.withdraw()
    if status == "success":
        messagebox.showinfo(title, message)
    else:
        messagebox.showerror(title, message)
    root.destroy()

def clean_repo():
    try:
        if LOCAL_REPO.exists():
            shutil.rmtree(LOCAL_REPO, ignore_errors=True)
        LOCAL_REPO.mkdir(parents=True)
        return True
    except Exception as e:
        show_popup("error", "خطا", f"خطا در پاکسازی ریپازیتوری موقت:\n{str(e)}")
        return False

def clone_and_prepare():
    try:
        # کلون کردن با عمق 1 برای سریع‌تر شدن
        subprocess.run(["git", "clone", "--depth", "1", REPO_URL, str(LOCAL_REPO)], check=True)
        
        # حذف همه فایل‌ها به جز .git
        os.chdir(LOCAL_REPO)
        for item in os.listdir():
            if item != ".git":
                path = os.path.join(LOCAL_REPO, item)
                if os.path.isdir(path):
                    shutil.rmtree(path, ignore_errors=True)
                else:
                    try:
                        os.remove(path)
                    except:
                        pass
        
        # کپی فولدرهای مورد نیاز
        shutil.copytree(BACK_SRC, os.path.join(LOCAL_REPO, "back"))
        shutil.copytree(FRONT_SRC, os.path.join(LOCAL_REPO, "front"))
        
        return True
    except subprocess.CalledProcessError as e:
        show_popup("error", "خطا", f"خطا در عملیات گیت:\n{e.stderr.decode() if e.stderr else str(e)}")
        return False
    except Exception as e:
        show_popup("error", "خطا", f"خطا در آماده‌سازی ریپازیتوری:\n{str(e)}")
        return False

def push_to_github():
    try:
        os.chdir(LOCAL_REPO)
        
        # تنظیم شناسه کاربر
        subprocess.run(["git", "config", "user.name", "morjabMorjab"], check=True)
        subprocess.run(["git", "config", "user.email", "your-email@example.com"], check=True)
        
        # انجام عملیات گیت
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", f"Update back and front - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"], check=True)
        subprocess.run(["git", "push", "origin", TARGET_BRANCH], check=True)
        
        show_popup("success", "موفقیت", "فولدرهای back و front با موفقیت به گیتهاب آپلود شدند.")
        return True
    except subprocess.CalledProcessError as e:
        show_popup("error", "خطا", f"خطا در عملیات گیت:\n{e.stderr.decode() if e.stderr else str(e)}")
        return False
    except Exception as e:
        show_popup("error", "خطا", f"خطا در آپلود به گیتهاب:\n{str(e)}")
        return False

if __name__ == "__main__":
    try:
        if clean_repo() and clone_and_prepare():
            push_to_github()
    finally:
        # پاکسازی ریپازیتوری موقت در هر حالت
        if LOCAL_REPO.exists():
            shutil.rmtree(LOCAL_REPO, ignore_errors=True)