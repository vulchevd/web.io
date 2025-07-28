// Main JavaScript file for the website

// Language-specific validation messages
const validationMessages = {
  en: {
    nameRequired: "Please enter your name",
    emailRequired: "Please enter a valid email address",
    messageRequired: "Please enter your message",
    thankYou: "Thank you for your message! We will get back to you soon."
  },
  bg: {
    nameRequired: "Моля, въведете вашето име",
    emailRequired: "Моля, въведете валиден имейл адрес",
    messageRequired: "Моля, въведете вашето съобщение",
    thankYou: "Благодарим за вашето съобщение! Ще се свържем с вас скоро."
  },
  ru: {
    nameRequired: "Пожалуйста, введите ваше имя",
    emailRequired: "Пожалуйста, введите действительный адрес электронной почты",
    messageRequired: "Пожалуйста, введите ваше сообщение",
    thankYou: "Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время."
  }
};

// Check if we're using file:// protocol
const isFileProtocol = window.location.protocol === 'file:';

// Get current language from URL
function getCurrentLanguage() {
  const path = window.location.pathname;
  
  if (isFileProtocol) {
    // For file:// URLs, check if the path contains /bg/ or /ru/ folders
    if (path.includes('/bg/') || path.includes('\\bg\\')) {
      return 'bg';
    } else if (path.includes('/ru/') || path.includes('\\ru\\')) {
      return 'ru';
    } else {
      return 'en';
    }
  } else {
    // For http:// URLs
    if (path.includes('/bg/') || path === '/bg') {
      return 'bg';
    } else if (path.includes('/ru/') || path === '/ru') {
      return 'ru';
    } else {
      return 'en';
    }
  }
}

// Generate language-specific URL for cookie policy
function getCookiePolicyUrl(lang) {
  if (isFileProtocol) {
    if (lang === 'en') {
      return 'cookie-policy.html';
    } else {
      const path = window.location.pathname;
      const basePath = path.substring(0, path.lastIndexOf('/'));
      
      if (basePath.endsWith('/bg') || basePath.endsWith('\\bg') || 
          basePath.endsWith('/ru') || basePath.endsWith('\\ru')) {
        return '../cookie-policy.html';
      } else {
        return lang + '/cookie-policy.html';
      }
    }
  } else {
    return lang === 'en' ? '/cookie-policy.html' : `/${lang}/cookie-policy.html`;
  }
}

// Utility functions
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Make sure components are properly initialized
document.addEventListener('DOMContentLoaded', () => {
  // Handle mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = mainNav?.contains(event.target);
    const isClickOnToggle = menuToggle?.contains(event.target);
    
    if (mainNav?.classList.contains('active') && !isClickInsideMenu && !isClickOnToggle) {
      mainNav.classList.remove('active');
      menuToggle?.classList.remove('active');
    }
  });

  // Image lazy loading
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.removeAttribute('data-src');
          imageObserver.unobserve(image);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });
});

// Form validation for contact form
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    const currentLang = getCurrentLanguage();
    const messages = validationMessages[currentLang];
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Reset error messages
      document.querySelectorAll('.error-message').forEach(el => el.remove());
      document.querySelectorAll('.form-group .error').forEach(el => el.classList.remove('error'));
      
      // Validate name
      if (!nameInput.value.trim()) {
        showError(nameInput, messages.nameRequired);
        isValid = false;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        showError(emailInput, messages.emailRequired);
        isValid = false;
      }
      
      // Validate message
      if (!messageInput.value.trim()) {
        showError(messageInput, messages.messageRequired);
        isValid = false;
      }
      
      if (isValid) {
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = messages.thankYou;
        
        contactForm.reset();
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  }
  
  function showError(input, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
    input.classList.add('error');
  }
});

// Cookie consent banner
document.addEventListener('DOMContentLoaded', () => {
  const cookieConsent = localStorage.getItem('cookieConsent');
  const currentLang = getCurrentLanguage();
  
  if (!cookieConsent) {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    
    let cookieText, acceptText, declineText, policyLink;
    
    if (currentLang === 'bg') {
      cookieText = 'Използваме бисквитки, за да подобрим вашето изживяване на нашия уебсайт. Продължавайки да разглеждате, вие се съгласявате с нашата';
      acceptText = 'Приемам';
      declineText = 'Отказвам';
      policyLink = getCookiePolicyUrl('bg');
    } else if (currentLang === 'ru') {
      cookieText = 'Мы используем файлы cookie для улучшения вашего опыта на нашем веб-сайте. Продолжая просмотр, вы соглашаетесь с нашей';
      acceptText = 'Принять';
      declineText = 'Отклонить';
      policyLink = getCookiePolicyUrl('ru');
    } else {
      cookieText = 'We use cookies to enhance your experience on our website. By continuing to browse, you agree to our';
      acceptText = 'Accept';
      declineText = 'Decline';
      policyLink = getCookiePolicyUrl('en');
    }
    
    banner.innerHTML = `
      <div class="cookie-content">
        <p>${cookieText} <a href="${policyLink}">${currentLang === 'en' ? 'Cookie Policy' : currentLang === 'bg' ? 'Политика за бисквитки' : 'Политика использования файлов cookie'}</a>.</p>
        <div class="cookie-buttons">
          <button id="accept-cookies" class="btn btn-accent">${acceptText}</button>
          <button id="decline-cookies" class="btn btn-secondary">${declineText}</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(banner);
    
    document.getElementById('accept-cookies').addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      banner.remove();
    });
    
    document.getElementById('decline-cookies').addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      banner.remove();
    });
  }
}); 