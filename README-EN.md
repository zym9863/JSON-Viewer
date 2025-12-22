# 🔍 Modern JSON Viewer

**Language: [中文](README.md) | English**

---

A modern, beautiful JSON visualization tool that helps you easily view and edit JSON data.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Features

### 🎯 Core Features
- **Real-time Parsing** - Automatically parse and display JSON in tree view upon input
- **Syntax Highlighting** - Different data types (string, number, boolean, null) displayed in different colors
- **Collapse/Expand** - Support collapsing and expanding objects and arrays
- **Search** - Quickly search for keys or values with highlighted matches

### 🛠️ Tools
- **✨ Format** - Format JSON for better readability (with indentation)
- **📦 Minify** - Compress JSON by removing all whitespace
- **🎲 Sample** - Load sample JSON data
- **🗑️ Clear** - Clear the input area
- **📋 Copy** - One-click copy JSON to clipboard

### 🎨 UI Features
- Modern dark theme design
- Responsive layout for different screen sizes
- Smooth animation transitions
- Inter and JetBrains Mono fonts for better reading experience

## 🚀 Quick Start

### Option 1: Direct Open
No dependencies required, just open `index.html` in your browser.

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Option 2: Using Local Server
If you want to run with a local development server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js (requires http-server)
npx http-server -p 8080
```

Then visit `http://localhost:8080`

## 📁 Project Structure

```
JSON Viewer/
├── index.html      # Main HTML file
├── styles.css      # Stylesheet
├── app.js          # JavaScript logic
├── README.md       # Documentation (Chinese)
└── README-EN.md    # Documentation (English)
```

## 🖥️ Usage

1. **Input JSON** - Paste or type your JSON data in the left input area
2. **View Result** - The right side will automatically show the parsed tree view
3. **Search** - Use the search box at the top to quickly locate specific keys or values
4. **Format/Minify** - Use tool buttons to format or minify JSON
5. **Copy** - Click the copy button to copy JSON to clipboard

## 🔧 Tech Stack

- **HTML5** - Semantic page structure
- **CSS3** - Modern styles including CSS variables, Flexbox, animations
- **JavaScript (ES6+)** - Vanilla JavaScript, no framework required

## 📝 Sample JSON

Click the **🎲 Sample** button to load sample data:

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

## 🌟 Highlights

| Feature | Description |
|---------|-------------|
| 🎨 Syntax Highlighting | String (green), Number (orange), Boolean (purple), null (gray) |
| 📊 Data Statistics | Display object key count and array element count |
| 🔍 Smart Search | Auto-expand parent nodes containing matches when searching |
| ⚡ Real-time Preview | Auto-parse on input (500ms debounce) |
| 📱 Responsive | Adapts to desktop and mobile devices |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by JSON Viewer Team
</p>
