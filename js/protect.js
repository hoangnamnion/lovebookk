// Disable right click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable text selection
document.addEventListener('selectstart', (e) => e.preventDefault());

// Disable copy
document.addEventListener('copy', (e) => e.preventDefault());

// Disable cut
document.addEventListener('cut', (e) => e.preventDefault());

// Disable paste
document.addEventListener('paste', (e) => e.preventDefault());

// Disable drag and drop
document.addEventListener('dragstart', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());

// Disable keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Disable Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+A
    if ((e.ctrlKey || e.metaKey) && 
        (e.key === 'c' || e.key === 'x' || e.key === 'v' || e.key === 'a')) {
        e.preventDefault();
    }
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.key === 'F12' || 
        ((e.ctrlKey || e.metaKey) && e.shiftKey && 
         (e.key === 'i' || e.key === 'j' || e.key === 'c'))) {
        e.preventDefault();
    }
});

// Add watermark to all images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.getElementsByTagName('img');
    for (let img of images) {
        img.style.pointerEvents = 'none';
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';
    }
});

// Disable view source
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
    }
}); 
