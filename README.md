# Complex Presentation

Интерактивные презентации нового поколения — сайт-презентация на Next.js, задеплоенный на Vercel.

Этот проект одновременно является рабочей презентацией и reference-реализацией для создания подобных презентаций. Подробнее — в [example/MANIFEST.md](example/MANIFEST.md).

## Разработка

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Структура

```
example/              ← Контент слайдов (Markdown + изображения)
  .languages          ← Список языков (ru, en, ...)
  slide001.ru.md      ← Слайд 1 на русском
  slide001.en.md      ← Слайд 1 на английском (перевод)
  images/             ← Изображения для слайдов
  MANIFEST.md         ← Описание концепции проекта
scripts/
  compile.mjs         ← Скрипт компиляции MD → JSON
src/generated/        ← Сгенерированные данные (gitignored)
```

## Пайплайн

1. Напишите слайды в `example/` как `.md` файлы с YAML frontmatter
2. `npm run compile` — компилирует MD в JSON и копирует изображения
3. `npm run build` — автоматически запускает компиляцию + сборку Next.js
4. Деплой на Vercel происходит автоматически

## Создание своей презентации

1. Клонируйте этот репозиторий
2. Замените содержимое `example/` своими слайдами
3. Обновите `.languages` под свои языки
4. Задеплойте на Vercel
