import { Category } from "@/generated/prisma/client";

export const MARKUP = 10;

export function getMarkup(category: Category): number {
  // Чай и кофе — наценка +20₽ вместо стандартных +10₽.
  return category === Category.COFFEE_TEA ? 20 : MARKUP;
}

export type SeedProduct = {
  name: string;
  category: Category;
  volumeMl: number | null;
  purchasePrice: number;
  caseSize: number;
};

// Наименования, закупочные цены и размер упаковки — из прайс-листа поставщика (2026-07-03).
// Товар продаётся только целой упаковкой (caseSize шт.), розничной продажи по 1 шт. нет.
// Одинаковые позиции, встречавшиеся в прайсе дважды, объединены в одну строку.
export const seedProducts: SeedProduct[] = [
  // Пиво
  { name: "Балтика №0 белое (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 60, caseSize: 24 },
  { name: "Балтика №0 пшеничное (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 59, caseSize: 24 },
  { name: "Балтика №3 (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 72, caseSize: 24 },
  { name: "Балтика №7 мягкое (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 72, caseSize: 24 },
  { name: "Балтика №7 (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 83, caseSize: 20 },
  { name: "Балтика №7 (ПЭТ)", category: Category.BEER, volumeMl: null, purchasePrice: 110, caseSize: 9 },
  { name: "Балтика №9 (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 67, caseSize: 24 },
  { name: "Балтика №9 (ПЭТ)", category: Category.BEER, volumeMl: 1300, purchasePrice: 127, caseSize: 9 },
  { name: "Балтика Кулер (ПЭТ)", category: Category.BEER, volumeMl: 1250, purchasePrice: 128, caseSize: 9 },
  { name: "Крон Бланш Бьер (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 91, caseSize: 24 },
  { name: "Крон Бланш Бьер (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 91, caseSize: 20 },
  { name: "Гаррет Черная вишня (ст/б)", category: Category.BEER, volumeMl: 400, purchasePrice: 81, caseSize: 20 },
  { name: "Жатецкий Гусь (ПЭТ)", category: Category.BEER, volumeMl: 1350, purchasePrice: 147, caseSize: 9 },
  { name: "Жатецкий Гусь (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 83, caseSize: 24 },
  { name: "Дон (ПЭТ)", category: Category.BEER, volumeMl: 1500, purchasePrice: 123, caseSize: 9 },
  { name: "Кулер (ст/б)", category: Category.BEER, volumeMl: 470, purchasePrice: 68, caseSize: 20 },
  { name: "Кулер (ж/б)", category: Category.BEER, volumeMl: 470, purchasePrice: 70, caseSize: 24 },
  { name: "Охота крепкое (ПЭТ)", category: Category.BEER, volumeMl: 1250, purchasePrice: 130, caseSize: 9 },
  { name: "Голд Майн Бир (ПЭТ)", category: Category.BEER, volumeMl: 1200, purchasePrice: 112, caseSize: 9 },
  { name: "Бочкарев Холод и Солод светлое (ПЭТ)", category: Category.BEER, volumeMl: 950, purchasePrice: 105, caseSize: 9 },
  { name: "Бочкарев Живой Розлив светлое (ПЭТ)", category: Category.BEER, volumeMl: 950, purchasePrice: 105, caseSize: 9 },
  { name: "Белый Медведь Светлое (ПЭТ)", category: Category.BEER, volumeMl: 1200, purchasePrice: 115, caseSize: 9 },
  { name: "Белый Медведь Крепкое (ПЭТ)", category: Category.BEER, volumeMl: 1150, purchasePrice: 135, caseSize: 9 },
  { name: "Эфес Пилсенер (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 82, caseSize: 20 },
  { name: "Эсса Солнце на пляже (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 79, caseSize: 24 },
  { name: "Шпатен Мюнхен Хеллес (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 116, caseSize: 20 },
  { name: "Хугарден Грейпфрут (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 90, caseSize: 20 },
  { name: "Хугарден Вишня (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 90, caseSize: 20 },
  { name: "Хугарден (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 90, caseSize: 20 },
  { name: "Стелла (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 102, caseSize: 20 },
  { name: "Старый Мельник из Бочонка мягкое (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 74, caseSize: 12 },
  { name: "Редд's (ст/б)", category: Category.BEER, volumeMl: 330, purchasePrice: 82, caseSize: 24 },
  { name: "Мягкий Солод Светлое 4.2% (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 58, caseSize: 12 },
  { name: "Миллер (ст/б)", category: Category.BEER, volumeMl: 500, purchasePrice: 72, caseSize: 20 },
  { name: "Корона Экстра (ст/б)", category: Category.BEER, volumeMl: 355, purchasePrice: 118, caseSize: 24 },
  { name: "Козел Тёмное (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 88, caseSize: 20 },
  { name: "Козел Светлое (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 88, caseSize: 20 },
  { name: "Жигули Барное (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 68, caseSize: 20 },
  { name: "Жигули 1968 (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 64, caseSize: 20 },
  { name: "Доктор Дизель Малина-Лайм (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 77, caseSize: 20 },
  { name: "Гринбит (ст/б)", category: Category.BEER, volumeMl: 480, purchasePrice: 75, caseSize: 20 },
  { name: "Гаррет Грейпфрут (ст/б)", category: Category.BEER, volumeMl: 400, purchasePrice: 87, caseSize: 20 },
  { name: "Брамма (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 70, caseSize: 20 },
  { name: "Бочкарев Холод и Солод светлое (ст/б)", category: Category.BEER, volumeMl: 430, purchasePrice: 69, caseSize: 20 },
  { name: "Бад (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 100, caseSize: 20 },
  { name: "Амстердам (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 92, caseSize: 20 },
  { name: "Эфес Пилсенер (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 80, caseSize: 24 },
  { name: "Шпатен (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 118, caseSize: 24 },
  { name: "Мягкий Солод Светлое (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 58, caseSize: 12 },
  { name: "Охота крепкое (ж/б)", category: Category.BEER, volumeMl: 430, purchasePrice: 63, caseSize: 24 },
  { name: "Жигули Барное (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 68, caseSize: 24 },
  { name: "Гринбит (ж/б)", category: Category.BEER, volumeMl: 480, purchasePrice: 75, caseSize: 24 },
  { name: "Велкопоповицкий Козел Тёмное (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 88, caseSize: 24 },
  { name: "Велкопоповицкий Козел Светлое (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 88, caseSize: 24 },
  { name: "Бад (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 100, caseSize: 24 },

  // Энергетики
  { name: "Adrenaline Rush без сахара (белый)", category: Category.ENERGY, volumeMl: 449, purchasePrice: 98, caseSize: 12 },
  { name: "Adrenaline Rush (ж/б)", category: Category.ENERGY, volumeMl: 250, purchasePrice: 75, caseSize: 12 },
  { name: "Adrenaline Rush", category: Category.ENERGY, volumeMl: 449, purchasePrice: 102, caseSize: 12 },
  { name: "Флэш Ягодный (ж/б, все виды)", category: Category.ENERGY, volumeMl: 440, purchasePrice: 63, caseSize: 24 },
  { name: "Флэш (ПЭТ)", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 88, caseSize: 9 },
  { name: "Флэш (ПЭТ) 0.5л", category: Category.ENERGY, volumeMl: 500, purchasePrice: 63, caseSize: 20 },
  { name: "Black Monster ультра фэнтези", category: Category.ENERGY, volumeMl: 500, purchasePrice: 165, caseSize: 12 },
  { name: "Торнадо Шторм (все виды)", category: Category.ENERGY, volumeMl: 450, purchasePrice: 66, caseSize: 12 },
  { name: "Торнадо Манго (ПЭТ)", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 89, caseSize: 6 },
  { name: "Mountain Dew (ПЭТ) 1л", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 95, caseSize: 9 },
  { name: "Mountain Dew (ПЭТ) 0.5л", category: Category.ENERGY, volumeMl: 500, purchasePrice: 74, caseSize: 12 },
  { name: "Mountain Dew (ж/б)", category: Category.ENERGY, volumeMl: 330, purchasePrice: 64, caseSize: 24 },
  { name: "Power Torr Манго (ПЭТ, все виды)", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 90, caseSize: 6 },
  { name: "Power Torr синий (ПЭТ, все виды)", category: Category.ENERGY, volumeMl: 500, purchasePrice: 59, caseSize: 12 },
  { name: "Lit Energy Персик (все виды)", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12 },
  { name: "Volt Гуава (ж/б)", category: Category.ENERGY, volumeMl: 450, purchasePrice: 74, caseSize: 24 },

  // Напитки
  { name: "Мохито клубничный (ж/б)", category: Category.OTHER, volumeMl: 500, purchasePrice: 61, caseSize: 24 },
  { name: "Добрый Апельсин/Фанта 1л (все виды)", category: Category.OTHER, volumeMl: 1000, purchasePrice: 75, caseSize: 12 },
  { name: "Добрый Фанта (ПЭТ, все виды)", category: Category.OTHER, volumeMl: 500, purchasePrice: 54, caseSize: 24 },
  { name: "Добрый Апельсин/Фанта (ж/б, все виды)", category: Category.OTHER, volumeMl: 330, purchasePrice: 55, caseSize: 12 },
  { name: "Кока-Кола классическая 1л", category: Category.OTHER, volumeMl: 1000, purchasePrice: 59, caseSize: 9 },
  { name: "Кока-Кола классическая 2л", category: Category.OTHER, volumeMl: 2000, purchasePrice: 80, caseSize: 6 },
  { name: "Кола (Иран, ст/б)", category: Category.OTHER, volumeMl: 330, purchasePrice: 68, caseSize: 15 },
  { name: "Пепси 2л", category: Category.OTHER, volumeMl: 2000, purchasePrice: 85, caseSize: 6 },
  { name: "Фанта 2л", category: Category.OTHER, volumeMl: 2000, purchasePrice: 85, caseSize: 6 },
  { name: "Пепси 1л", category: Category.OTHER, volumeMl: 1000, purchasePrice: 55, caseSize: 12 },

  // Снеки и сладости
  { name: "Чоко Пай 6шт", category: Category.SNACKS, volumeMl: null, purchasePrice: 70, caseSize: 16 },
  { name: "Вафли \"Зебра\" 40гр с карам. арахис и изюм", category: Category.SNACKS, volumeMl: null, purchasePrice: 33, caseSize: 15 },
  { name: "Печенье Твикс 55гр", category: Category.SNACKS, volumeMl: null, purchasePrice: 46, caseSize: 40 },
  { name: "Конфета \"Баунти\" 55гр", category: Category.SNACKS, volumeMl: null, purchasePrice: 46, caseSize: 32 },
  { name: "Халва подсолнечная 5кг", category: Category.SNACKS, volumeMl: null, purchasePrice: 248, caseSize: 1 },
  { name: "Шоколад \"Альпен Гольд\" с фундуком и изюмом 85гр", category: Category.SNACKS, volumeMl: null, purchasePrice: 79, caseSize: 21 },
  { name: "Шоколад \"Альпен Гольд\" с клубнично-йогуртовой начинкой 85гр", category: Category.SNACKS, volumeMl: null, purchasePrice: 79, caseSize: 21 },

  // Чай и кофе
  { name: "Кофе Жокей \"Голд\" 75гр м/у", category: Category.COFFEE_TEA, volumeMl: null, purchasePrice: 168, caseSize: 12 },
  { name: "Кофе Жокей \"Импер\" 75гр раст.субл. м/у", category: Category.COFFEE_TEA, volumeMl: null, purchasePrice: 168, caseSize: 12 },
  { name: "Гринфилд \"Голден Цейлон\" 25пак черн.", category: Category.COFFEE_TEA, volumeMl: null, purchasePrice: 72, caseSize: 10 },
  { name: "Тесс \"Плеже\" 25пак черн. с доб.", category: Category.COFFEE_TEA, volumeMl: null, purchasePrice: 60, caseSize: 10 },

  // Консервы
  { name: "Сардина в т/с с овощ. гарн. 240гр ГОСТ (Сохраним Традиции)", category: Category.CANNED, volumeMl: null, purchasePrice: 110, caseSize: 24 },
  { name: "Килька в т/с красная банка", category: Category.CANNED, volumeMl: null, purchasePrice: 49, caseSize: 1 },
];
