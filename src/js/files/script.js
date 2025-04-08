import './bootstrap-init.js';
import '../libs/inputmask.js';


// Добавление класса loaded для HTML после полной загрузки страницы
const addLoadedClass = () => {
	if (!document.documentElement.classList.contains('loading')) {
		window.addEventListener("load", function () {
			setTimeout(function () {
				document.documentElement.classList.add('loaded');
			}, 0);
		});
	}
}

// Инициализация компонента управления количеством (count-input)
const initQuantityControls = () => {
	const quantityInputs = document.querySelectorAll('.count-input');
	
	if (quantityInputs.length === 0) return;
	
	quantityInputs.forEach(container => {
		const input = container.querySelector('input[type="number"]');
		const decrementBtn = container.querySelector('[data-decrement]');
		const incrementBtn = container.querySelector('[data-increment]');
		
		if (!input || !decrementBtn || !incrementBtn) return;
		
		const min = parseInt(input.getAttribute('min')) || 1;
		const max = parseInt(input.getAttribute('max')) || 99;
		
		// Функция обновления состояния кнопок
		const updateButtonStates = () => {
			const value = parseInt(input.value);
			decrementBtn.disabled = value <= min;
			incrementBtn.disabled = value >= max;
		};
		
		// Установка начального состояния
		updateButtonStates();
		
		// Обработчик кнопки уменьшения
		decrementBtn.addEventListener('click', () => {
			const currentValue = parseInt(input.value);
			if (currentValue > min) {
				input.value = currentValue - 1;
				updateButtonStates();
				// Генерируем событие изменения для интеграции с другими компонентами
				input.dispatchEvent(new Event('change', { bubbles: true }));
			}
		});
		
		// Обработчик кнопки увеличения
		incrementBtn.addEventListener('click', () => {
			const currentValue = parseInt(input.value);
			if (currentValue < max) {
				input.value = currentValue + 1;
				updateButtonStates();
				// Генерируем событие изменения для интеграции с другими компонентами
				input.dispatchEvent(new Event('change', { bubbles: true }));
			}
		});
		
		// Обработчик прямого изменения значения в поле
		input.addEventListener('change', () => {
			let value = parseInt(input.value);
			
			// Проверка на NaN
			if (isNaN(value)) {
				value = min;
			}
			
			// Ограничение минимальным и максимальным значением
			value = Math.max(min, Math.min(max, value));
			
			// Установка валидного значения
			input.value = value;
			
			// Обновление состояния кнопок
			updateButtonStates();
		});
	});
};

document.addEventListener('DOMContentLoaded', () => {
	addLoadedClass();
	initQuantityControls();
});


