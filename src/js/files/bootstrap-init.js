// Инициализация компонентов Bootstrap 5
import * as bootstrap from 'bootstrap';
import { bootstrapConfig } from './bootstrap-config.js';

console.log('Bootstrap v' + bootstrap.Dropdown.VERSION);

class BootstrapManager {
  constructor() {
    this.instances = {
      dropdowns: [],
      offcanvas: [],
      tooltips: [],
      popovers: [],
      collapses: [],
      modals: [],
      tabs: [],
      toasts: [],
      carousels: [],
    };

    // Инициализируем компоненты при загрузке DOM
    document.addEventListener('DOMContentLoaded', this.initAll.bind(this));
  }

  /**
   * Инициализация всех стандартных компонентов Bootstrap
   */
  initAll() {
    console.log('Инициализация компонентов Bootstrap...');
    this.initDropdowns();
    this.initOffcanvas();
    this.initTooltips();
    this.initModals();
    console.log('Инициализация компонентов Bootstrap завершена.', this.instances);
  }

  /**
   * Инициализация Dropdowns
   * Находит [data-bs-toggle="dropdown"] и инициализирует с настройками из bootstrapConfig.dropdown
   * Для data-bs-trigger="hover" просто добавляет CSS-класс и не создает экземпляр Bootstrap Dropdown
   */
  initDropdowns() {
    const elements = document.querySelectorAll('[data-bs-toggle="dropdown"]');
    
    // Массив для хранения элементов, которые НЕ будут управляться через hover
    const nonHoverElements = [];
    
    // Хранилище для экземпляров дропдаунов, чтобы иметь возможность управлять ими
    const hoverDropdownInstances = new Map();
  
    // 1. Обрабатываем все элементы
    elements.forEach(el => {
      const customTrigger = el.getAttribute('data-bs-trigger');
      
      // Если у элемента есть триггер hover
      if (customTrigger && customTrigger.includes('hover')) {
        // Находим ближайший родительский .dropdown
        const dropdownContainer = el.closest('.dropdown');
        if (dropdownContainer) {
          // На десктопах полностью отключаем стандартное поведение Bootstrap
          // и используем только CSS для hover
          if (window.innerWidth > 992) {
            // Полная блокировка стандартного поведения на десктопах
            el.addEventListener('click', (e) => {
              if (window.innerWidth > 992) {
                e.preventDefault();
                e.stopPropagation();
                return false; // Полностью останавливаем событие
              }
            }, true); // Используем capture phase для перехвата до обработки Bootstrap
            
            // На случай, если событие всё же сработает, предотвращаем добавление класса show
            dropdownContainer.addEventListener('show.bs.dropdown', (e) => {
              if (window.innerWidth > 992) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            }, true);
            
            // Добавляем CSS-класс для hover-эффекта
            dropdownContainer.classList.add('dropdown-hover-css');
          }
          
          // Создаем экземпляр дропдауна только для мобильных устройств
          const mobileConfig = { ...bootstrapConfig.dropdown };
          const mobileDropdown = new bootstrap.Dropdown(el, mobileConfig);
          
          // Сохраняем экземпляр
          hoverDropdownInstances.set(el, mobileDropdown);
          
          // Отслеживаем resize для переключения режимов
          window.addEventListener('resize', () => {
            if (window.innerWidth <= 992) {
              // Для мобильного - обычный клик
              dropdownContainer.classList.remove('dropdown-hover-css');
              dropdownContainer.classList.add('dropdown-click-only');
            } else {
              // Для десктопа - hover-эффект
              dropdownContainer.classList.add('dropdown-hover-css');
              dropdownContainer.classList.remove('dropdown-click-only');
              
              // Если открыт на мобильном, закрываем при переходе на десктоп
              if (dropdownContainer.classList.contains('show')) {
                mobileDropdown.hide();
              }
            }
          });
          
          // Начальная установка классов в зависимости от размера экрана
          if (window.innerWidth <= 992) {
            dropdownContainer.classList.remove('dropdown-hover-css');
            dropdownContainer.classList.add('dropdown-click-only');
          } else {
            dropdownContainer.classList.add('dropdown-hover-css');
            dropdownContainer.classList.remove('dropdown-click-only');
          }
        }
      } else {
        // Если это не hover-элемент, добавляем его в массив для инициализации
        nonHoverElements.push(el);
      }
    });
    
    // 2. Инициализируем только НЕ hover дропдауны стандартным способом
    this.instances.dropdowns = nonHoverElements.map(el => {
      const config = { ...bootstrapConfig.dropdown };
      
      // Проверяем атрибут trigger и устанавливаем конфигурацию
      const customTrigger = el.getAttribute('data-bs-trigger');
      const validTriggers = ['click', 'focus', 'manual'];
      
      if (customTrigger) {
        const triggers = customTrigger.split(' ')
                      .filter(t => validTriggers.includes(t));
        if (triggers.length > 0) {
          config.trigger = triggers.join(' ');
        }
      }
      
      // Создаем экземпляр Bootstrap Dropdown только для не-hover элементов
      return new bootstrap.Dropdown(el, config);
    });
    
    // Добавляем экземпляры hover-элементов в общий массив
    hoverDropdownInstances.forEach(instance => {
      this.instances.dropdowns.push(instance);
    });
  }
  

