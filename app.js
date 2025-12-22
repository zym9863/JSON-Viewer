document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const jsonInput = document.getElementById('json-input');
    const jsonViewer = document.getElementById('json-viewer');
    const emptyState = document.getElementById('empty-state');
    const searchInput = document.getElementById('search-input');
    const errorMessage = document.getElementById('error-message');
    const charCount = document.getElementById('char-count');

    // Buttons
    const btnSample = document.getElementById('btn-sample');
    const btnFormat = document.getElementById('btn-format');
    const btnMinify = document.getElementById('btn-minify');
    const btnClear = document.getElementById('btn-clear');
    const btnExpand = document.getElementById('btn-expand');
    const btnCollapse = document.getElementById('btn-collapse');
    const btnCopy = document.getElementById('btn-copy');

    // State
    let currentJson = null;

    // --- Core Logic ---

    // Parse and Update View
    function updateViewer(input = jsonInput.value) {
        updateCharCount(input);
        
        if (!input.trim()) {
            showEmptyState();
            hideError();
            return;
        }

        try {
            const parsed = JSON.parse(input);
            currentJson = parsed;
            hideError();
            renderTree(parsed);
        } catch (e) {
            // Only show error on explicit actions or if it was previously valid?
            // For now, let's show error immediately but softly
             showError(e.message);
        }
    }

    // Render JSON Tree
    function renderTree(data) {
        emptyState.style.display = 'none';
        jsonViewer.style.display = 'block';
        jsonViewer.innerHTML = '';
        
        const treeInfo = createNode(data, 'root');
        jsonViewer.appendChild(treeInfo);
    }

    function createNode(value, key = null) {
        const type = getType(value);
        const container = document.createElement('div');
        container.className = 'json-node';

        // Helper to create key span
        const createKey = (k) => {
            const span = document.createElement('span');
            span.className = 'json-key';
            span.textContent = `"${k}": `;
            return span;
        };

        if (type === 'object' || type === 'array') {
            const isArray = type === 'array';
            const keys = Object.keys(value);
            const isEmpty = keys.length === 0;
            const openBracket = isArray ? '[' : '{';
            const closeBracket = isArray ? ']' : '}';

            // Header line: Key (opt) + Bracket + Count
            const header = document.createElement('div');
            header.className = 'collapsible'; // Default expanded
            
            // Toggle Logic
            header.addEventListener('click', (e) => {
                e.stopPropagation();
                header.classList.toggle('collapsed');
            });

            if (key) {
                header.appendChild(createKey(key));
            }

            const bracketStart = document.createElement('span');
            bracketStart.className = 'json-bracket';
            bracketStart.textContent = openBracket;
            header.appendChild(bracketStart);

            if (!isEmpty) {
                const countSpan = document.createElement('span');
                countSpan.style.color = '#64748b';
                countSpan.style.fontSize = '0.8em';
                countSpan.style.marginLeft = '4px';
                countSpan.textContent = isArray ? `${keys.length} items` : `${keys.length} keys`;
                header.appendChild(countSpan);
            } else {
                 // Empty object/array
                const bracketEnd = document.createElement('span');
                bracketEnd.className = 'json-bracket';
                bracketEnd.textContent = closeBracket;
                header.appendChild(bracketEnd);
                header.classList.remove('collapsible'); // Remove pointer
                
                // If empty, we don't need content div, just return container with header
                 container.appendChild(header);
                 return container;
            }

            container.appendChild(header);

            // Content Container
            const content = document.createElement('div');
            content.className = 'collapsible-content';
            
            keys.forEach((k, index) => {
                const childNode = createNode(value[k], isArray ? null : k);
                content.appendChild(childNode);
                
                // Add comma if not last
                if (index < keys.length - 1) {
                   // We need to append comma to the last text node of the child
                   // This is a bit tricky with DOM structure. 
                   // Simplification: Just append a comma div ? No, should be inline.
                   // Let's add comma to the leaf nodes or logic above?
                   // Easier: The 'childNode' is a div. We can append a comma to it.
                   // But visual alignment... css pseudo?
                }
            });
            
            // Closing Bracket
            const footer = document.createElement('div');
            footer.className = 'json-bracket';
            footer.style.paddingLeft = '20px';
            footer.textContent = closeBracket;
            
            content.appendChild(footer); // Add closing bracket to content so it hides too
            container.appendChild(content);

        } else {
            // Primitive
            const line = document.createElement('div');
            line.style.paddingLeft = '20px'; // Indent primitives

            if (key) {
                line.appendChild(createKey(key));
            }

            const valueSpan = document.createElement('span');
            valueSpan.className = `json-${type}`;
            
            if (type === 'string') {
                valueSpan.textContent = `"${value}"`;
            } else if (value === null) {
                valueSpan.textContent = 'null';
            } else {
                valueSpan.textContent = String(value);
            }
            
            line.appendChild(valueSpan);
            container.appendChild(line);
        }

        return container;
    }

    function getType(value) {
        if (value === null) return 'null';
        if (Array.isArray(value)) return 'array';
        return typeof value;
    }

    function showEmptyState() {
        emptyState.style.display = 'flex';
        jsonViewer.style.display = 'none';
    }

    function showError(msg) {
        errorMessage.textContent = `Error: ${msg}`;
        errorMessage.classList.remove('hidden');
        // Auto hide after 5s
        setTimeout(hideError, 5000);
    }

    function hideError() {
        errorMessage.classList.add('hidden');
    }

    function updateCharCount(str) {
        charCount.textContent = `${str.length} chars`;
    }

    // --- Event Listeners ---

    // Input debounce
    let timeout;
    jsonInput.addEventListener('input', (e) => {
        const val = e.target.value;
        updateCharCount(val);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            updateViewer(val);
        }, 500); // 500ms debounce
    });

    // Sample Data
    btnSample.addEventListener('click', () => {
        const sample = {
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
        };
        const str = JSON.stringify(sample, null, 2);
        jsonInput.value = str;
        updateViewer(str);
    });

    // Format
    btnFormat.addEventListener('click', () => {
        try {
            const val = JSON.parse(jsonInput.value);
            jsonInput.value = JSON.stringify(val, null, 2);
            updateCharCount(jsonInput.value);
            hideError();
        } catch (e) {
            showError("Invalid JSON, cannot format");
        }
    });

    // Minify
    btnMinify.addEventListener('click', () => {
        try {
            const val = JSON.parse(jsonInput.value);
            jsonInput.value = JSON.stringify(val);
            updateCharCount(jsonInput.value);
            hideError();
        } catch (e) {
            showError("Invalid JSON, cannot minify");
        }
    });

    // Clear
    btnClear.addEventListener('click', () => {
        jsonInput.value = '';
        updateViewer('');
        searchInput.value = '';
    });

    // Expand/Collapse All
    btnExpand.addEventListener('click', () => {
        document.querySelectorAll('.collapsible').forEach(el => el.classList.remove('collapsed'));
    });

    btnCollapse.addEventListener('click', () => {
        document.querySelectorAll('.collapsible').forEach(el => el.classList.add('collapsed'));
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        
        // Remove previous highlights
        document.querySelectorAll('.highlight').forEach(el => {
            el.classList.remove('highlight');
        });

        if (!term) return;

        // Naive Text Search in DOM
        // We search inside .json-key and .json-string/number/boolean
        const validClasses = ['.json-key', '.json-string', '.json-number', '.json-boolean'];
        let found = false;

        validClasses.forEach(cls => {
            document.querySelectorAll(cls).forEach(el => {
                if (el.textContent.toLowerCase().includes(term)) {
                    el.classList.add('highlight');
                    found = true;
                    // Expand parents
                    let parent = el.closest('.collapsible-content');
                    while(parent) {
                        const prevSibling = parent.previousElementSibling;
                        if(prevSibling && prevSibling.classList.contains('collapsible')) {
                            prevSibling.classList.remove('collapsed');
                        }
                        parent = parent.parentElement.closest('.collapsible-content');
                    }
                }
            });
        });
    });

    // Copy
    btnCopy.addEventListener('click', () => {
        if (!jsonInput.value) return;
        navigator.clipboard.writeText(jsonInput.value).then(() => {
            // Visual feedback could be added here
            const originalIcon = btnCopy.innerHTML;
            btnCopy.innerHTML = `<span style="color:var(--success-color)">✓</span>`;
            setTimeout(() => {
                btnCopy.innerHTML = originalIcon;
            }, 2000);
        });
    });
});
