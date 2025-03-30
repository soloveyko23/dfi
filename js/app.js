/*
(i) Код потрапляє у підсумковий файл,
тільки коли викликана функція,
наприклад flsFunctions.spollers();
Або коли імпортовано весь файл,
наприклад, import "files/script.js";
Невикористовуваний (не викликаний)
код у підсумковий файл не потрапляє.

Якщо ми хочемо додати модуль
слід його розкоментувати
*/

// Увімкнути/вимкнути FLS (Full Logging System) (в роботі)
window['FLS'] = true;

// Підключення основного файлу стилів
import "../scss/style.scss";

// Импортируем все компоненты Bootstrap, которые могут использоваться
import * as bootstrap from 'bootstrap';

// Инициализация компонентов Bootstrap при загрузке DOM
document.addEventListener('DOMContentLoaded', function () {
  // Активация всех выпадающих меню
  const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
  const dropdownList = [...dropdownElementList].map(dropdownToggleEl => 
    new bootstrap.Dropdown(dropdownToggleEl)
  );

  // Правильная инициализация оффканваса
  const offcanvasElementList = document.querySelectorAll('.offcanvas');
  const offcanvasList = [...offcanvasElementList].map(offcanvasEl => {
    const offcanvasInstance = new bootstrap.Offcanvas(offcanvasEl, {
      backdrop: true,
      scroll: false
    });
    
    // Добавляем обработчики для анимации иконки меню
    offcanvasEl.addEventListener('show.bs.offcanvas', function() {
      // Находим все кнопки меню и добавляем активный класс
      const menuButtons = document.querySelectorAll('.icon-menu');
      menuButtons.forEach(btn => btn.classList.add('_active'));
    });
    
    offcanvasEl.addEventListener('hide.bs.offcanvas', function() {
      // Удаляем активный класс с кнопок меню
      const menuButtons = document.querySelectorAll('.icon-menu');
      menuButtons.forEach(btn => btn.classList.remove('_active'));
    });
    
    return offcanvasInstance;
  });

  // Инициализация триггеров для оффканваса
  const offcanvasTriggers = document.querySelectorAll('[data-bs-toggle="offcanvas"]');
  offcanvasTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('data-bs-target') || this.getAttribute('href');
      if (target) {
        // Находим текущий открытый оффканвас
        const currentOffcanvas = document.querySelector('.offcanvas.show');
        
        // Закрываем текущий оффканвас перед открытием нового
        if (currentOffcanvas && currentOffcanvas.id !== target.substring(1)) {
          const currentInstance = bootstrap.Offcanvas.getInstance(currentOffcanvas);
          if (currentInstance) {
            // Устанавливаем флаг, что нужно открыть другой оффканвас после закрытия текущего
            currentInstance._element.setAttribute('data-next-offcanvas', target);
            currentInstance.hide();
            return;
          }
        }
        
        // Открываем новый оффканвас
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(document.querySelector(target)) || 
                             new bootstrap.Offcanvas(document.querySelector(target), {backdrop: true});
        offcanvasInstance.show();
      }
    });
  });

  // Обработчик события закрытия оффканваса
  document.querySelectorAll('.offcanvas').forEach(function(offcanvasEl) {
    offcanvasEl.addEventListener('hidden.bs.offcanvas', function() {
      // Проверяем, нужно ли открыть другой оффканвас
      const nextOffcanvas = this.getAttribute('data-next-offcanvas');
      if (nextOffcanvas) {
        // Удаляем атрибут, чтобы избежать циклических открытий
        this.removeAttribute('data-next-offcanvas');
        
        // Открываем следующий оффканвас
        const nextInstance = bootstrap.Offcanvas.getInstance(document.querySelector(nextOffcanvas)) || 
                          new bootstrap.Offcanvas(document.querySelector(nextOffcanvas), {backdrop: true});
        setTimeout(() => {
          nextInstance.show();
        }, 50); // Небольшая задержка для избежания проблем с анимацией
      }
    });
  });

  // Инициализация кнопки мобильного меню
  const mobileMenuBtns = document.querySelectorAll('.icon-menu');
  mobileMenuBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.getAttribute('data-bs-target') || '#mobileMenu';
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(targetElement) || 
                               new bootstrap.Offcanvas(targetElement, {backdrop: true});
        offcanvasInstance.show();
      }
    });
  });

  // Активация кнопки категорий в хедере
  const categoryBtn = document.querySelector('.btn-category');
  if (categoryBtn) {
    categoryBtn.addEventListener('click', function() {
      const submenuCanvas = document.querySelector('#submenuCanvas');
      if (submenuCanvas) {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(submenuCanvas) || 
                               new bootstrap.Offcanvas(submenuCanvas, {backdrop: true});
        offcanvasInstance.show();
      }
    });
  }

  // Активация коллапсов для мобильного меню
  const collapseElementList = document.querySelectorAll('.collapse');
  const collapseList = [...collapseElementList].map(collapseEl => 
    new bootstrap.Collapse(collapseEl, { toggle: false })
  );

  // Тултипы (если есть)
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => 
    new bootstrap.Tooltip(tooltipTriggerEl)
  );

  // Поповеры (если есть)
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => 
    new bootstrap.Popover(popoverTriggerEl)
  );
});