  /**
   * Инициализация Offcanvas
   * Находит элементы с классом .offcanvas и инициализирует с настройками из bootstrapConfig.offcanvas
   * Также настраивает цепочки offcanvas и кнопки для их открытия
   */
  initOffcanvas() {
    // 1. Инициализация всех offcanvas элементов
    const elements = document.querySelectorAll('.offcanvas');
    this.instances.offcanvas = [...elements].map(el => 
      new bootstrap.Offcanvas(el, bootstrapConfig.offcanvas)
    );
    
    // 2. Инициализация триггеров для offcanvas
    this.setupOffcanvasTriggers();
    
    // 3. Инициализация обработчиков закрытия и цепочек offcanvas
    this.setupOffcanvasChaining();
    
    // 4. Настройка кнопок мобильного меню
    this.setupMobileMenu();
    
    // 5. Настройка кнопки категорий (если есть)
    this.setupCategoryButton();
  }
  
  /**
   * Настройка триггеров для offcanvas элементов
   * Позволяет делать цепочки offcanvas (закрывая предыдущий и открывая новый)
   */
  setupOffcanvasTriggers() {
    const offcanvasTriggers = document.querySelectorAll('[data-bs-toggle="offcanvas"]');
    offcanvasTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const target = trigger.getAttribute('data-bs-target') || trigger.getAttribute('href');
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
          const targetElement = document.querySelector(target);
          if (targetElement) {
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(targetElement) || 
                                   new bootstrap.Offcanvas(targetElement, bootstrapConfig.offcanvas);
            offcanvasInstance.show();
          }
        }
      });
    });
  }
  
  /**
   * Настройка цепочек offcanvas (открытие следующего после закрытия предыдущего)
   */
  setupOffcanvasChaining() {
    document.querySelectorAll('.offcanvas').forEach(offcanvasEl => {
      offcanvasEl.addEventListener('hidden.bs.offcanvas', function() {
        // Проверяем, нужно ли открыть другой оффканвас
        const nextOffcanvas = this.getAttribute('data-next-offcanvas');
        if (nextOffcanvas) {
          // Удаляем атрибут, чтобы избежать циклических открытий
          this.removeAttribute('data-next-offcanvas');
          
          // Открываем следующий оффканвас
          const nextElement = document.querySelector(nextOffcanvas);
          if (nextElement) {
            const nextInstance = bootstrap.Offcanvas.getInstance(nextElement) || 
                              new bootstrap.Offcanvas(nextElement, bootstrapConfig.offcanvas);
            setTimeout(() => {
              nextInstance.show();
            }, 50); // Небольшая задержка для избежания проблем с анимацией
          }
        }
      });
      
      // Настройка анимации иконки меню при открытии/закрытии offcanvas
      offcanvasEl.addEventListener('show.bs.offcanvas', () => {
        // Находим все кнопки меню и добавляем активный класс
        const menuButtons = document.querySelectorAll('.icon-menu');
        menuButtons.forEach(btn => btn.classList.add('_active'));
      });
      
      offcanvasEl.addEventListener('hide.bs.offcanvas', () => {
        // Удаляем активный класс с кнопок меню
        const menuButtons = document.querySelectorAll('.icon-menu');
        menuButtons.forEach(btn => btn.classList.remove('_active'));
      });
    });
  }
  
  /**
   * Настройка кнопки мобильного меню
   */
  setupMobileMenu() {
    const mobileMenuBtns = document.querySelectorAll('.icon-menu');
    mobileMenuBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const targetId = this.getAttribute('data-bs-target') || '#mobileMenu';
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(targetElement) || 
                                 new bootstrap.Offcanvas(targetElement, bootstrapConfig.offcanvas);
          offcanvasInstance.show();
        }
      });
    });
  }
  
  /**
   * Настройка кнопки категорий в хедере (если она есть)
   */
  // setupCategoryButton() {
  //   const categoryBtn = document.querySelector('.btn-category');
  //   if (categoryBtn) {
  //     categoryBtn.addEventListener('click', function() {
  //       const submenuCanvas = document.querySelector('#submenuCanvas');
  //       if (submenuCanvas) {
  //         const offcanvasInstance = bootstrap.Offcanvas.getInstance(submenuCanvas) || 
  //                                new bootstrap.Offcanvas(submenuCanvas, bootstrapConfig.offcanvas);
  //         offcanvasInstance.show();
  //       }
  //     });
  //   }
  // }

  /**
   * Инициализация Tooltips
   * Находит [data-bs-toggle="tooltip"] и инициализирует с настройками из bootstrapConfig.tooltip
   */
  initTooltips() {
    const elements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    this.instances.tooltips = [...elements].map(el => 
      new bootstrap.Tooltip(el, bootstrapConfig.tooltip)
    );
  }
  
  /**
   * Инициализация Popovers
   * Находит [data-bs-toggle="popover"] и инициализирует с настройками из bootstrapConfig.popover
   */

  /**
   * Инициализация Collapses
   * Находит элементы .collapse и инициализирует с настройками из bootstrapConfig.collapse
   */

  
  /**
   * Инициализация Modals
   * Находит элементы .modal и инициализирует с настройками из bootstrapConfig.modal
   * Добавляет расширенную функциональность для управления модальными окнами
   */
  initModals() {
    // Получаем все модальные окна на странице
    const elements = document.querySelectorAll('.modal');
    
    // Сохраняем ссылку на активное модальное окно
    let activeModal = null;
    
    // Инициализируем каждое модальное окно
    this.instances.modals = [...elements].map(el => {
      // Получаем настройки из дата-атрибутов
      const config = { ...bootstrapConfig.modal };
      
      // Обработка дата-атрибутов
      if (el.dataset.backdrop === 'static') {
        config.backdrop = 'static';
      }
      
      if (el.dataset.keyboard === 'false') {
        config.keyboard = false;
      }
      
      // Создаем экземпляр Bootstrap Modal
      const modalInstance = new bootstrap.Modal(el, config);
      
      // Настраиваем обработчики событий
      
      // Перед открытием модального окна
      el.addEventListener('show.bs.modal', (event) => {
        // Сохраняем ссылку на текущее активное модальное окно
        activeModal = event.target;
        
        // Дополнительная обработка перед открытием
        // Например, добавление класса к body для предотвращения прокрутки
        document.body.classList.add('modal-open-custom');
        
        // Вызываем пользовательские обработчики
        this.triggerCustomEvent('modal:before-show', { modal: el });
      });
      
      // После открытия модального окна
      el.addEventListener('shown.bs.modal', (event) => {
        // Дополнительная обработка после открытия
        // Например, фокус на первом input внутри модального окна
        const firstInput = el.querySelector('input, textarea, select, button:not([data-bs-dismiss="modal"])');
        if (firstInput) {
          firstInput.focus();
        }
        
        // Вызываем пользовательские обработчики
        this.triggerCustomEvent('modal:after-show', { modal: el });
      });
      
      // Перед закрытием модального окна
      el.addEventListener('hide.bs.modal', (event) => {
        // Вызываем пользовательские обработчики
        this.triggerCustomEvent('modal:before-hide', { modal: el });
      });
      
      // После закрытия модального окна
      el.addEventListener('hidden.bs.modal', (event) => {
        // Сбрасываем ссылку на активное модальное окно
        activeModal = null;
        
        // Дополнительная обработка после закрытия
        document.body.classList.remove('modal-open-custom');
        
        // Сброс форм внутри модального окна
        const forms = el.querySelectorAll('form');
        forms.forEach(form => form.reset());
        
        // Вызываем пользовательские обработчики
        this.triggerCustomEvent('modal:after-hide', { modal: el });
      });
      
      return modalInstance;
    });
    
    // Настройка программного открытия модальных окон через data-modal-target
    this.setupModalProgrammaticTriggers();
  }
  
  /**
   * Настройка программного открытия модальных окон через data-modal-target
   */
  setupModalProgrammaticTriggers() {
    // Обработка кликов по элементам с data-modal-target
    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-modal-target]');
      if (!trigger) return;
      
      event.preventDefault();
      
      const targetModalId = trigger.dataset.modalTarget;
      if (targetModalId) {
        this.openModal(targetModalId);
      }
    });
  }
  
  /**
   * Программное открытие модального окна
   * @param {string} modalId - ID модального окна
   */
  openModal(modalId) {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl) || 
                        new bootstrap.Modal(modalEl, bootstrapConfig.modal);
      modalInstance.show();
    } else {
      console.warn(`Модальное окно с ID "${modalId}" не найдено.`);
    }
  }
  
  /**
   * Программное закрытие модального окна
   * @param {string|null} modalId - ID модального окна (если null, закрывается активное)
   */
  closeModal(modalId = null) {
    if (modalId) {
      const modalEl = document.getElementById(modalId);
      if (modalEl) {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) {
          modalInstance.hide();
        }
      } else {
        console.warn(`Модальное окно с ID "${modalId}" не найдено.`);
      }
    } else {
      // Закрываем текущее активное модальное окно
      const activeModal = document.querySelector('.modal.show');
      if (activeModal) {
        const modalInstance = bootstrap.Modal.getInstance(activeModal);
        if (modalInstance) {
          modalInstance.hide();
        }
      }
    }
  }
  
  /**
   * Генерация пользовательского события
   * @param {string} eventName - Имя события
   * @param {Object} data - Данные события
   */
  triggerCustomEvent(eventName, data = {}) {
    const event = new CustomEvent(eventName, {
      detail: data,
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);
  }
  
  /**
   * Инициализация Tabs
   * Находит триггеры [data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]
   * и инициализирует их.
   */

  
  /**
   * Инициализация Toasts
   * Находит элементы .toast и инициализирует с настройками из bootstrapConfig.toast
   */

  
  /**
   * Инициализация Carousels
   * Находит элементы .carousel и инициализирует с настройками из bootstrapConfig.carousel
   */

}

// Создаем и экспортируем единственный экземпляр
export const bootstrapManager = new BootstrapManager(); 