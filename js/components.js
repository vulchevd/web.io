// Reusable components for the website

// Language translations
const translations = {
  en: {
    home: "Home",
    apartments: "Apartments",
    parking: "Parking",
    about: "About Us",
    contact: "Contact",
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookie Policy"
    },
    footer: {
      contactUs: "Contact Us",
      quickLinks: "Quick Links",
      legal: "Legal",
      copyright: "All rights reserved."
    }
  },
  bg: {
    home: "Начало",
    apartments: "Апартаменти",
    parking: "Паркинг",
    about: "За нас",
    contact: "Контакти",
    legal: {
      privacy: "Политика за поверителност",
      terms: "Условия за ползване",
      cookies: "Политика за бисквитки"
    },
    footer: {
      contactUs: "Контакти",
      quickLinks: "Бързи връзки",
      legal: "Правни",
      copyright: "Всички права запазени."
    }
  },
  ru: {
    home: "Главная",
    apartments: "Апартаменты",
    parking: "Парковка",
    about: "О нас",
    contact: "Контакты",
    legal: {
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
      cookies: "Политика использования файлов cookie"
    },
    footer: {
      contactUs: "Связаться с нами",
      quickLinks: "Быстрые ссылки",
      legal: "Юридическая информация",
      copyright: "Все права защищены."
    }
  }
};

// Check if we're using file:// protocol
const isFileProtocol = window.location.protocol === 'file:';
// Get the base URL for the site (empty for root-level hosting)
const baseUrl = '';

// Detect current language from URL
function getCurrentLanguage() {
  const path = window.location.pathname;
  
  if (path.includes('/bg/') || path.includes('\\bg\\')) {
    return 'bg';
  } else if (path.includes('/ru/') || path.includes('\\ru\\')) {
    return 'ru';
  } else {
    return 'en';
  }
}

// Generate language-specific URL
function getLanguageUrl(targetLang) {
  const currentPath = window.location.pathname;
  const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  const currentLang = getCurrentLanguage();
  
  // Extract the current file name
  let baseName = filename;
  if (!baseName.endsWith('.html') && baseName !== '') {
    baseName += '.html';
  }
  if (baseName === '') {
    baseName = 'index.html';
  }
  
  if (isFileProtocol) {
    // File protocol handling (for local development)
    if (targetLang === 'en') {
      // If we're in a language folder, go up one level
      if (currentLang !== 'en') {
        return '../' + baseName;
      } else {
        return baseName;
      }
    } else {
      // If we're already in the target language folder
      if (currentLang === targetLang) {
        return baseName;
      }
      
      // If we're in English (root)
      if (currentLang === 'en') {
        return targetLang + '/' + baseName;
      }
      
      // If we're in a different language folder
      return '../' + targetLang + '/' + baseName;
    }
  } else {
    // For web hosting URLs
    if (baseName === 'index.html' || baseName === '') {
      if (targetLang === 'en') {
        return baseUrl + '/';
      } else {
        return baseUrl + '/' + targetLang + '/';
      }
    }
    
    // For other pages
    if (targetLang === 'en') {
      return baseUrl + '/' + baseName;
    } else {
      return baseUrl + '/' + targetLang + '/' + baseName;
    }
  }
}

// Get image path based on current language
function getImagePath(imageName) {
  const currentLang = getCurrentLanguage();
  
  if (isFileProtocol) {
    if (currentLang === 'en') {
      return `images/${imageName}`;
    } else {
      return `../images/${imageName}`;
    }
  } else {
    // For web hosting
    if (currentLang === 'en') {
      return baseUrl + `/images/${imageName}`;
    } else {
      return baseUrl + `/images/${imageName}`;
    }
  }
}

// Get correct path for a page based on current language
function getPagePath(pageName, lang) {
  const currentLang = lang || getCurrentLanguage();
  
  if (isFileProtocol) {
    if (currentLang === 'en') {
      return pageName;
    } else {
      return pageName;
    }
  } else {
    // For web hosting
    if (currentLang === 'en') {
      return baseUrl + '/' + pageName;
    } else {
      return baseUrl + '/' + currentLang + '/' + pageName;
    }
  }
}

// Header Component
function loadHeader() {
  const currentLang = getCurrentLanguage();
  const t = translations[currentLang];
  
  const header = document.createElement('header');
  header.innerHTML = `
    <div class="header-container">
      <div class="logo-menu-container">
        <a href="${currentLang === 'en' ? (isFileProtocol ? 'index.html' : baseUrl + '/') : (isFileProtocol ? '../index.html' : baseUrl + '/' + currentLang + '/')}" class="logo">
          <span class="logo-text">Briliant Properties</span>
        </a>
        <div class="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <nav class="main-nav">
        <ul>
          <li><a href="${currentLang === 'en' ? (isFileProtocol ? 'index.html' : baseUrl + '/') : (isFileProtocol ? '../index.html' : baseUrl + '/' + currentLang + '/')}">${t.home}</a></li>
          <li><a href="${getPagePath('apartments.html', currentLang)}">${t.apartments}</a></li>
          <li><a href="${getPagePath('parking.html', currentLang)}">${t.parking}</a></li>
          <li><a href="${getPagePath('about.html', currentLang)}">${t.about}</a></li>
          <li><a href="${getPagePath('contact.html', currentLang)}">${t.contact}</a></li>
        </ul>
      </nav>
      <div class="language-switcher">
        <a href="${getLanguageUrl('bg')}" class="${currentLang === 'bg' ? 'active' : ''}">
          <img src="${getImagePath('bg-flag.png')}" alt="Bulgarian" />
        </a>
        <a href="${getLanguageUrl('ru')}" class="${currentLang === 'ru' ? 'active' : ''}">
          <img src="${getImagePath('ru-flag.png')}" alt="Russian" />
        </a>
        <a href="${getLanguageUrl('en')}" class="${currentLang === 'en' ? 'active' : ''}">
          <img src="${getImagePath('uk-flag.png')}" alt="English" />
        </a>
      </div>
    </div>
  `;

  // Add event listener for mobile menu toggle
  setTimeout(() => {
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
  }, 100);

  return header;
}

