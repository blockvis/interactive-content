# Complex Presentation

Интерактивные презентации нового поколения — сайт-презентация на Next.js, задеплоенный на Vercel.

Этот проект одновременно является рабочей презентацией и reference-реализацией для создания подобных презентаций. Подробнее — в [presentations/gq128-beauty-presentation/MANIFEST.md](presentations/gq128-beauty-presentation/MANIFEST.md).

## Разработка

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Структура

```
presentations/
  gq128-beauty-presentation/   ← Контент одной презентации (путь = slug URL)
    .languages                 ← Список языков (ru, en, ...)
    slide001.ru.md             ← Слайд 1 на русском
    slide001.en.md             ← Слайд 1 на английском (перевод)
    images/                    ← Изображения для слайдов
    MANIFEST.md                ← Описание концепции проекта
scripts/
  compile.mjs                  ← Скрипт компиляции MD → JSON
src/generated/                 ← Сгенерированные данные (gitignored)
```

## Пайплайн

1. Напишите слайды в `presentations/<slug>/` как `.md` файлы с YAML frontmatter
2. `npm run compile` — компилирует MD в JSON и копирует изображения
3. `npm run build` — автоматически запускает компиляцию + сборку Next.js
4. Деплой на Vercel происходит автоматически

## Создание своей презентации

1. Клонируйте этот репозиторий
2. Создайте папку `presentations/<your-slug>/` со слайдами (slug станет путём на домене)
3. Обновите `.languages` под свои языки
4. Задеплойте на Vercel
