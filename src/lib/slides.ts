export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  body: string;
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://complex-presentation.vercel.app";

export const slides: Slide[] = [
  {
    id: 1,
    title: "Презентации нового поколения",
    subtitle: "Complex Presentation",
    body: "Забудьте о статичных слайдах. Мы создаём интерактивный опыт, который вовлекает аудиторию и делает каждое выступление запоминающимся. Откройте эту страницу на телефоне, отсканировав QR-код.",
  },
  {
    id: 2,
    title: "Интерактивность и вовлечение",
    subtitle: "Новый подход",
    body: "Каждый слайд — это отдельная веб-страница с уникальным адресом. Участники могут следить за презентацией на своих устройствах, взаимодействовать с контентом и возвращаться к материалам в любое время.",
  },
  {
    id: 3,
    title: "Доступность без границ",
    subtitle: "Любое устройство, любое место",
    body: "Адаптивный дизайн обеспечивает идеальное отображение на экранах любого размера — от проектора в конференц-зале до смартфона в кармане. Никаких установок, никаких форматов — просто откройте ссылку.",
  },
];

export function getSlide(id: number): Slide | undefined {
  return slides.find((s) => s.id === id);
}

export const totalSlides = slides.length;