// Footer Component
function loadFooter() {
  const currentLang = getCurrentLanguage();
  const t = translations[currentLang];
  
  // Define contact information based on language
  let ceoTitle = "";
  let gmTitle = "";
  let address = "";
  
  if (currentLang === 'en') {
    ceoTitle = "CEO: ";
    gmTitle = "GM: ";
    address = "St.St. Cyril and Methodius Str., 8238 Ravda, Office Building next to Lidl";
  } else if (currentLang === 'bg') {
    ceoTitle = "Изпълнителен директор: ";
    gmTitle = "Генерален мениджър: ";
    address = "улица Св. Св. Кирил и Методий, 8238 Равда, Офис Сграда до Лидл";
  } else {
    ceoTitle = "Генеральный директор: ";
    gmTitle = "Управляющий директор: ";
    address = "ул. Св. Св. Кирилла и Мефодия, 8238 Равда, Офисное здание рядом с Лидл";
  }
  
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-section contact-info">
        <h3>${t.footer.contactUs}</h3>
        <div class="footer-contact-item">
          <i class="icon-phone"></i>
          <p>${ceoTitle}Румен Стефанов - +35988555055</p>
        </div>
        <div class="footer-contact-item">
          <i class="icon-phone"></i>
          <p>${gmTitle}Станислав Стефанов - +3598889622277</p>
        </div>
        <div class="footer-contact-item">
          <i class="icon-email"></i>
          <p>office@briliant.bg</p>
        </div>
        <div class="footer-contact-item">
          <i class="icon-location"></i>
          <p>${address}</p>
        </div>
      </div>
      <div class="footer-section quick-links">
        <h3>${t.footer.quickLinks}</h3>
        <ul>
          <li><a href="${currentLang === 'en' ? (isFileProtocol ? 'index.html' : baseUrl + '/') : (isFileProtocol ? '../index.html' : baseUrl + '/' + currentLang + '/')}">${t.home}</a></li>
          <li><a href="${getPagePath('apartments.html', currentLang)}">${t.apartments}</a></li>
          <li><a href="${getPagePath('parking.html', currentLang)}">${t.parking}</a></li>
          <li><a href="${getPagePath('about.html', currentLang)}">${t.about}</a></li>
          <li><a href="${getPagePath('contact.html', currentLang)}">${t.contact}</a></li>
        </ul>
      </div>
      <div class="footer-section legal-links">
        <h3>${t.footer.legal}</h3>
        <ul>
          <li><a href="${getPagePath('privacy-policy.html', currentLang)}">${t.legal.privacy}</a></li>
          <li><a href="${getPagePath('terms-of-service.html', currentLang)}">${t.legal.terms}</a></li>
          <li><a href="${getPagePath('cookie-policy.html', currentLang)}">${t.legal.cookies}</a></li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <p>&copy; ${new Date().getFullYear()} Briliant Properties. ${t.footer.copyright}</p>
    </div>
  `;
  return footer;
}

// Initialize components
function initComponents() {
  // Make sure we only run this once
  if (window.componentsInitialized) return;
  window.componentsInitialized = true;
  
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  
  if (headerPlaceholder) {
    headerPlaceholder.replaceWith(loadHeader());
  } else {
    // If no placeholder exists, but there's an existing header, replace it
    const existingHeader = document.querySelector('header');
    if (existingHeader) {
      existingHeader.replaceWith(loadHeader());
    } else {
      // If no header exists at all, add one at the beginning of the body
      document.body.prepend(loadHeader());
    }
  }
  
  if (footerPlaceholder) {
    footerPlaceholder.replaceWith(loadFooter());
  } else {
    // If no placeholder exists, but there's an existing footer, replace it
    const existingFooter = document.querySelector('footer');
    if (existingFooter) {
      existingFooter.replaceWith(loadFooter());
    } else {
      // If no footer exists at all, add one at the end of the body
      document.body.appendChild(loadFooter());
    }
  }
  
  // Mark the current page in the navigation
  const currentPath = window.location.pathname;
  const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  
  setTimeout(() => {
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      const linkFilename = linkHref.substring(linkHref.lastIndexOf('/') + 1);
      
      if (linkFilename === filename || 
          (filename === '' && linkFilename === '') ||
          (filename === '' && linkFilename === 'index.html') ||
          (filename === 'index.html' && (linkFilename === '' || linkFilename === 'index.html'))) {
        link.classList.add('active');
      }
    });
  }, 100);
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initComponents); 