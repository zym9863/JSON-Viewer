# 🔍 Modern JSON Viewer

**语言: 中文 | [English](README-EN.md)**

---

一个现代化、美观的 JSON 可视化工具，帮助你轻松查看和编辑 JSON 数据。

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ 功能特性

### 🎯 核心功能
- **实时解析** - 输入 JSON 后自动解析并以树状视图展示
- **语法高亮** - 不同数据类型（字符串、数字、布尔值、null）使用不同颜色显示
- **折叠/展开** - 支持对象和数组的折叠展开操作
- **搜索功能** - 快速搜索键名或值，匹配项高亮显示

### 🛠️ 工具功能
- **✨ Format** - 格式化 JSON，使其更易读（带缩进）
- **📦 Minify** - 压缩 JSON，移除所有空白字符
- **🎲 Sample** - 加载示例 JSON 数据
- **🗑️ Clear** - 清空输入区域
- **📋 Copy** - 一键复制 JSON 到剪贴板

### 🎨 界面特性
- 现代化深色主题设计
- 响应式布局，适配不同屏幕尺寸
- 平滑的动画过渡效果
- 使用 Inter 和 JetBrains Mono 字体，提升阅读体验

## 🚀 快速开始

### 方式一：直接打开
无需安装任何依赖，直接在浏览器中打开 `index.html` 即可使用。

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### 方式二：使用本地服务器
如果你想使用本地开发服务器运行：

```bash
# 使用 Python
python -m http.server 8080

# 使用 Node.js (需要安装 http-server)
npx http-server -p 8080
```

然后访问 `http://localhost:8080`

## 📁 项目结构

```
JSON Viewer/
├── index.html      # 主 HTML 文件
├── styles.css      # 样式文件
├── app.js          # JavaScript 逻辑
├── README.md       # 项目说明文档（中文）
└── README-EN.md    # 项目说明文档（英文）
```

## 🖥️ 使用说明

1. **输入 JSON** - 在左侧输入区域粘贴或输入你的 JSON 数据
2. **查看结果** - 右侧会自动显示解析后的树状视图
3. **搜索** - 使用顶部搜索框快速定位特定的键或值
4. **格式化/压缩** - 使用工具按钮格式化或压缩 JSON
5. **复制** - 点击复制按钮将 JSON 复制到剪贴板

## 🔧 技术栈

- **HTML5** - 语义化页面结构
- **CSS3** - 现代样式，包含 CSS 变量、Flexbox、动画
- **JavaScript (ES6+)** - 原生 JavaScript，无需任何框架

## 📝 示例 JSON

点击 **🎲 Sample** 按钮加载示例数据：

```json
{
    "project": "JSON Viewer",
    "version": 1.0,
    "features": ["Tree View", "Syntax Highlighting", "Search", "Copy/Paste"],
    "settings": {
        "theme": "dark",
        "autoParse": true
    },
    "contributors": [
        { "name": "Alice", "role": "Designer" },
        { "name": "Bob", "role": "Developer" }
    ],
    "active": true,
    "stats": null
}
```

## 🌟 特色亮点

| 功能 | 描述 |
|------|------|
| 🎨 语法高亮 | 字符串（绿色）、数字（橙色）、布尔值（紫色）、null（灰色） |
| 📊 数据统计 | 显示对象键数量和数组元素数量 |
| 🔍 智能搜索 | 搜索时自动展开包含匹配项的父节点 |
| ⚡ 实时预览 | 输入时自动解析（500ms 防抖） |
| 📱 响应式 | 适配桌面和移动设备 |

## 📄 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

---

<p align="center">
  Made with ❤️ by JSON Viewer Team
</p>
