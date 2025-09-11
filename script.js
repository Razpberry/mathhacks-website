// MathHacks Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Registration Form Handling
    const registrationForm = document.querySelector('.registration-form');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic form validation
            const requiredFields = ['name', 'email', 'level'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`#${field}`);
                if (!input.value.trim()) {
                    showFieldError(input, 'This field is required');
                    isValid = false;
                } else {
                    clearFieldError(input);
                }
            });
            
            // Email validation
            const emailField = this.querySelector('#email');
            if (emailField.value && !isValidEmail(emailField.value)) {
                showFieldError(emailField, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                this.reset();
                
                // In a real application, you would send the data to a server
                console.log('Registration data:', data);
            }
        });
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow based on scroll position
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll (optional feature)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature, .prize-card, .timeline-item, .stat');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Dynamic math symbols animation
    createFloatingMath();

    // Update countdown if event date is set
    // Uncomment and modify the date as needed
    // startCountdown('2024-03-15T18:00:00');

    // Add keyboard navigation support
    addKeyboardNavigation();
});

// Utility Functions

function showFieldError(input, message) {
    clearFieldError(input);
    
    input.style.borderColor = '#ef4444';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

function clearFieldError(input) {
    input.style.borderColor = '';
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            background: #10b981;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            margin: 1rem 0;
            animation: slideInDown 0.5s ease;
        ">
            <h4 style="margin: 0 0 0.5rem 0;">Registration Successful! 🎉</h4>
            <p style="margin: 0;">Thank you for registering for MathHacks 2024. We'll send you more details via email soon!</p>
        </div>
    `;
    
    const form = document.querySelector('.register-form');
    form.insertBefore(successDiv, form.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

function createFloatingMath() {
    const mathSymbols = ['π', '∑', '∆', '∞', '√', '∫', 'φ', 'θ', 'λ', '∂'];
    const hero = document.querySelector('.hero');
    const mathBackground = hero.querySelector('.math-background');
    
    // Add more math symbols dynamically
    for (let i = 0; i < 5; i++) {
        const symbol = document.createElement('span');
        symbol.className = 'floating-math';
        symbol.textContent = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
        symbol.style.top = Math.random() * 100 + '%';
        symbol.style.left = Math.random() * 100 + '%';
        symbol.style.animationDelay = Math.random() * 6 + 's';
        symbol.style.animationDuration = (4 + Math.random() * 4) + 's';
        mathBackground.appendChild(symbol);
    }
}

function startCountdown(targetDate) {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    const target = new Date(targetDate).getTime();
    
    const interval = setInterval(function() {
        const now = new Date().getTime();
        const distance = target - now;
        
        if (distance < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "Event Started!";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Seconds</span>
            </div>
        `;
    }, 1000);
}

function addKeyboardNavigation() {
    // Add keyboard support for FAQ items
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });

    // Add escape key support for mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
}

// Add some mathematical easter eggs
function addMathEasterEggs() {
    // Konami code for math lovers: ↑↑↓↓←→←→BA
    let konamiCode = [];
    const konamiPattern = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiPattern.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiPattern.length && 
            konamiCode.every((key, index) => key === konamiPattern[index])) {
            triggerMathEasterEgg();
            konamiCode = [];
        }
    });
}

function triggerMathEasterEgg() {
    // Add a fun math animation or message
    const easterEgg = document.createElement('div');
    easterEgg.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border: 3px solid var(--primary-color);
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            animation: bounceIn 0.5s ease;
        ">
            <h2 style="color: var(--primary-color); margin: 0 0 1rem 0;">🎉 Math Easter Egg! 🎉</h2>
            <p style="margin: 0 0 1rem 0; font-size: 1.2rem;">e^(iπ) + 1 = 0</p>
            <p style="margin: 0; color: var(--text-secondary);">Euler's Identity - The most beautiful equation in mathematics!</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">
                Amazing! ✨
            </button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        " onclick="this.parentElement.remove()"></div>
    `;
    
    // Add bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceIn {
            0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.05); }
            70% { transform: translate(-50%, -50%) scale(0.9); }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(easterEgg);
    
    // Remove after 10 seconds if not clicked
    setTimeout(() => {
        if (easterEgg.parentNode) {
            easterEgg.remove();
        }
        if (style.parentNode) {
            style.remove();
        }
    }, 10000);
}

// Initialize easter eggs
addMathEasterEggs();

// Add some fun mathematical calculations for the curious
window.mathHacks = {
    // Golden ratio
    phi: (1 + Math.sqrt(5)) / 2,
    
    // Calculate factorial
    factorial: function(n) {
        if (n <= 1) return 1;
        return n * this.factorial(n - 1);
    },
    
    // Calculate Fibonacci number
    fibonacci: function(n) {
        if (n <= 1) return n;
        return this.fibonacci(n - 1) + this.fibonacci(n - 2);
    },
    
    // Calculate prime numbers up to n
    primes: function(n) {
        const sieve = new Array(n + 1).fill(true);
        sieve[0] = sieve[1] = false;
        
        for (let i = 2; i * i <= n; i++) {
            if (sieve[i]) {
                for (let j = i * i; j <= n; j += i) {
                    sieve[j] = false;
                }
            }
        }
        
        return sieve.map((isPrime, index) => isPrime ? index : null)
                   .filter(val => val !== null);
    },
    
    // Fun message
    greet: function() {
        console.log('Welcome to MathHacks! 🧮✨');
        console.log('Try calling mathHacks.fibonacci(10) or mathHacks.primes(50) in the console!');
    }
};

// Greet developers who open the console
mathHacks.greet();