//============================================================================================================================================================================================================================================
// React ========================================================================================================================================================================================================================================================
//============================================================================================================================================================================================================================================
// import Index from './react/Index.jsx';
//============================================================================================================================================================================================================================================

// ========================================================================================================================================================================================================================================================
// Функціонал ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
import * as flsFunctions from "./files/functions.js";

/* Перевірка підтримки webp, додавання класу webp або no-webp для HTML */
/* (i) необхідно для коректного відображення webp із css */
flsFunctions.isWebp();
/* Додавання класу touch для HTML якщо браузер мобільний */
flsFunctions.addTouchClass();
/* Додавання loaded для HTML після повного завантаження сторінки */
flsFunctions.addLoadedClass();
/* Модуль для роботи з меню (Бургер) */
// flsFunctions.menuInit();
/* Форматування чисел */
// import './libs/wNumb.min.js';

/*
Модуль "Спойлери"
Документація: https://template.fls.guru/template-docs/modul-spojlery.html
Сніппет (HTML): spollers
*/
// flsFunctions.spollers();

/*
Модуль "Таби"
Документація: https://template.fls.guru/template-docs/modul-taby.html
Сніппет (HTML): tabs
*/
//flsFunctions.tabs();

/*
Модуль "Показати ще"
Документація: https://template.fls.guru/template-docs/modul-pokazat-eshhjo.html
Сніппет (HTML): showmore
*/
// flsFunctions.showMore();

/*
Модуль "До/Після"
Документація: https://template.fls.guru/template-docs/modul-do-pislia.html
Сніппет (HTML): ba
*/
// import './libs/beforeafter.js';

/*
Модуль "Ефект хвиль"
Документация: https://template.fls.guru/template-docs/modul-ripple-effect.html
Сниппет (HTML):
*/
// flsFunctions.rippleEffect();

/*
Модуль "Кастомний курсор"
Документация:
Сниппет (HTML):
*/
// flsFunctions.customCursor(true);

/*
Модуль "Бігучий рядок" (Alpha)
Документация:
Сниппет (HTML):
*/
// import './libs/keywords.js'

/*
Модуль "Попапи"
Документація: https://template.fls.guru/template-docs/funkcional-popup.html
Сніппет (HTML): pl, pop
*/
// import './libs/popup.js'

/*
Модуль паралаксу мишею
Документація: https://template.fls.guru/template-docs/modul-animacii-parallaks-obektov-pri-dvizhenii-myshi.html
*/
// import './libs/parallax-mouse.js'

// ========================================================================================================================================================================================================================================================
// Робота з формами ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
import * as flsForms from "./files/forms/forms.js";

/* Робота з полями форми */
/* Документація: https://template.fls.guru/template-docs/rabota-s-formami.html */
/*
flsForms.formFieldsInit({
	viewPass: false,
	autoHeight: false
});
*/
/* Надсилання форми */
/* Документація: https://template.fls.guru/template-docs/rabota-s-formami.html */
// flsForms.formSubmit();

/* Модуль форми "кількість" */
// flsForms.formQuantity();

/* Модуль зіркового рейтингу */
// flsForms.formRating();

/* Модуль роботи з select. */
// import './libs/select.js'

/* Модуль роботи з календарем */
// import './files/forms/datepicker.js'

/* (У роботі) Модуль роботи з масками.*/
/*
Підключення та налаштування виконується у файлі js/files/forms/inputmask.js
Документація по роботі у шаблоні:
Документація плагіна: https://github.com/RobinHerbots/inputmask
Сніппет(HTML):
*/
// import "./files/forms/inputmask.js";

