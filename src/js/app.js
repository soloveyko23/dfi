window['FLS'] = false;
import "../scss/style.scss";
import "./files/sliders.js";
import "./files/script.js";
import "./libs/inputmask.js";

// Функциональность для фильтра OCFILTER
document.addEventListener('DOMContentLoaded', function() {

  
  // Обработчик для переключателя вида товаров
  const viewSwitchers = document.querySelectorAll('.view-switcher .btn');
  const productsContainer = document.querySelector('.products-container');
  
  if (viewSwitchers.length > 0 && productsContainer) {
    viewSwitchers.forEach(btn => {
      btn.addEventListener('click', function() {
        // Если эта кнопка уже активна, ничего не делаем
        if (this.classList.contains('active')) return;
        
        // Меняем активную кнопку
        viewSwitchers.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Получаем вид отображения из атрибута data-view
        const viewType = this.getAttribute('data-view');
        
        // Анимация смены вида (опционально)
        productsContainer.style.opacity = '0.5';
        
        setTimeout(() => {
          // Переключаем класс родительского контейнера для изменения вида карточек
          if (viewType === 'grid') {
            productsContainer.classList.remove('view-mode-list');
            productsContainer.classList.add('view-mode-grid');
          } else if (viewType === 'list') {
            productsContainer.classList.remove('view-mode-grid');
            productsContainer.classList.add('view-mode-list');
          }
          
          // Восстанавливаем прозрачность
          productsContainer.style.opacity = '1';
        }, 200);
      });
    });
    
    // Инициализация начального режима (по умолчанию список)
    const activeViewBtn = document.querySelector('.view-switcher .btn.active');
    if (activeViewBtn) {
      const initialViewType = activeViewBtn.getAttribute('data-view');
      if (initialViewType === 'grid') {
        productsContainer.classList.add('view-mode-grid');
      } else {
        productsContainer.classList.add('view-mode-list');
      }
    } else {
      // Если нет активной кнопки, используем режим списка по умолчанию
      productsContainer.classList.add('view-mode-list');
    }
  }
  
  // Обработчик для количества товара
  const countInputs = document.querySelectorAll('.count-input');
  if (countInputs.length > 0) {
    // Загружаем сохраненные количества товаров
    const savedQuantities = storageUtils.getData(storageUtils.keys.productQuantities, {});
    
    countInputs.forEach(countInput => {
      const decrementBtn = countInput.querySelector('[data-decrement]');
      const incrementBtn = countInput.querySelector('[data-increment]');
      const input = countInput.querySelector('input');
      
      if (decrementBtn && incrementBtn && input) {
        // Получаем ID продукта из ближайшей карточки товара
        const productCard = countInput.closest('.product-card');
        let productId = productCard ? productCard.dataset.productId : null;
        
        // Если ID не найден в карточке, ищем в родительском элементе .product-item
        if (!productId) {
          const productItem = countInput.closest('.product-item');
          productId = productItem ? productItem.dataset.productId : null;
        }
        
        // Если у товара есть ID и сохраненное количество, применяем его
        if (productId && savedQuantities[productId]) {
          const savedValue = parseInt(savedQuantities[productId]);
          input.value = savedValue;
          decrementBtn.disabled = savedValue <= 1;
        }
        
        // Функция для сохранения количества товара
        function saveProductQuantity() {
          if (productId) {
            // Обновляем значение в объекте с количествами
            savedQuantities[productId] = input.value;
            // Сохраняем в localStorage
            storageUtils.saveData(storageUtils.keys.productQuantities, savedQuantities);
          }
        }
        
        // Предотвращаем двойные клики, добавив флаг блокировки
        let isProcessing = false;
        
        // Обработчик для уменьшения количества
        decrementBtn.addEventListener('click', function() {
          if (isProcessing) return; // Если уже обрабатывается событие, игнорируем
          isProcessing = true; // Устанавливаем флаг
          
          let value = parseInt(input.value);
          if (value > 1) {
            value--;
            input.value = value;
            
            // Обновляем состояние кнопки уменьшения
            if (value <= 1) {
              decrementBtn.disabled = true;
            }
            
            // Сохраняем в localStorage
            saveProductQuantity();
          }
          
          // Сбрасываем флаг после небольшой задержки
          setTimeout(() => {
            isProcessing = false;
          }, 300);
        });
        
        // Обработчик для увеличения количества
        incrementBtn.addEventListener('click', function() {
          if (isProcessing) return; // Если уже обрабатывается событие, игнорируем
          isProcessing = true; // Устанавливаем флаг
          
          let value = parseInt(input.value);
          const max = parseInt(input.getAttribute('max')) || 99;
          
          if (value < max) {
            value++;
            input.value = value;
            
            // Разблокируем кнопку уменьшения, если она была заблокирована
            if (decrementBtn.disabled && value > 1) {
              decrementBtn.disabled = false;
            }
            
            // Сохраняем в localStorage
            saveProductQuantity();
          }
          
          // Сбрасываем флаг после небольшой задержки
          setTimeout(() => {
            isProcessing = false;
          }, 300);
        });
      }
    });
  }
  
 
});



