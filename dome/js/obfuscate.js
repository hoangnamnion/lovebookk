// Obfuscate all scripts
(function() {
    // Function to obfuscate code
    function obfuscateCode(code) {
        return code
            .split('')
            .map(char => '\\x' + char.charCodeAt(0).toString(16))
            .join('');
    }

    // Function to create a self-executing function
    function createSelfExecutingFunction(code) {
        return `(function(){eval(String.fromCharCode(${code.split('\\x').filter(Boolean).map(x => parseInt(x, 16)).join(',')}))})();`;
    }

    // Obfuscate all script tags
    document.querySelectorAll('script').forEach(script => {
        if (script.src) return; // Skip external scripts
        
        const originalCode = script.textContent;
        const obfuscatedCode = obfuscateCode(originalCode);
        const finalCode = createSelfExecutingFunction(obfuscatedCode);
        
        // Replace the script content
        script.textContent = finalCode;
    });

    // Disable console
    const disableConsole = () => {
        const methods = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'];
        
        methods.forEach(method => {
            console[method] = function() {
                return;
            };
        });
    };

    // Disable source maps
    const disableSourceMaps = () => {
        // @sourceMappingURL
        const styleSheets = document.styleSheets;
        for (let i = 0; i < styleSheets.length; i++) {
            try {
                const rules = styleSheets[i].cssRules;
                for (let j = 0; j < rules.length; j++) {
                    if (rules[j].type === CSSRule.COMMENT) {
                        rules[j].deleteRule(j);
                    }
                }
            } catch (e) {
                // Ignore cross-origin errors
            }
        }
    };

    // Disable debugging
    const disableDebugging = () => {
        // Disable debugger
        setInterval(() => {
            debugger;
        }, 100);

        // Disable breakpoints
        const disableBreakpoints = () => {
            const originalFunction = Function.prototype.toString;
            Function.prototype.toString = function() {
                if (this === disableBreakpoints) {
                    return originalFunction.call(this);
                }
                return 'function() { [native code] }';
            };
        };
        disableBreakpoints();
    };

    // Apply all protections
    disableConsole();
    disableSourceMaps();
    disableDebugging();

    // Clear console on load
    console.clear();

    // Prevent console access
    Object.defineProperty(window, 'console', {
        get: function() {
            return {
                log: function() {},
                debug: function() {},
                info: function() {},
                warn: function() {},
                error: function() {},
                assert: function() {},
                dir: function() {},
                dirxml: function() {},
                group: function() {},
                groupEnd: function() {},
                time: function() {},
                timeEnd: function() {},
                count: function() {},
                trace: function() {},
                profile: function() {},
                profileEnd: function() {},
                clear: function() {}
            };
        }
    });
})(); 