/* Модуль роботи з повзунком */
/*
Підключення та налаштування виконується у файлі js/files/forms/range.js
Документація по роботі у шаблоні:
Документація плагіна: https://refreshless.com/nouislider/
Сніппет (HTML): range
*/
// import "./files/forms/range.js";

/* Модуль роботи з підказками (tippy) */
/*
Підключення плагіна Tippy.js та налаштування виконується у файлі js/files/tippy.js
Документація по роботі у шаблоні:
Документація плагіна: https://atomiks.github.io/tippyjs/
Сніппет (HTML): tip (додає атрибут з підказкою для html тега)
*/
// import "./files/tippy.js";

// ========================================================================================================================================================================================================================================================
// Робота зі слайдером (Swiper) ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/*
Налаштування підключення плагіна слайдера Swiper та нових слайдерів виконується у файлі js/files/sliders.js
Документація по роботі у шаблоні: https://template.fls.guru/template-docs/rabota-so-slajderom-swiper.html
Документація плагіна: https://swiperjs.com/
Сніппет(HTML): swiper
*/
// import "./files/sliders.js";

// ========================================================================================================================================================================================================================================================
// Модулі роботи з прокручуванням сторінки ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================

/*
Зміна дизайну скроллбару
Документація по роботі у шаблоні: У HTML додаємо до блоку атрибут data-simplebar
Документація плагіна: https://github.com/Grsmto/simplebar/tree/master/packages/simplebar
Сніппет(HTML): 
*/
// import './files/scroll/simplebar.js';

// Ліниве (відкладене) завантаження картинок
// Документація по роботі у шаблоні: https://template.fls.guru/template-docs/modul-lenivaya-podgruzka-lazy-loading.html
// Документація плагіна: https://github.com/verlok/vanilla-lazyload
// Сніппет(HTML):
// import './files/scroll/lazyload.js';

// Спостерігач за об'єктами з атрибутом data-watch
// Документація: https://template.fls.guru/template-docs/modul-nabljudatel-za-poyavleniem-elementa-pri-skrolle.html
// Сніппет(HTML):
// import './libs/watcher.js'

// Модуль поекранної прокрутки
// Документація: https://template.fls.guru/template-docs/modul-poekrannoj-prokrutki-stranicy-fullpage.html
// Сніппет(HTML):
// import './libs/fullpage.js'

// Модуль паралаксу
// Документація: https://template.fls.guru/template-docs/paralaks-pri-skroli.html
// Сніппет(HTML):
// import './libs/parallax.js'

// Функції роботи скролом
import * as flsScroll from "./files/scroll/scroll.js";

// Плавна навігація по сторінці
// Документація: https://template.fls.guru/template-docs/modul-plavnoj-navigacii-po-stranice.html
// flsScroll.pageNavigation();

// Функціонал додавання класів до хедеру під час прокручування
// Документація: https://template.fls.guru/template-docs/modul-dobavleniya-klassov-k-shapke-pri-prokrutke-stranicy.html
// flsScroll.headerScroll();

// Модуль анімація цифрового лічильника
// Документація: https://template.fls.guru/template-docs/modul-animacii-cifrovogo-lichilnika.html
// Сніппет(HTML):
// flsScroll.digitsCounter();

// ========================================================================================================================================================================================================================================================
// Галерея ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/*
Документація по роботі у шаблоні: 
Документація плагіна: https://www.lightgalleryjs.com/docs/
Сніппет(HTML):
*/
// import "./files/gallery.js";

// ========================================================================================================================================================================================================================================================
// Масонрі сітка ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/*
Документація по роботі у шаблоні:
Документація плагіна: 
Сніппет(HTML):
*/
// import "./files/isotope.js";


// ========================================================================================================================================================================================================================================================
// Google Maps ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
// import "./files/map.js";


// ========================================================================================================================================================================================================================================================
// Інші плагіни ============================================================================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================

/* Динамічний адаптив */
// Документація: https://template.fls.guru/template-docs/dinamicheskij-adaptiv.html
// import "./libs/dynamic_adapt.js";

// ========================================================================================================================================================================================================================================================
// Інше ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/* Підключаємо файли зі своїм кодом */
import "./files/script.js";
//============================================================================================================================================================================================================================================
