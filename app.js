document.addEventListener('DOMContentLoaded', () => {
    console.log('%c SYSTEM // INITIALIZED ', 'background: #00F0FF; color: #000; font-weight: bold; padding: 2px 4px;');

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
            header.className = 'collapsible'; // Default expanded (CSS handled)
            
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
                countSpan.className = 'json-count';
                countSpan.textContent = isArray ? `${keys.length} items` : `${keys.length} keys`;
                header.appendChild(countSpan);
            } else {
                 // Empty object/array
                const bracketEnd = document.createElement('span');
                bracketEnd.className = 'json-bracket';
                bracketEnd.textContent = closeBracket;
                header.appendChild(bracketEnd);
                header.classList.remove('collapsible'); // Remove pointer
                
                // If empty, return container with header only
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
            });
            
            // Closing Bracket
            const footer = document.createElement('div');
            footer.className = 'json-block-footer';
            footer.textContent = closeBracket;
            
            content.appendChild(footer);
            container.appendChild(content);

        } else {
            // Primitive
            const line = document.createElement('div');
            line.className = 'json-line';

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
        charCount.textContent = '0';
    }

    function showError(msg) {
        errorMessage.textContent = `ERROR: ${msg}`;
        errorMessage.classList.remove('hidden');
        // Auto hide after 5s
        setTimeout(hideError, 5000);
    }

    function hideError() {
        errorMessage.classList.add('hidden');
    }

    function updateCharCount(str) {
        charCount.textContent = str.length.toLocaleString();
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
            "system": "JSON_INSTRUMENT_V1",
            "status": "ONLINE",
            "modules": ["Viewer", "Parser", "Formatter"],
            "config": {
                "theme": "cyber_dark",
                "auto_refresh": true,
                "max_nodes": 5000
            },
            "data_stream": [
                { "id": "0x1A", "value": 88.5, "flag": true },
                { "id": "0x1B", "value": 42.0, "flag": false }
            ],
            "meta": null
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
            updateViewer(jsonInput.value);
            hideError();
            blinkSuccess(btnFormat);
        } catch (e) {
            showError("INVALID JSON");
        }
    });

    // Minify
    btnMinify.addEventListener('click', () => {
        try {
            const val = JSON.parse(jsonInput.value);
            jsonInput.value = JSON.stringify(val);
            updateCharCount(jsonInput.value);
            updateViewer(jsonInput.value);
            hideError();
            blinkSuccess(btnMinify);
        } catch (e) {
            showError("INVALID JSON");
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
        const validClasses = ['.json-key', '.json-string', '.json-number', '.json-boolean'];

        validClasses.forEach(cls => {
            document.querySelectorAll(cls).forEach(el => {
                if (el.textContent.toLowerCase().includes(term)) {
                    el.classList.add('highlight');
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
            const originalIcon = btnCopy.innerHTML;
            btnCopy.style.color = 'var(--c-success)';
            btnCopy.innerHTML = `<span style="font-weight:bold">✓</span>`;
            setTimeout(() => {
                btnCopy.innerHTML = originalIcon;
                btnCopy.style.color = '';
            }, 1000);
        });
    });

    // Helper for visual feedback
    function blinkSuccess(btn) {
        const originalColor = btn.style.borderColor;
        btn.style.borderColor = 'var(--c-success)';
        btn.style.color = 'var(--c-success)';
        setTimeout(() => {
            btn.style.borderColor = originalColor;
            btn.style.color = '';
        }, 500);
    }
});
