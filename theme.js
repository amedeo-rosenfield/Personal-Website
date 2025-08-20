// Theme management script
(function() {
    'use strict';
    
    let currentTheme = 'dark'; // Always default to dark
    
    // Function to apply theme
    function applyTheme(theme = null) {
        if (theme) {
            currentTheme = theme;
            localStorage.setItem('theme', theme);
        } else {
            // Always default to dark mode, only check localStorage for user preference
            currentTheme = localStorage.getItem('theme') || 'dark';
        }
        
        // Force dark mode unless user explicitly chose light
        const isDark = currentTheme !== 'light';
        
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        
        // Debug logging
        console.log('Theme applied:', {
            currentTheme: currentTheme,
            isDark: isDark,
            dataTheme: document.documentElement.getAttribute('data-theme'),
            localStorage: localStorage.getItem('theme')
        });
        
        // Update button text if it exists
        updateThemeButton();
    }
    
    // Function to toggle theme
    function toggleTheme() {
        console.log('Toggle theme called, current theme:', currentTheme);
        
        // Simple toggle between light and dark
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        console.log('Switching from', currentTheme, 'to', newTheme);
        applyTheme(newTheme);
    }
    
    // Function to update theme button text
    function updateThemeButton() {
        const themeButton = document.getElementById('theme-toggle');
        if (themeButton) {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newText = isDark ? 'Light Mode' : 'Dark Mode';
            themeButton.textContent = newText;
            console.log('Button text updated to:', newText, 'isDark:', isDark);
        } else {
            console.log('Theme button not found');
        }
    }
    
    // Initialize theme immediately and on DOM load
    function initializeTheme() {
        console.log('Initializing theme, DOM ready state:', document.readyState);
        console.log('Stored theme in localStorage:', localStorage.getItem('theme'));
        applyTheme();
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
        
        // Add click handler for theme toggle button
        const themeButton = document.getElementById('theme-toggle');
        if (themeButton) {
            themeButton.addEventListener('click', toggleTheme);
            console.log('Theme button click handler added');
        } else {
            console.log('Theme button not found during initialization');
        }
    });
    
    // Navbar scroll functionality
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                // Add scrolled class when user has scrolled down
                navbar.classList.add('navbar-scrolled');
            } else {
                // Remove scrolled class when at top
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
        }, 2000); // Wait 2 seconds for everything to load
    });
})();
