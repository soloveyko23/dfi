/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.swiper')) {
		// Загальні налаштування для всіх слайдерів
		const commonOptions = {
			modules: [Navigation, Pagination],
			observer: true,
			watchSlidesProgress: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 800,
		};
		
		// Ініціалізація слайдера категорій
		initCategorySlider(commonOptions);
		
		// Ініціалізація продуктових слайдерів (універсальна)
		initProductSliders(commonOptions);

    // Ініціалізація блогу слайдера
    initBlogSlider(commonOptions);
	}
}

// Ініціалізація слайдера категорій
function initCategorySlider(commonOptions) {
	const categorySlider = document.querySelector('.category-section .slider-type-categories');
	if (categorySlider) {
		const prevButton = document.querySelector('.category-section .swiper-button-prev');
		const nextButton = document.querySelector('.category-section .swiper-button-next');
		
		const config = {
			...commonOptions,
			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: prevButton || null,
				nextEl: nextButton || null,
			},
			// Брейкпоінти
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 5,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 6,
					spaceBetween: 30,
				},
			},
		};
		
		new Swiper(categorySlider, config);
	}
}

function initBlogSlider(commonOptions) {
	const blogSlider = document.querySelector('.blog-section .slider-type-blog');
	if (blogSlider) {
		const prevButton = document.querySelector('.blog-section .swiper-button-prev');
		const nextButton = document.querySelector('.blog-section .swiper-button-next');
		const paginationEl = document.querySelector('.blog-section .slider-pagination-type-two .swiper-pagination');
		
		const config = {
			...commonOptions,
			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: prevButton || null,
				nextEl: nextButton || null,
			},
			// Настройки пагинации
			pagination: {
				el: paginationEl || null,
				clickable: true,
				// Используем тип 'bullets' для точек пагинации
				type: 'bullets',
			},
			// Брейкпоінти
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
			},
		};
		
		new Swiper(blogSlider, config);
	}
}

// Універсальна ініціалізація продуктових слайдерів
function initProductSliders(commonOptions) {
	const productSliders = document.querySelectorAll('.slider-type-products');
	
	if (productSliders.length > 0) {
		productSliders.forEach(slider => {
			if (!slider?.matches('.swiper')) return;

			const parentContainer = slider.closest('section, .slider-wrapper') || slider.parentElement;
			if (!parentContainer) {
				console.warn('Не знайдено батьківський контейнер для:', slider);
				return;
			}
			
			// Виправлено: використовуємо querySelectorAll для пошуку всіх кнопок навігації
			const prevButtons = parentContainer.querySelectorAll('.swiper-button-prev');
			const nextButtons = parentContainer.querySelectorAll('.swiper-button-next');
			
			// Беремо перші кнопки з колекції як основні для ініціалізації слайдера
			const prevButton = prevButtons.length ? prevButtons[0] : null;
			const nextButton = nextButtons.length ? nextButtons[0] : null;
			
			// Додано явну перевірку елементів
			if (!prevButton || !nextButton) {
				console.error('Не вдалося знайти кнопки навігації в:', parentContainer);
				return;
			}

			const paginationContainer = parentContainer.querySelector('.swiper-pagination');
			
			const sliderConfig = {
				...commonOptions,
				navigation: {
					prevEl: prevButton,
					nextEl: nextButton,
				},
				breakpoints: {
					320: { slidesPerView: 2, spaceBetween: 10 },
					768: { slidesPerView: 2, spaceBetween: 20 },
					992: { slidesPerView: 3, spaceBetween: 20 },
					1268: { slidesPerView: 4, spaceBetween: 24 }
				}
			};

			if (paginationContainer) {
				sliderConfig.pagination = {
					el: paginationContainer,
					clickable: true,
					type: 'fraction',
					renderFraction: (current, total) => 
						`<span class="${current}"></span> / <span class="${total}"></span>`
				};
			}

			try {
				const swiperInstance = new Swiper(slider, sliderConfig);
				
				// Підключаємо всі інші кнопки навігації до цього ж слайдера
				if (prevButtons.length > 1 && nextButtons.length > 1) {
					for (let i = 1; i < prevButtons.length; i++) {
						if (prevButtons[i] && nextButtons[i]) {
							prevButtons[i].addEventListener('click', () => {
								swiperInstance.slidePrev();
							});
							
							nextButtons[i].addEventListener('click', () => {
								swiperInstance.slideNext();
							});
						}
					}
				}
			} catch (error) {
				console.error('Помилка ініціалізації:', error);
				console.debug('Станів кнопок:', { prevButtons, nextButtons });
			}
		});
	}
}

// Скролл на базі слайдера (за класом swiper_scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			
			if (!sliderScrollItem || !(sliderScrollItem instanceof Element)) {
				continue;
			}
			
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			if (!sliderScrollBar) {
				continue;
			}
			
			try {
				const sliderScroll = new Swiper(sliderScrollItem, {
					observer: true,
					observeParents: true,
					direction: 'vertical',
					slidesPerView: 'auto',
					freeMode: {
						enabled: true,
					},
					scrollbar: {
						el: sliderScrollBar,
						draggable: true,
						snapOnRelease: false
					},
					mousewheel: {
						releaseOnEdges: true,
					},
				});
				sliderScroll.scrollbar.updateSize();
			} catch (error) {
				console.error('Ошибка при инициализации скролла слайдера:', error);
			}
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});