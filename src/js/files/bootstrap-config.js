export const bootstrapConfig = {
  
  // Настройки Dropdown (выпадающие меню)
  dropdown: {
    autoClose: true,        // Автоматическое закрытие при клике вне
    offset: [0, 2],         // Смещение [x, y]
    boundary: 'clippingParents', // Граница для позиционирования
    reference: 'toggle',    // Элемент, относительно которого позиционируется
    display: 'dynamic',     // Способ отображения
    popperConfig: {         // Дополнительная настройка Popper.js для плавности
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 2] // Консистентный отступ для всех дропдаунов
          }
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 8,  // Отступ от краев окна
            altAxis: true // Предотвращение переполнения по обеим осям
          }
        }
      ]
    },
    trigger: 'click'        // Тип триггера: click (по умолчанию)
  },
  
  // Настройки Offcanvas (боковое меню)
  offcanvas: {
    backdrop: true,         // Затемнение фона
    scroll: false,          // Блокировка прокрутки при открытии
    keyboard: true          // Закрытие по клавише Escape
  },
  
  // Настройки Modal (модальные окна)
  modal: {
    backdrop: true,         // Затемнение фона
    keyboard: true,         // Закрытие по клавише Escape
    focus: true,            // Фокус на модальном окне при открытии
    show: false,            // Не показывать при инициализации
  },
};

// Экспорт версии Bootstrap для отслеживания
export const bootstrapVersion = '5.2'; 