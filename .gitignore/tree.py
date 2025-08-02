import os
import json

# مسیر پروژه‌ها
BASE_DIR = r"C:\Users\m.jaber\Desktop\bazar"
ANGULAR_DIR = os.path.join(BASE_DIR, "front")
LARAVEL_DIR = os.path.join(BASE_DIR, "back")

# فایل‌های خروجی
ANGULAR_TREE = os.path.join(BASE_DIR, "angtree.txt")
LARAVEL_TREE = os.path.join(BASE_DIR, "lartree.txt")

# پوشه‌هایی که باید نادیده گرفته شوند
EXCLUDE_DIRS = {"node_modules", "vendor", "storage", ".git", "dist", "__pycache__"}

def get_angular_version(package_json_path):
    try:
        with open(package_json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            deps = data.get("dependencies", {})
            version = deps.get("@angular/core")
            return version if version else "نامشخص"
    except:
        return "نامشخص"

def get_laravel_version(composer_lock_path):
    try:
        with open(composer_lock_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            for pkg in data.get("packages", []):
                if pkg.get("name") == "laravel/framework":
                    return pkg.get("version", "نامشخص")
        return "نامشخص"
    except:
        return "نامشخص"

def write_tree(current_path, file_handle, prefix=""):
    try:
        items = sorted(os.listdir(current_path))
    except Exception:
        file_handle.write(f"{prefix}[خطا در خواندن: {current_path}]\n")
        return

    entries = []
    for item in items:
        item_path = os.path.join(current_path, item)
        if os.path.isdir(item_path) and item not in EXCLUDE_DIRS:
            entries.append((item, True))
        elif os.path.isfile(item_path):
            entries.append((item, False))

    for index, (name, is_dir) in enumerate(entries):
        connector = "├──" if index < len(entries) - 1 else "└──"
        file_handle.write(f"{prefix}{connector} {name}\n")
        if is_dir:
            extension = "│   " if index < len(entries) - 1 else "    "
            write_tree(os.path.join(current_path, name), file_handle, prefix + extension)

def generate_tree(project_path, output_path, title, version):
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(f"{title} (نسخه: {version})\n\n")
        write_tree(project_path, f)

if __name__ == "__main__":
    angular_version = get_angular_version(os.path.join(ANGULAR_DIR, "package.json"))
    laravel_version = get_laravel_version(os.path.join(LARAVEL_DIR, "composer.lock"))

    generate_tree(ANGULAR_DIR, ANGULAR_TREE, "📦 ساختار پروژه Angular", angular_version)
    generate_tree(LARAVEL_DIR, LARAVEL_TREE, "📦 ساختار پروژه Laravel", laravel_version)

    print("✅ فایل‌های درختی همراه با نسخه فریمورک‌ها با موفقیت تولید شدند.")