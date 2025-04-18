<<<<<<< HEAD
### Типографіка
- Основний шрифт: **Rubik** (Google Fonts)
- H1: 40px
- H2: 32px
- H3: 22px 
- H4: 18px
- H5: 16px
- H6: 14px

### Кольорова схема
- Основний колір бренду: #331B63
- Додатковий колір: #5CCDF8
- Для позитивних дій/підтверджень: #00BB27
- Для попереджень: #FFBF00
- Для помилок/небезпечних дій: #DB0000

## Встановлення та запуск

1. Встановіть залежності:
   ```
   npm run start
   ```

2. Запустіть режим розробки:
   ```
   npm run dev
   ```

3. Для збірки проекту:
   ```
   npm run build
   ```

## Структура проекту 

- `src/` - вихідні файли
  - `scss/` - SCSS файли
    - `libs/` - бібліотеки
      - `_bootstrap-variables.scss` - перевизначення змінних Bootstrap
      - `_bootstrap.scss` - імпорт та налаштування Bootstrap
    - `fonts/` - шрифти та іконки
    - `base/` - базові стилі
  - `js/` - JavaScript файли
  - `html/` - HTML-компоненти для підключення
  - `img/` - зображення та іконки
  - `fonts/` - файли шрифтів
  - `index.html` - головна сторінка
  - `ui.html` - сторінка з UI-компонентами

### Режим розробки (dev)

При запуску команди `npm run dev` створюється середовище розробки із функціями:
- Live-перезавантаження при зміні файлів
- Sass-компіляція та автопрефіксер
- Підтримка ES-модулів
- Збереження вихідної структури проекту

### Режим production (build)

При запуску команди `npm run build` збираються оптимізовані файли:
- `dist/` - фінальна збірка проекту
  - `css/` - мініфіковані CSS файли
  - `js/` - оптимізовані і мініфіковані JavaScript файли
  - `img/` - оптимізовані зображення (включно з WebP)
  - `fonts/` - оптимізовані шрифти у форматі woff2
  - `*.html` - оптимізовані HTML файли з правильними шляхами

## Додаткові команди

- `npm run sprite` - створення SVG-спрайтів
- `npm run fonts` - конвертація та оптимізація шрифтів
- `npm run zip` - створення архіву проекту для передачі
- `npm run deploy` - публікація на FTP сервер

## Кастомізація Bootstrap

Для кастомізації Bootstrap використовуються наступні файли:

1. `src/scss/libs/_bootstrap-variables.scss` - тут налаштовані кольори, шрифт Rubik та розміри типографіки
2. `src/scss/libs/_bootstrap.scss` - імпорт лише потрібних компонентів Bootstrap

## Адаптивність

Проект має повну адаптивність для таких розмірів екранів:
- Мобільні пристрої: до 576px
- Планшети: 576px - 992px
- Десктоп: від 992px



=======
### Типографіка
- Основний шрифт: **Rubik** (Google Fonts)
- H1: 40px
- H2: 32px
- H3: 22px 
- H4: 18px
- H5: 16px
- H6: 14px

### Кольорова схема
- Основний колір бренду: #331B63
- Додатковий колір: #5CCDF8
- Для позитивних дій/підтверджень: #00BB27
- Для попереджень: #FFBF00
- Для помилок/небезпечних дій: #DB0000

## Встановлення та запуск

1. Встановіть залежності:
   ```
   npm run start
   ```

2. Запустіть режим розробки:
   ```
   npm run dev
   ```

3. Для збірки проекту:
   ```
   npm run build
   ```

## Структура проекту 

- `src/` - вихідні файли
  - `scss/` - SCSS файли
    - `libs/` - бібліотеки
      - `_bootstrap-variables.scss` - перевизначення змінних Bootstrap
      - `_bootstrap.scss` - імпорт та налаштування Bootstrap
    - `fonts/` - шрифти та іконки
    - `base/` - базові стилі
  - `js/` - JavaScript файли
  - `html/` - HTML-компоненти для підключення
  - `img/` - зображення та іконки
  - `fonts/` - файли шрифтів
  - `index.html` - головна сторінка
  - `ui.html` - сторінка з UI-компонентами

### Режим розробки (dev)

При запуску команди `npm run dev` створюється середовище розробки із функціями:
- Live-перезавантаження при зміні файлів
- Sass-компіляція та автопрефіксер
- Підтримка ES-модулів
- Збереження вихідної структури проекту

### Режим production (build)

При запуску команди `npm run build` збираються оптимізовані файли:
- `dist/` - фінальна збірка проекту
  - `css/` - мініфіковані CSS файли
  - `js/` - оптимізовані і мініфіковані JavaScript файли
  - `img/` - оптимізовані зображення (включно з WebP)
  - `fonts/` - оптимізовані шрифти у форматі woff2
  - `*.html` - оптимізовані HTML файли з правильними шляхами

## Додаткові команди

- `npm run sprite` - створення SVG-спрайтів
- `npm run fonts` - конвертація та оптимізація шрифтів
- `npm run zip` - створення архіву проекту для передачі
- `npm run deploy` - публікація на FTP сервер

## Кастомізація Bootstrap

Для кастомізації Bootstrap використовуються наступні файли:

1. `src/scss/libs/_bootstrap-variables.scss` - тут налаштовані кольори, шрифт Rubik та розміри типографіки
2. `src/scss/libs/_bootstrap.scss` - імпорт лише потрібних компонентів Bootstrap

## Адаптивність

Проект має повну адаптивність для таких розмірів екранів:
- Мобільні пристрої: до 576px
- Планшети: 576px - 992px
- Десктоп: від 992px



>>>>>>> 12979003d1a3f8683d666648bdf874c752b33a1b
