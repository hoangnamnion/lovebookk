// Obfuscate all scripts
(function() {
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

    // Apply protections
    disableConsole();
    disableSourceMaps();

    // Clear console on load
    console.clear();
})(); 
