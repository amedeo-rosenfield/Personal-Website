// Theme management script
(function() {
    'use strict';
    
    // Function to get stored theme or default to dark
    function getStoredTheme() {
        const stored = localStorage.getItem('theme');
        // If no theme is stored, default to dark mode
        if (!stored) {
            return 'dark';
        }
        return stored === 'light' ? 'light' : 'dark';
    }
    
    // Function to apply theme
    function applyTheme(theme = null) {
        // If no theme provided, get from localStorage or default to dark
        if (!theme) {
            theme = getStoredTheme();
        }
        
        // Store the theme choice
        localStorage.setItem('theme', theme);
        
        // Apply the theme to the document
        document.documentElement.setAttribute('data-theme', theme);
        
        // Apply theme using data-theme attribute only
        // CSS variables will handle all styling
        
        // Update button text
        updateThemeButton();
        
        // Debug logging
        console.log('Theme applied:', {
            theme: theme,
            dataTheme: document.documentElement.getAttribute('data-theme'),
            localStorage: localStorage.getItem('theme')
        });
    }
    
    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = getStoredTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        console.log('Toggling theme from', currentTheme, 'to', newTheme);
        applyTheme(newTheme);
    }
    
    // Function to update theme button text
    function updateThemeButton() {
        const themeButton = document.getElementById('theme-toggle');
        if (themeButton) {
            const currentTheme = getStoredTheme();
            const buttonText = currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
            themeButton.textContent = buttonText;
            console.log('Button text updated to:', buttonText);
        }
    }
    
    // Initialize theme
    function initializeTheme() {
        console.log('Initializing theme');
        console.log('Stored theme in localStorage:', localStorage.getItem('theme'));
        
        // Apply the stored theme (or default to dark)
        applyTheme();
        
        // Add click handler for theme toggle button
        const themeButton = document.getElementById('theme-toggle');
        if (themeButton) {
            themeButton.addEventListener('click', toggleTheme);
            console.log('Theme button click handler added');
        }
        
        // Ensure data-theme is set on html element
        const currentTheme = getStoredTheme();
        document.documentElement.setAttribute('data-theme', currentTheme);
    }
    
    // Apply theme immediately if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTheme);
    } else {
        initializeTheme();
    }
    
    // Also listen for DOMContentLoaded for additional initialization
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, ensuring theme is applied');
        
        // Double-check theme is applied correctly
        setTimeout(() => {
            const storedTheme = getStoredTheme();
            const currentDataTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentDataTheme !== storedTheme) {
                console.log('Re-applying theme after DOM load');
                applyTheme(storedTheme);
            }
        }, 100);
    });
    
    // Navbar scroll functionality
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Expose toggle function globally
    window.toggleTheme = toggleTheme;
    
    // Diagnostic function for dust particles
    window.diagnoseDustParticles = function() {
        console.log('=== Dust Particle Diagnosis ===');
        console.log('Canvas element:', document.getElementById('dustCanvas'));
        console.log('Canvas context:', document.getElementById('dustCanvas') ? document.getElementById('dustCanvas').getContext('2d') : 'No canvas');
        console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
        console.log('Canvas display style:', document.getElementById('dustCanvas') ? getComputedStyle(document.getElementById('dustCanvas')).display : 'No canvas');
        console.log('Window size:', window.innerWidth, 'x', window.innerHeight);
        console.log('Browser:', navigator.userAgent);
        console.log('==============================');
    };
    
    // Run diagnosis on load
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            window.diagnoseDustParticles();
        }, 2000);
    });
})();
