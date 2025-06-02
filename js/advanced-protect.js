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

        // Monitor DOM changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.tagName === 'SCRIPT' && node.src && !node.src.includes('dome/js/')) {
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

    // Apply protections
    antiTamper();
    antiScreenshot();
})(); 
