(function(){
    // DevTools detection
    function detectDevTools() {
        const threshold = 160;
        setInterval(function() {
            const heightDiff = window.outerHeight - window.innerHeight;
            const widthDiff = window.outerWidth - window.innerWidth;
            if (heightDiff > threshold || widthDiff > threshold) {
                // Thay vì xóa nội dung, chỉ hiển thị cảnh báo
                const warning = document.createElement('div');
                warning.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 999999;
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 20px;
                `;
                warning.innerHTML = `
                    <div>
                        <h2>⚠️ Cảnh báo</h2>
                        <p>Vui lòng tắt DevTools để tiếp tục sử dụng.</p>
                    </div>
                `;
                document.body.appendChild(warning);
            } else {
                // Xóa cảnh báo nếu DevTools đã đóng
                const warning = document.querySelector('div[style*="position: fixed"]');
                if (warning) {
                    warning.remove();
                }
            }
        }, 1000);
    }

    // Code protection
    function protectCode() {
        // Vô hiệu hóa các phương thức debug
        const debugMethods = ['debug', 'dir', 'dirxml', 'trace'];
        debugMethods.forEach(method => {
            if (console[method]) {
                console[method] = function() {
                    return;
                };
            }
        });

        // Vô hiệu hóa source maps
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
                // Bỏ qua lỗi cross-origin
            }
        }
    }

    // HoneyTrap function
    function __code_stolen__() {
        fetch("https://yourdomain.com/report", {
            method: "POST",
            body: JSON.stringify({ event: "code_stolen", time: Date.now(), host: window.location.hostname })
        });
    }

    // Fake useless code to confuse reverse engineers
    function uselessNoise(){
        let str = "";
        for (let i = 0; i < 1000; i++) {
            str += String.fromCharCode((i % 26) + 65);
        }
        return str.split("").reverse().join("");
    }

    // Init protection
    function protect() {
        detectDevTools();
        protectCode();
        uselessNoise();
    }

    // Call protection
    protect();
})();
