// Theme management script
(function() {
    'use strict';
    
    function getStoredTheme() {
        const stored = localStorage.getItem('theme');
        if (!stored) {
            return 'dark';
        }
        return stored === 'light' ? 'light' : 'dark';
    }
    
    function applyTheme(theme = null) {
        if (!theme) {
            theme = getStoredTheme();
        }
        
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeButton();
    }
    
    function toggleTheme() {
        const currentTheme = getStoredTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    }
    
    function updateThemeButton() {
        const themeButton = document.getElementById('theme-toggle');
        if (themeButton) {
            const currentTheme = getStoredTheme();
            themeButton.textContent = currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
        }
    }
    
    function initializeTheme() {
        applyTheme();
        
        const themeButton = document.getElementById('theme-toggle');
        if (themeButton) {
            themeButton.addEventListener('click', toggleTheme);
        }
        
        const currentTheme = getStoredTheme();
        document.documentElement.setAttribute('data-theme', currentTheme);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTheme);
    } else {
        initializeTheme();
    }
    
    // Double-check theme is applied after DOM load
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            const storedTheme = getStoredTheme();
            const currentDataTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentDataTheme !== storedTheme) {
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
    
    window.addEventListener('scroll', handleNavbarScroll);
    window.toggleTheme = toggleTheme;
})();
