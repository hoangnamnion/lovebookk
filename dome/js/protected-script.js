
(function(){
    // Domain whitelist
    var allowedHost = "yourdomain.com";

    // DevTools detection
    function detectDevTools() {
        const threshold = 160;
        setInterval(function() {
            const heightDiff = window.outerHeight - window.innerHeight;
            if (heightDiff > threshold) {
                document.body.innerHTML = "";
                alert("Unauthorized debugging detected.");
                throw new Error("DevTools Detected");
            }
        }, 1000);
    }

    // Domain check
    function checkDomain() {
        if (window.location.hostname !== allowedHost) {
            console.error("Blocked unauthorized domain:", window.location.hostname);
            document.body.innerHTML = "";
            throw new Error("Unauthorized domain usage");
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
        checkDomain();
        detectDevTools();
        uselessNoise();
    }

    // Call protection
    protect();
})();
