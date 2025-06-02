// Function to calculate the number of days, hours, minutes, seconds, milliseconds between two dates
function calculateTimeDifference(startDate, endDate) {
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    let diff = secondDate - firstDate; // Difference in milliseconds

    const milliseconds = Math.floor(diff % 1000);
    diff = Math.floor(diff / 1000); // Difference in seconds

    const seconds = Math.floor(diff % 60);
    diff = Math.floor(diff / 60); // Difference in minutes

    const minutes = Math.floor(diff % 60);
    diff = Math.floor(diff / 60); // Difference in hours

    const hours = Math.floor(diff % 24);
    const days = Math.floor(diff / 24);

    return { days, hours, minutes, seconds, milliseconds };
}

// Function to format date as DD/MM/YYYY
function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Add click animation to back button
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 100);
        });
    }

    const startDateInput = document.getElementById('loveStartDate');
    const startDateSpan = document.getElementById('startDate');
    const totalDaysSpan = document.getElementById('totalDays');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    const millisecondsSpan = document.getElementById('milliseconds');

    if (startDateInput && startDateSpan && totalDaysSpan && hoursSpan && minutesSpan && secondsSpan && millisecondsSpan) {
        const startDateValue = startDateInput.value;

        // Display the start date
        startDateSpan.textContent = formatDate(startDateValue);

        // Function to update the counter
        function updateCounter() {
            const now = new Date();
            const timeDifference = calculateTimeDifference(startDateValue, now);

            totalDaysSpan.textContent = timeDifference.days;
            hoursSpan.textContent = String(timeDifference.hours).padStart(2, '0');
            minutesSpan.textContent = String(timeDifference.minutes).padStart(2, '0');
            secondsSpan.textContent = String(timeDifference.seconds).padStart(2, '0');
            millisecondsSpan.textContent = String(timeDifference.milliseconds).padStart(3, '0');

            // Store the days count in localStorage
            localStorage.setItem('daysInLove', timeDifference.days);
        }

        // Update the counter initially
        updateCounter();

        // Update the counter every 10 milliseconds for real-time effect
        setInterval(updateCounter, 10);
    }

    // Function to create and animate a falling heart
    function createFallingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.innerHTML = '❤️'; // Hoặc dùng ký tự trái tim khác nếu muốn

        // Randomize starting horizontal position
        const startX = Math.random() * window.innerWidth;
        heart.style.left = `${startX}px`;

        // Randomize animation duration and delay
        const duration = Math.random() * 5 + 5; // Duration between 5 and 10 seconds
        heart.style.animationDuration = `${duration}s`;
        const delay = Math.random() * 2; // Delay between 0 and 2 seconds
        heart.style.animationDelay = `-${delay}s`; // Use negative delay to start some animations in progress

        document.body.appendChild(heart);

        // Remove heart element after animation ends
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Create hearts at intervals
    setInterval(createFallingHeart, 500); // Create a new heart every 500ms

    // Add fade-in animation to content
    const content = document.querySelector('.content');
    if (content) {
        content.style.opacity = '0';
        content.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            content.style.opacity = '1';
        }, 100);
    }

    // Background music playback
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Attempt to autoplay (may be blocked by browsers)
    const playMusic = () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(error => {
                console.log('Autoplay prevented, waiting for user interaction:', error);
            });
        }
    };

    // Play on user interaction (e.g., click)
    document.addEventListener('click', playMusic);
    document.addEventListener('touchstart', playMusic);

    // Try playing immediately (may work in some cases)
    playMusic();

    const slideshowContainer = document.querySelector('.slideshow-container');
    const slideshow = slideshowContainer.querySelector('.slideshow');
});
