// Theme management script
(function() {
    'use strict';
    
    let currentTheme = 'auto'; // 'auto', 'light', or 'dark'
    
    // Function to apply theme
    function applyTheme(theme = null) {
        if (theme) {
            currentTheme = theme;
            localStorage.setItem('theme', theme);
        } else {
            // Get stored theme or default to auto
            currentTheme = localStorage.getItem('theme') || 'auto';
        }
        
        let isDark = false;
        
        if (currentTheme === 'auto') {
            isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        } else {
            isDark = currentTheme === 'dark';
        }
        
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
        console.log('Current data-theme attribute:', document.documentElement.getAttribute('data-theme'));
        
        if (currentTheme === 'auto') {
            // If auto, switch to opposite of current system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            console.log('Auto mode - system prefers dark:', prefersDark);
            applyTheme(prefersDark ? 'light' : 'dark');
        } else {
            // If manual, switch to opposite
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            console.log('Manual mode - switching from', currentTheme, 'to', newTheme);
            applyTheme(newTheme);
        }
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
    
    // Function to handle system theme changes (only when in auto mode)
    function handleThemeChange(e) {
        if (currentTheme === 'auto') {
            const prefersDark = e.matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
            updateThemeButton();
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
        
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleThemeChange);
        
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
})();
