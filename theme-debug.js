// Debug version of theme management script
(function() {
    'use strict';
    
    console.log('=== THEME DEBUG SCRIPT LOADED ===');
    console.log('Script loaded at:', new Date().toISOString());
    console.log('Document ready state:', document.readyState);
    console.log('Current localStorage theme:', localStorage.getItem('theme'));
    console.log('Current data-theme attribute:', document.documentElement.getAttribute('data-theme'));
    
    let currentTheme = 'auto'; // 'auto', 'light', or 'dark'
    
    // Function to apply theme
    function applyTheme(theme = null) {
        console.log('=== APPLY THEME CALLED ===');
        console.log('Input theme parameter:', theme);
        console.log('Current theme before:', currentTheme);
        
        if (theme) {
            currentTheme = theme;
            localStorage.setItem('theme', theme);
            console.log('Theme set to:', theme);
        } else {
            // Get stored theme or default to auto
            const storedTheme = localStorage.getItem('theme');
            currentTheme = storedTheme || 'auto';
            console.log('Retrieved theme from localStorage:', storedTheme, 'using:', currentTheme);
        }
        
        let isDark = false;
        
        if (currentTheme === 'auto') {
            isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            console.log('Auto mode - system prefers dark:', isDark);
        } else {
            isDark = currentTheme === 'dark';
            console.log('Manual mode - isDark:', isDark);
        }
        
        const newDataTheme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newDataTheme);
        
        console.log('=== THEME APPLIED ===');
        console.log('Final state:', {
            currentTheme: currentTheme,
            isDark: isDark,
            dataTheme: document.documentElement.getAttribute('data-theme'),
            localStorage: localStorage.getItem('theme'),
            htmlElement: document.documentElement,
            allAttributes: Array.from(document.documentElement.attributes).map(attr => `${attr.name}="${attr.value}"`)
        });
        
        // Update button text if it exists
        updateThemeButton();
    }
    
    // Function to toggle theme
    function toggleTheme() {
        console.log('=== TOGGLE THEME CALLED ===');
        console.log('Current theme before toggle:', currentTheme);
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
        console.log('System theme change detected:', e.matches ? 'dark' : 'light');
        if (currentTheme === 'auto') {
            const prefersDark = e.matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
            updateThemeButton();
        }
    }
    
    // Initialize theme immediately and on DOM load
    function initializeTheme() {
        console.log('=== INITIALIZE THEME ===');
        console.log('DOM ready state:', document.readyState);
        console.log('Stored theme in localStorage:', localStorage.getItem('theme'));
        applyTheme();
    }
    
    // Apply theme immediately if DOM is already loaded
    if (document.readyState === 'loading') {
        console.log('DOM still loading, adding DOMContentLoaded listener');
        document.addEventListener('DOMContentLoaded', initializeTheme);
    } else {
        console.log('DOM already loaded, initializing immediately');
        initializeTheme();
    }
    
    // Also listen for DOMContentLoaded for additional initialization
    document.addEventListener('DOMContentLoaded', function() {
        console.log('=== DOM CONTENT LOADED ===');
        console.log('Ensuring theme is applied');
        
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
    
    // Expose toggle function globally
    window.toggleTheme = toggleTheme;
    
    console.log('=== THEME DEBUG SCRIPT INITIALIZATION COMPLETE ===');
})();
