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
  imageUrl?: string;
};

// Наименования, закупочные цены и размер упаковки — из прайс-листа поставщика (2026-07-03).
// Товар продаётся только целой упаковкой (caseSize шт.), розничной продажи по 1 шт. нет.
// Одинаковые позиции, встречавшиеся в прайсе дважды, объединены в одну строку.
export const seedProducts: SeedProduct[] = [
  // Пиво
  { name: "Балтика №0 белое (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 60, caseSize: 24, imageUrl: "/baltika-0-beloe-jb.jpg" },
  { name: "Балтика №0 пшеничное (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 59, caseSize: 24, imageUrl: "/baltika-0-pshenichnoe-jb.jpg" },
  { name: "Балтика №3 (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 72, caseSize: 24, imageUrl: "/baltika-3-jb.jpg" },
  { name: "Балтика №7 мягкое (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 72, caseSize: 24, imageUrl: "/baltika-7-myagkoe-jb.jpg" },
  { name: "Балтика №7 (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 83, caseSize: 20, imageUrl: "/baltika-7-stb.jpg" },
  { name: "Балтика №7 (ПЭТ)", category: Category.BEER, volumeMl: null, purchasePrice: 110, caseSize: 9, imageUrl: "/baltika-7-pet.jpg" },
  { name: "Балтика №9 (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 67, caseSize: 24, imageUrl: "/baltika-9-jb.jpg" },
  { name: "Балтика №9 (ПЭТ)", category: Category.BEER, volumeMl: 1300, purchasePrice: 127, caseSize: 9, imageUrl: "/baltika-9-pet.jpg" },
  { name: "Балтика Кулер (ПЭТ)", category: Category.BEER, volumeMl: 1250, purchasePrice: 128, caseSize: 9, imageUrl: "/baltika-kuler-pet.jpg" },
  { name: "Крон Бланш Бьер (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 91, caseSize: 24, imageUrl: "/krone-blanche-jb.jpg" },
  { name: "Крон Бланш Бьер (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 91, caseSize: 20, imageUrl: "/krone-blanche-stb.jpg" },
  { name: "Гаррет Черная вишня (ст/б)", category: Category.BEER, volumeMl: 400, purchasePrice: 81, caseSize: 20, imageUrl: "/garret-chernaya-vishnya-stb.jpg" },
  { name: "Жатецкий Гусь (ПЭТ)", category: Category.BEER, volumeMl: 1350, purchasePrice: 147, caseSize: 9, imageUrl: "/zateckiy-gus-pet.jpg" },
  { name: "Жатецкий Гусь (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 83, caseSize: 24, imageUrl: "/zateckiy-gus-jb.jpg" },
  { name: "Дон (ПЭТ)", category: Category.BEER, volumeMl: 1500, purchasePrice: 123, caseSize: 9, imageUrl: "/don-pet.jpg" },
  { name: "Кулер (ст/б)", category: Category.BEER, volumeMl: 470, purchasePrice: 68, caseSize: 20, imageUrl: "/kuler-stb.jpg" },
  { name: "Кулер (ж/б)", category: Category.BEER, volumeMl: 470, purchasePrice: 70, caseSize: 24, imageUrl: "/kuler-jb.jpg" },
  { name: "Охота крепкое (ПЭТ)", category: Category.BEER, volumeMl: 1250, purchasePrice: 130, caseSize: 9, imageUrl: "/ohota-krepkoe-pet.jpg" },
  { name: "Голд Майн Бир (ПЭТ)", category: Category.BEER, volumeMl: 1200, purchasePrice: 112, caseSize: 9, imageUrl: "/gold-mine-beer-pet.jpg" },
  { name: "Бочкарев Холод и Солод светлое (ПЭТ)", category: Category.BEER, volumeMl: 950, purchasePrice: 105, caseSize: 9, imageUrl: "/bochkarev-holod-i-solod-pet.jpg" },
  { name: "Бочкарев Живой Розлив светлое (ПЭТ)", category: Category.BEER, volumeMl: 950, purchasePrice: 105, caseSize: 9, imageUrl: "/bochkarev-zhivoi-rozliv-pet.jpg" },
  { name: "Белый Медведь Светлое (ПЭТ)", category: Category.BEER, volumeMl: 1200, purchasePrice: 115, caseSize: 9, imageUrl: "/belyi-medved-svetloe-pet.jpg" },
  { name: "Белый Медведь Крепкое (ПЭТ)", category: Category.BEER, volumeMl: 1150, purchasePrice: 135, caseSize: 9, imageUrl: "/belyi-medved-krepkoe-pet.jpg" },
  { name: "Эфес Пилсенер (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 82, caseSize: 20, imageUrl: "/efes-pilsener-stb.jpg" },
  { name: "Эсса Солнце на пляже (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 79, caseSize: 24, imageUrl: "/essa-sun-on-beach-stb.jpg" },
  { name: "Шпатен Мюнхен Хеллес (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 116, caseSize: 20, imageUrl: "/spaten-munchen-stb.jpg" },
  { name: "Хугарден Грейпфрут (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 90, caseSize: 20, imageUrl: "/hoegaarden-grapefruit-stb.jpg" },
  { name: "Хугарден Вишня (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 90, caseSize: 20, imageUrl: "/hoegaarden-vishnya-stb.jpg" },
  { name: "Хугарден (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 90, caseSize: 20, imageUrl: "/hoegaarden-stb.jpg" },
  { name: "Стелла (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 102, caseSize: 20, imageUrl: "/stella-stb.jpg" },
  { name: "Старый Мельник из Бочонка мягкое (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 74, caseSize: 12, imageUrl: "/stariy-melnik-bochonka-stb.jpg" },
  { name: "Редд's (ст/б)", category: Category.BEER, volumeMl: 330, purchasePrice: 82, caseSize: 24, imageUrl: "/redds-stb.jpg" },
  { name: "Мягкий Солод Светлое 4.2% (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 58, caseSize: 12, imageUrl: "/myagkiy-solod-42-stb.jpg" },
  { name: "Миллер (ст/б)", category: Category.BEER, volumeMl: 500, purchasePrice: 72, caseSize: 20, imageUrl: "/miller-stb.jpg" },
  { name: "Корона Экстра (ст/б)", category: Category.BEER, volumeMl: 355, purchasePrice: 118, caseSize: 24, imageUrl: "/corona-extra-stb.jpg" },
  { name: "Козел Тёмное (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 88, caseSize: 20, imageUrl: "/kozel-temnoe-stb.jpg" },
  { name: "Козел Светлое (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 88, caseSize: 20, imageUrl: "/kozel-svetloe-stb.jpg" },
  { name: "Жигули Барное (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 68, caseSize: 20, imageUrl: "/zhiguli-barnoe-stb.jpg" },
  { name: "Жигули 1968 (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 64, caseSize: 20, imageUrl: "/zhiguli-1968-stb.jpg" },
  { name: "Доктор Дизель Малина-Лайм (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 77, caseSize: 20, imageUrl: "/dr-diesel-malina-laym-stb.jpg" },
  { name: "Гринбит (ст/б)", category: Category.BEER, volumeMl: 480, purchasePrice: 75, caseSize: 20, imageUrl: "/grinbit-stb.jpg" },
  { name: "Гаррет Грейпфрут (ст/б)", category: Category.BEER, volumeMl: 400, purchasePrice: 87, caseSize: 20 },
  { name: "Брамма (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 70, caseSize: 20, imageUrl: "/bramma-stb.jpg" },
  { name: "Бочкарев Холод и Солод светлое (ст/б)", category: Category.BEER, volumeMl: 430, purchasePrice: 69, caseSize: 20, imageUrl: "/bochkarev-holod-i-solod-stb.jpg" },
  { name: "Бад (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 100, caseSize: 20, imageUrl: "/bad-stb.jpg" },
  { name: "Амстердам (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 92, caseSize: 20 },
  { name: "Эфес Пилсенер (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 80, caseSize: 24, imageUrl: "/efes-pilsener-jb.jpg" },
  { name: "Шпатен (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 118, caseSize: 24, imageUrl: "/spaten-jb.jpg" },
  { name: "Мягкий Солод Светлое (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 58, caseSize: 12, imageUrl: "/myagkiy-solod-jb.jpg" },
  { name: "Охота крепкое (ж/б)", category: Category.BEER, volumeMl: 430, purchasePrice: 63, caseSize: 24, imageUrl: "/ohota-krepkoe-jb.jpg" },
  { name: "Жигули Барное (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 68, caseSize: 24, imageUrl: "/zhiguli-barnoe-jb.jpg" },
  { name: "Гринбит (ж/б)", category: Category.BEER, volumeMl: 480, purchasePrice: 75, caseSize: 24, imageUrl: "/grinbit-jb.jpg" },
  { name: "Велкопоповицкий Козел Тёмное (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 88, caseSize: 24, imageUrl: "/kozel-temnoe-jb.jpg" },
  { name: "Велкопоповицкий Козел Светлое (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 88, caseSize: 24, imageUrl: "/kozel-svetloe-jb.jpg" },
  { name: "Бад (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 100, caseSize: 24, imageUrl: "/bad-jb.jpg" },

  // Энергетики
  { name: "Adrenaline Rush без сахара (белый)", category: Category.ENERGY, volumeMl: 449, purchasePrice: 98, caseSize: 12, imageUrl: "/adrenaline-rush-zero-white.jpg" },
  { name: "Adrenaline Rush (ж/б)", category: Category.ENERGY, volumeMl: 250, purchasePrice: 75, caseSize: 12, imageUrl: "/adrenaline-rush-025-jb.jpg" },
  { name: "Adrenaline Rush", category: Category.ENERGY, volumeMl: 449, purchasePrice: 102, caseSize: 12, imageUrl: "/adrenaline-rush-classic.jpg" },
  { name: "Флэш Ягодный (ж/б)", category: Category.ENERGY, volumeMl: 440, purchasePrice: 63, caseSize: 24, imageUrl: "/flash-yagodniy-jb.jpg" },
  { name: "Флэш (ПЭТ)", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 88, caseSize: 9, imageUrl: "/flash-pet-1l.jpg" },
  { name: "Флэш (ПЭТ) 0.5л", category: Category.ENERGY, volumeMl: 500, purchasePrice: 63, caseSize: 20, imageUrl: "/flash-pet-05.jpg" },
  { name: "Black Monster ультра фэнтези", category: Category.ENERGY, volumeMl: 500, purchasePrice: 165, caseSize: 12, imageUrl: "/monster-ultra-black.jpg" },
  { name: "Торнадо Шторм", category: Category.ENERGY, volumeMl: 450, purchasePrice: 66, caseSize: 12 },
  { name: "Торнадо Манго (ПЭТ)", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 89, caseSize: 6, imageUrl: "/tornado-mango-pet.jpg" },
  { name: "Mountain Dew (ПЭТ) 1л", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 95, caseSize: 9, imageUrl: "/mountain-dew-pet-1l.jpg" },
  { name: "Mountain Dew (ПЭТ) 0.5л", category: Category.ENERGY, volumeMl: 500, purchasePrice: 74, caseSize: 12, imageUrl: "/mountain-dew-pet-05.jpg" },
  { name: "Mountain Dew (ж/б)", category: Category.ENERGY, volumeMl: 330, purchasePrice: 64, caseSize: 24, imageUrl: "/mountain-dew-jb.jpg" },
  { name: "Power Torr Манго (ПЭТ)", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 90, caseSize: 6, imageUrl: "/power-torr-mango-pet.jpg" },
  { name: "Power Torr синий (ПЭТ)", category: Category.ENERGY, volumeMl: 500, purchasePrice: 59, caseSize: 12, imageUrl: "/power-torr-siniy-pet.jpg" },
  { name: "Lit Energy Персик", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-peach.jpg" },
  { name: "Lit Energy Малина Крэш", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-malina-crush.jpg" },
  { name: "Lit Energy Berry Coconut", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-berry-coconut.jpg" },
  { name: "Lit Energy Classic", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-classic.jpg" },
  { name: "Lit Energy Original", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-original.jpg" },
  { name: "Lit Energy Blueberry", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-blueberry.jpg" },
  { name: "Lit Energy Citrus Punch", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-citrus-punch.jpg" },
  { name: "Lit Energy Strawberry Bubblegum", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-strawberry-bubblegum.jpg" },
  { name: "Volt Гуава (ж/б)", category: Category.ENERGY, volumeMl: 450, purchasePrice: 74, caseSize: 24, imageUrl: "/volt-guava-jb.jpg" },

  // Напитки
  { name: "Мохито клубничный (ж/б)", category: Category.OTHER, volumeMl: 500, purchasePrice: 61, caseSize: 24, imageUrl: "/mohito-klubnichniy-jb.jpg" },
  { name: "Добрый Апельсин/Фанта 1л", category: Category.OTHER, volumeMl: 1000, purchasePrice: 75, caseSize: 12 },
  { name: "Добрый Фанта (ПЭТ)", category: Category.OTHER, volumeMl: 500, purchasePrice: 54, caseSize: 24, imageUrl: "/dobriy-fanta-pet.jpg" },
  { name: "Фанта (ж/б)", category: Category.OTHER, volumeMl: 330, purchasePrice: 55, caseSize: 12, imageUrl: "/fanta-jb.jpg" },
  { name: "Кока-Кола классическая 1л", category: Category.OTHER, volumeMl: 1000, purchasePrice: 59, caseSize: 9, imageUrl: "/koka-kola-1l.jpg" },
  { name: "Кока-Кола классическая 2л", category: Category.OTHER, volumeMl: 2000, purchasePrice: 80, caseSize: 6, imageUrl: "/koka-kola-2l.jpg" },
  { name: "Кола (Иран, ст/б)", category: Category.OTHER, volumeMl: 330, purchasePrice: 68, caseSize: 15, imageUrl: "/kola-iran-stb.jpg" },
  { name: "Пепси 2л", category: Category.OTHER, volumeMl: 2000, purchasePrice: 85, caseSize: 6, imageUrl: "/pepsi-2l.jpg" },
  { name: "Фанта 2л", category: Category.OTHER, volumeMl: 2000, purchasePrice: 85, caseSize: 6, imageUrl: "/fanta-2l.jpg" },
  { name: "Пепси 1л", category: Category.OTHER, volumeMl: 1000, purchasePrice: 55, caseSize: 12, imageUrl: "/pepsi-1l.jpg" },

  // Снеки и сладости
  { name: "Чоко Пай 6шт", category: Category.SNACKS, volumeMl: null, purchasePrice: 70, caseSize: 16 },
  { name: "Вафли \"Зебра\" 40гр с карам. арахис и изюм", category: Category.SNACKS, volumeMl: null, purchasePrice: 33, caseSize: 15, imageUrl: "/vafli-zebra.jpg" },
  { name: "Печенье Твикс 55гр", category: Category.SNACKS, volumeMl: null, purchasePrice: 46, caseSize: 40, imageUrl: "/twix.jpg" },
  { name: "Конфета \"Баунти\" 55гр", category: Category.SNACKS, volumeMl: null, purchasePrice: 46, caseSize: 32, imageUrl: "/bounty.jpg" },
  { name: "Халва подсолнечная 5кг", category: Category.SNACKS, volumeMl: null, purchasePrice: 248, caseSize: 1, imageUrl: "/halva.jpg" },
  { name: "Шоколад \"Альпен Гольд\" с фундуком и изюмом 85гр", category: Category.SNACKS, volumeMl: null, purchasePrice: 79, caseSize: 21, imageUrl: "/alpen-gold-fundu-izum.jpg" },
  { name: "Шоколад \"Альпен Гольд\" с клубнично-йогуртовой начинкой 85гр", category: Category.SNACKS, volumeMl: null, purchasePrice: 79, caseSize: 21, imageUrl: "/alpen-gold-klubnika-yogurt.jpg" },

  // Чай и кофе
  { name: "Кофе Жокей \"Голд\" 75гр м/у", category: Category.COFFEE_TEA, volumeMl: null, purchasePrice: 168, caseSize: 12 },
  { name: "Кофе Жокей \"Импер\" 75гр раст.субл. м/у", category: Category.COFFEE_TEA, volumeMl: null, purchasePrice: 168, caseSize: 12 },
  { name: "Гринфилд \"Голден Цейлон\" 25пак черн.", category: Category.COFFEE_TEA, volumeMl: null, purchasePrice: 72, caseSize: 10, imageUrl: "/greenfield-golden-ceylon.jpg" },
  { name: "Тесс \"Плеже\" 25пак черн. с доб.", category: Category.COFFEE_TEA, volumeMl: null, purchasePrice: 60, caseSize: 10, imageUrl: "/tess-plaisir.jpg" },

  // Консервы
  { name: "Сардина в т/с с овощ. гарн. 240гр ГОСТ (Сохраним Традиции)", category: Category.CANNED, volumeMl: null, purchasePrice: 110, caseSize: 24 },
  { name: "Килька в т/с красная банка", category: Category.CANNED, volumeMl: null, purchasePrice: 49, caseSize: 1 },
];
