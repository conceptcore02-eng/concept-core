document.addEventListener("DOMContentLoaded", function () {
    
    /* --- 1. Navbar Scroll Effect --- */
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* --- 2. Portfolio Filter Logic (Only runs on Projects Page) --- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                
                // 1. Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'btn-neon');
                    btn.classList.add('btn-outline-light');
                });

                // 2. Add active class to clicked button
                button.classList.remove('btn-outline-light');
                button.classList.add('active', 'btn-neon');

                // 3. Filter Items
                const filterValue = button.getAttribute('data-filter');

                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        // Add animation
                        item.classList.remove('fade-in');
                        void item.offsetWidth; // Trigger reflow to restart animation
                        item.classList.add('fade-in');
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    /* --- 3. Active Link Highlighter --- */
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-link');
    const menuLength = menuItem.length;
    
    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem.forEach(item => item.classList.remove('active', 'text-neon'));
            menuItem[i].classList.add('active', 'text-neon');
        }
    }
});