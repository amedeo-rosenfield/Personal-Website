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
        var currentTheme = getStoredTheme();
        var label = currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
        var themeButton = document.getElementById('theme-toggle');
        if (themeButton) {
            themeButton.textContent = label;
        }
        var mobileThemeLink = document.getElementById('mobile-theme-toggle-link');
        if (mobileThemeLink) {
            mobileThemeLink.textContent = label;
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
    
    // Mobile menu toggle functionality
    function initializeMobileMenu() {
        var mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        var navMenu = document.getElementById('nav-menu');
        
        if (!mobileMenuToggle || !navMenu) return;
        
        // Inject theme toggle as last item in mobile dropdown
        if (!document.getElementById('mobile-theme-toggle-link')) {
            var themeItem = document.createElement('li');
            themeItem.className = 'mobile-theme-toggle-item';
            var themeLink = document.createElement('a');
            themeLink.href = '#';
            themeLink.className = 'nav-link';
            themeLink.id = 'mobile-theme-toggle-link';
            themeLink.textContent = getStoredTheme() === 'dark' ? 'Light Mode' : 'Dark Mode';
            themeLink.addEventListener('click', function(e) {
                e.preventDefault();
                toggleTheme();
            });
            themeItem.appendChild(themeLink);
            navMenu.appendChild(themeItem);
        }
        
        mobileMenuToggle.addEventListener('click', function() {
            var isOpen = navMenu.classList.contains('mobile-open');
            if (isOpen) {
                navMenu.classList.remove('mobile-open');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('mobile-menu-active');
            } else {
                navMenu.classList.add('mobile-open');
                mobileMenuToggle.classList.add('active');
                document.body.classList.add('mobile-menu-active');
            }
        });
        
        var navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('mobile-open');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('mobile-menu-active');
            });
        });
        
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && 
                !navMenu.contains(event.target) && 
                navMenu.classList.contains('mobile-open')) {
                navMenu.classList.remove('mobile-open');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('mobile-menu-active');
            }
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 767) {
                navMenu.classList.remove('mobile-open');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('mobile-menu-active');
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMobileMenu);
    } else {
        initializeMobileMenu();
    }
})();
