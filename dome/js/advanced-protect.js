// Advanced Protection System
(function() {
    // Anti-tampering protection
    const antiTamper = () => {
        // Store original functions
        const originalFunctions = {
            eval: window.eval,
            Function: window.Function,
            setTimeout: window.setTimeout,
            setInterval: window.setInterval,
            requestAnimationFrame: window.requestAnimationFrame
        };

        // Override dangerous functions
        window.eval = function() {
            throw new Error('Eval is disabled');
        };

        window.Function = function() {
            throw new Error('Function constructor is disabled');
        };

        // Monitor DOM changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.tagName === 'SCRIPT') {
                            node.remove();
                        }
                    });
                }
            });
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    };

    // Anti-debugging protection
    const antiDebug = () => {
        // Detect debugger
        let isDebugger = false;
        
        function checkDebugger() {
            const startTime = performance.now();
            debugger;
            const endTime = performance.now();
            if (endTime - startTime > 100) {
                isDebugger = true;
                document.body.innerHTML = '';
                window.location.href = '/';
            }
        }

        // Run debugger check periodically
        setInterval(checkDebugger, 1000);

        // Detect DevTools
        const devToolsCheck = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;
            
            if (widthThreshold || heightThreshold) {
                document.body.innerHTML = '';
                window.location.href = '/';
            }
        };

        setInterval(devToolsCheck, 1000);
    };

    // Code encryption
    const encryptCode = () => {
        // Simple XOR encryption
        const key = 'YOUR_SECRET_KEY';
        
        function encrypt(text) {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            }
            return btoa(result);
        }

        // Encrypt all inline scripts
        document.querySelectorAll('script:not([src])').forEach(script => {
            const originalCode = script.textContent;
            const encryptedCode = encrypt(originalCode);
            script.textContent = `
                (function() {
                    const key = '${key}';
                    function decrypt(text) {
                        text = atob(text);
                        let result = '';
                        for (let i = 0; i < text.length; i++) {
                            result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
                        }
                        return result;
                    }
                    eval(decrypt('${encryptedCode}'));
                })();
            `;
        });
    };

    // Anti-tampering for CSS
    const protectCSS = () => {
        // Remove all style tags
        document.querySelectorAll('style').forEach(style => style.remove());
        
        // Disable style modifications
        const styleObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    mutation.target.removeAttribute('style');
                }
            });
        });

        document.querySelectorAll('*').forEach(element => {
            styleObserver.observe(element, {
                attributes: true,
                attributeFilter: ['style']
            });
        });
    };

    // Anti-screenshot protection
    const antiScreenshot = () => {
        // Disable print screen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p')) {
                e.preventDefault();
                return false;
            }
        });

        // Disable right-click save
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
    };

    // Apply all protections
    antiTamper();
    antiDebug();
    encryptCode();
    protectCSS();
    antiScreenshot();

    // Final protection layer
    Object.freeze(window);
    Object.freeze(document);
    Object.freeze(document.documentElement);
})(); 