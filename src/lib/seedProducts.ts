import { Category } from "@/generated/prisma/client";

export const MARKUP = 10;

export function getMarkup(category: Category): number {
  // Энергетики, напитки и чай/кофе — наценка +20₽ вместо стандартных +10₽.
  const MARKUP_20_CATEGORIES: Category[] = [Category.ENERGY, Category.OTHER, Category.COFFEE_TEA];
  return MARKUP_20_CATEGORIES.includes(category) ? 20 : MARKUP;
}

export function computeSellPrice(purchasePrice: number, markup: number): number {
  return purchasePrice + markup;
}

export type SeedProduct = {
  name: string;
  category: Category;
  volumeMl: number | null;
  weightGrams?: number;
  purchasePrice: number;
  caseSize: number;
  imageUrl?: string;
  /** Наценка для конкретного товара, если она отличается от стандартной
   * для его категории (см. getMarkup) — например, когда поставщик даёт
   * разную закупочную цену на похожие товары одной категории. */
  markup?: number;
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
  { name: "Гаррет Грейпфрут (ст/б)", category: Category.BEER, volumeMl: 400, purchasePrice: 87, caseSize: 20, imageUrl: "/garret-greypfrut-stb.jpg" },
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
  { name: "Ловенбрау (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 82, caseSize: 24, imageUrl: "/lowenbrau-jb.jpg" },
  { name: "Эсса Ананас Грейпфрут (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 79, caseSize: 20, markup: 10, imageUrl: "/essa-ananas-greypfrut.jpg" },

  // Энергетики
  { name: "Adrenaline Rush Sugar Free (White)", category: Category.ENERGY, volumeMl: 449, purchasePrice: 98, caseSize: 12, imageUrl: "/adrenaline-rush-zero-white.jpg" },
  { name: "Adrenaline Rush 0,25л", category: Category.ENERGY, volumeMl: 250, purchasePrice: 75, caseSize: 12, imageUrl: "/adrenaline-rush-025-jb.jpg" },
  { name: "Adrenaline Rush", category: Category.ENERGY, volumeMl: 449, purchasePrice: 102, caseSize: 12, imageUrl: "/adrenaline-rush-classic.jpg" },
  { name: "Flash Berry", category: Category.ENERGY, volumeMl: 440, purchasePrice: 63, caseSize: 24, imageUrl: "/flash-yagodniy-jb.jpg" },
  { name: "Flash", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 88, caseSize: 9, imageUrl: "/flash-pet-1l.jpg" },
  { name: "Flash 0.5л", category: Category.ENERGY, volumeMl: 500, purchasePrice: 63, caseSize: 20, imageUrl: "/flash-pet-05.jpg" },
  { name: "Black Monster Ultra Fantasy", category: Category.ENERGY, volumeMl: 500, purchasePrice: 165, caseSize: 12, imageUrl: "/monster-ultra-black.jpg" },
  { name: "Tornado Storm", category: Category.ENERGY, volumeMl: 450, purchasePrice: 66, caseSize: 12, imageUrl: "/tornado-storm.jpg" },
  { name: "Tornado Mango", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 89, caseSize: 6, imageUrl: "/tornado-mango-pet.jpg" },
  { name: "Mountain Dew 1л", category: Category.OTHER, volumeMl: 1000, purchasePrice: 95, caseSize: 9, imageUrl: "/mountain-dew-pet-1l.jpg" },
  { name: "Mountain Dew 0.5л", category: Category.OTHER, volumeMl: 500, purchasePrice: 74, caseSize: 12, imageUrl: "/mountain-dew-pet-05.jpg" },
  { name: "Mountain Dew", category: Category.OTHER, volumeMl: 330, purchasePrice: 64, caseSize: 24, imageUrl: "/mountain-dew-jb.jpg" },
  { name: "Power Torr Mango", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 90, caseSize: 6, imageUrl: "/power-torr-mango-pet.jpg" },
  { name: "Power Torr Blue", category: Category.ENERGY, volumeMl: 500, purchasePrice: 59, caseSize: 12, imageUrl: "/power-torr-siniy-pet.jpg" },
  { name: "Lit Energy Peach", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-peach.jpg" },
  { name: "Lit Energy Raspberry Crush", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-malina-crush.jpg" },
  { name: "Lit Energy Berry Coconut", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-berry-coconut.jpg" },
  { name: "Lit Energy Classic", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-classic.jpg" },
  { name: "Lit Energy Original", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-original.jpg" },
  { name: "Lit Energy Blueberry", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-blueberry.jpg" },
  { name: "Lit Energy Citrus Punch", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-citrus-punch.jpg" },
  { name: "Lit Energy Strawberry Bubblegum", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73, caseSize: 12, imageUrl: "/lit-energy-strawberry-bubblegum.jpg" },
  { name: "Volt Гуава", category: Category.ENERGY, volumeMl: 450, purchasePrice: 74, caseSize: 24, imageUrl: "/volt-guava-jb.jpg" },
  { name: "Gorilla Lychee & Pear", category: Category.ENERGY, volumeMl: 450, purchasePrice: 78, caseSize: 24, imageUrl: "/gorilla-lychee-pear-jb.jpg" },
  { name: "Flash Ultra", category: Category.ENERGY, volumeMl: 450, purchasePrice: 63, caseSize: 24, imageUrl: "/flesh-ultra-jb.jpg" },
  { name: "Burn Watermelon Sugar Free", category: Category.ENERGY, volumeMl: 500, purchasePrice: 88, caseSize: 12, imageUrl: "/burn-arbuz.jpg" },
  { name: "Black Monster Ultra White", category: Category.ENERGY, volumeMl: 500, purchasePrice: 160, caseSize: 12, imageUrl: "/black-monster-ultra-white.jpg" },

  // Напитки
  { name: "Добрый Pulpy Апельсин 0,45л", category: Category.OTHER, volumeMl: 450, purchasePrice: 57, caseSize: 12, imageUrl: "/dobriy-pulpy-apelsin.jpg" },
  { name: "Мохито клубничный", category: Category.OTHER, volumeMl: 500, purchasePrice: 61, caseSize: 24, imageUrl: "/mohito-klubnichniy-jb.jpg" },
  { name: "Добрый Апельсин/Фанта 1л", category: Category.OTHER, volumeMl: 1000, purchasePrice: 75, caseSize: 12, imageUrl: "/dobriy-fanta-pet.jpg" },
  { name: "Добрый Фанта", category: Category.OTHER, volumeMl: 500, purchasePrice: 54, caseSize: 24, imageUrl: "/dobriy-fanta-pet.jpg" },
  { name: "Фанта", category: Category.OTHER, volumeMl: 330, purchasePrice: 55, caseSize: 12, imageUrl: "/fanta-jb.jpg" },
  { name: "Кока-Кола классическая 1л", category: Category.OTHER, 
    volumeMl: 1000, purchasePrice: 59, caseSize: 9, imageUrl: "/koka-kola-1l.jpg" },
  { name: "Кока-Кола классическая 2л", category: Category.OTHER, volumeMl: 2000, purchasePrice: 80, caseSize: 6, imageUrl: "/koka-kola-2l.jpg" },
  { name: "Кола (Иран, ст/б)", category: Category.OTHER, volumeMl: 330, purchasePrice: 68, caseSize: 15, imageUrl: "/kola-iran-stb.jpg" },
  { name: "Пепси 2л", category: Category.OTHER, volumeMl: 2000, purchasePrice: 85, caseSize: 6, imageUrl: "/pepsi-2l.jpg" },
  { name: "Фанта 2л", category: Category.OTHER, volumeMl: 2000, purchasePrice: 85, caseSize: 6, imageUrl: "/fanta-2l.jpg" },
  { name: "Пепси 1л", category: Category.OTHER, volumeMl: 1000, purchasePrice: 55, caseSize: 12, imageUrl: "/pepsi-1l.jpg" },
  { name: "Квас \"Вятский Хлебный\"", category: Category.OTHER, volumeMl: 1500, purchasePrice: 105, caseSize: 6, imageUrl: "/kvas-vyatskiy-hlebniy.jpg" },
  { name: "Фанта 1л", category: Category.OTHER, volumeMl: 1000, purchasePrice: 58, caseSize: 12, imageUrl: "/fanta-1l.jpg" },
  { name: "Спрайт 1л", category: Category.OTHER, volumeMl: 1000, purchasePrice: 58, caseSize: 12, imageUrl: "/sprite-1l.jpg" },
  { name: "Вода \"Сестрица\" природная газ. 1.5л", category: Category.OTHER, volumeMl: 1500, purchasePrice: 35, caseSize: 6, imageUrl: "/sestritsa-gaz-15l.jpg" },
  { name: "Вода \"Сестрица\" природная негаз. 1.5л", category: Category.OTHER, volumeMl: 1500, purchasePrice: 35, caseSize: 6, imageUrl: "/sestritsa-negaz-15l.jpg" },
  { name: "Вода \"Сестрица\" б/г 0.5л", category: Category.OTHER, volumeMl: 500, purchasePrice: 25, caseSize: 12, imageUrl: "/sestritsa-bg-05l.jpg" },
  { name: "Сок \"Джу100\" Яблочно-грушевый 1л", category: Category.OTHER, volumeMl: 1000, purchasePrice: 54, caseSize: 12, imageUrl: "/dju100-yabloko-grusha.jpg" },
  { name: "Напиток \"Ярмарка\" Лимонад 1.5л", category: Category.OTHER, volumeMl: 1500, purchasePrice: 37, caseSize: 6, imageUrl: "/yarmarka-limonad.jpg" },
  { name: "Напиток \"Ярмарка\" Тархун 1.5л", category: Category.OTHER, volumeMl: 1500, purchasePrice: 37, caseSize: 6, imageUrl: "/yarmarka-tarhun.jpg" },
  { name: "Напиток \"Ярмарка\" Мохито 1.5л", category: Category.OTHER, volumeMl: 1500, purchasePrice: 37, caseSize: 6, imageUrl: "/yarmarka-mohito.jpg" },
  { name: "Напиток \"Ярмарка\" Клубника 1.5л", category: Category.OTHER, volumeMl: 1500, purchasePrice: 37, caseSize: 6, imageUrl: "/yarmarka-klubnika.jpg" },
  { name: "Напиток \"Натахтари\" Тархун (ст/б)", category: Category.OTHER, volumeMl: 500, purchasePrice: 90, caseSize: 20, imageUrl: "/natahtari-tarhun.jpg" },
  { name: "Напиток \"Натахтари\" Груша (ст/б)", category: Category.OTHER, volumeMl: 500, purchasePrice: 90, caseSize: 20, imageUrl: "/natahtari-grusha.jpg" },
  { name: "Напиток \"Натахтари\" Лимон и лайм (ст/б)", category: Category.OTHER, volumeMl: 500, purchasePrice: 90, caseSize: 20, imageUrl: "/natahtari-limon-i-laym.jpg" },
  { name: "Напиток \"Натахтари\" Фейхоа (ст/б)", category: Category.OTHER, volumeMl: 500, purchasePrice: 90, caseSize: 20, imageUrl: "/natahtari-feyhoa.jpg" },
  { name: "Добрый Кола", category: Category.OTHER, volumeMl: 330, purchasePrice: 55, caseSize: 24, imageUrl: "/dobriy-kola-jb.jpg" },
  { name: "Кола (Иран, ж/б)", category: Category.OTHER, volumeMl: 300, purchasePrice: 57, caseSize: 24, imageUrl: "/kola-iran-jb.jpg" },
  { name: "Квас Бочковой 1,5л", category: Category.OTHER, volumeMl: 1500, purchasePrice: 79, caseSize: 6, imageUrl: "/kvas-bochkovoy-15l.jpg" },
  { name: "Аллея Источников №17", category: Category.OTHER, volumeMl: 1500, purchasePrice: 47, caseSize: 6, imageUrl: "/alleya-istochnikov-17.jpg" },
  { name: "Букет Чувашии со вкусом лимона 0,5л", category: Category.OTHER, volumeMl: 500, purchasePrice: 37, caseSize: 12, imageUrl: "/buket-chuvashii-05l.jpg" },
  { name: "Букет Чувашии с ароматом лимона 1,5л", category: Category.OTHER, volumeMl: 1500, purchasePrice: 85, caseSize: 6, imageUrl: "/buket-chuvashii-15l.jpg" },
  { name: "Раифский источник без газа 1,5л", category: Category.OTHER, volumeMl: 1500, purchasePrice: 37, caseSize: 6, imageUrl: "/raifsky-bez-gaza.jpg" },
  { name: "Раифский источник газ. 1,5л", category: Category.OTHER, volumeMl: 1500, purchasePrice: 37, caseSize: 6, imageUrl: "/raifsky-gaz.jpg" },
  { name: "Квас Домашний 1,5л", category: Category.OTHER, volumeMl: 1500, purchasePrice: 98, caseSize: 6, imageUrl: "/kvas-domashniy.jpg" },
  { name: "Спрайт (ж/б, Иран)", category: Category.OTHER, volumeMl: 300, purchasePrice: 55, caseSize: 24, imageUrl: "/sprite-jb-iran.jpg" },
  { name: "Морс \"Калинов\" Клюква", category: Category.OTHER, volumeMl: 1700, purchasePrice: 98, caseSize: 6, imageUrl: "/kalinov-rodnik-klukva.jpg" },

  // Снеки и сладости
  { name: "Чоко Пай 6шт", category: Category.SNACKS, volumeMl: null, purchasePrice: 70, caseSize: 16, imageUrl: "/choco-pie-6pack.jpg" },
  { name: "Вафли \"Артековские\"", category: Category.SNACKS, volumeMl: null, weightGrams: 5000, purchasePrice: 1285, caseSize: 1, markup: 20, imageUrl: "/vafli-artekovskie.jpg" },
  { name: "Шоколад молочный \"Алёнка\"", category: Category.SNACKS, volumeMl: null, weightGrams: 75, purchasePrice: 78, caseSize: 16, imageUrl: "/alenka-75g.jpg" },
  { name: "Вафли \"Зебра\" с карам. арахис и изюм", category: Category.SNACKS, volumeMl: null, weightGrams: 40, purchasePrice: 33, caseSize: 15, imageUrl: "/vafli-zebra.jpg" },
  { name: "Печенье Твикс", category: Category.SNACKS, volumeMl: null, weightGrams: 55, purchasePrice: 46, caseSize: 40, imageUrl: "/twix.jpg" },
  { name: "Конфета \"Баунти\"", category: Category.SNACKS, volumeMl: null, weightGrams: 55, purchasePrice: 46, caseSize: 32, imageUrl: "/bounty.jpg" },
  { name: "Халва подсолнечная", category: Category.SNACKS, volumeMl: null, weightGrams: 5000, purchasePrice: 248, caseSize: 1, imageUrl: "/halva.jpg" },
  { name: "Шоколад \"Альпен Гольд\" с фундуком и изюмом", category: Category.SNACKS, volumeMl: null, weightGrams: 85, purchasePrice: 79, caseSize: 21, imageUrl: "/alpen-gold-fundu-izum.jpg" },
  { name: "Шоколад \"Альпен Гольд\" с клубнично-йогуртовой начинкой", category: Category.SNACKS, volumeMl: null, weightGrams: 85, purchasePrice: 79, caseSize: 21, imageUrl: "/alpen-gold-klubnika-yogurt.jpg" },
  { name: "Чипсы \"Лейс\" бекон", category: Category.SNACKS, volumeMl: null, weightGrams: 70, purchasePrice: 82, caseSize: 25, markup: 10, imageUrl: "/lays-bekon.jpg" },
  { name: "Чипсы \"Лейс\" сыр", category: Category.SNACKS, volumeMl: null, weightGrams: 70, purchasePrice: 82, caseSize: 25, markup: 10, imageUrl: "/lays-syr.jpg" },
  { name: "Чипсы \"Лейс\" малосольные огурцы", category: Category.SNACKS, volumeMl: null, weightGrams: 140, purchasePrice: 143, caseSize: 19, markup: 10, imageUrl: "/lays-ogurcy.jpg" },
  { name: "Lit Energy Chips Sour Cream & Herbs", category: Category.SNACKS, volumeMl: null, weightGrams: 120, purchasePrice: 126, caseSize: 1, markup: 20, imageUrl: "/lit-energy-chips-smetana-zelen.jpg" },
  { name: "Lit Energy Chips Paprika", category: Category.SNACKS, volumeMl: null, weightGrams: 120, purchasePrice: 126, caseSize: 1, markup: 20, imageUrl: "/lit-energy-chips-paprika.jpg" },
  { name: "Lit Energy Chips Cheddar Cheese", category: Category.SNACKS, volumeMl: null, weightGrams: 120, purchasePrice: 126, caseSize: 1, markup: 20, imageUrl: "/lit-energy-chips-cheddar.jpg" },
  { name: "Lit Energy Chips Sakhalin Crab", category: Category.SNACKS, volumeMl: null, weightGrams: 120, purchasePrice: 126, caseSize: 1, markup: 20, imageUrl: "/lit-energy-chips-krab.jpg" },
  { name: "Батончик \"Супер\" нуга и карамель", category: Category.SNACKS, volumeMl: null, weightGrams: 40, purchasePrice: 14, caseSize: 18, markup: 5, imageUrl: "/super-batonchik.jpg" },
  { name: "M&M's шоколад", category: Category.SNACKS, volumeMl: null, weightGrams: 45, purchasePrice: 58, caseSize: 32, markup: 0, imageUrl: "/mms-shokolad.jpg" },
  { name: "\"Веселики\" кукурузные палочки", category: Category.SNACKS, volumeMl: null, weightGrams: 500, purchasePrice: 135, caseSize: 1, markup: 10, imageUrl: "/veseliki-kukuruz.jpg" },
  { name: "Сникерс", category: Category.SNACKS, volumeMl: null, weightGrams: 50, purchasePrice: 46, caseSize: 48, markup: 4, imageUrl: "/snickers.jpg" },
  { name: "Марс Макс", category: Category.SNACKS, volumeMl: null, weightGrams: 81, purchasePrice: 67, caseSize: 24, markup: 10, imageUrl: "/mars-max.jpg" },

  // Чай и кофе
  { name: "Кофе Жокей \"Голд\" м/у", category: Category.COFFEE_TEA, volumeMl: null, weightGrams: 75, purchasePrice: 168, caseSize: 12 },
  { name: "Кофе Жокей \"Импер\" раст.субл. м/у", category: Category.COFFEE_TEA, volumeMl: null, weightGrams: 75, purchasePrice: 168, caseSize: 12, imageUrl: "/kofe-zhokey-imper.jpg" },
  { name: "Гринфилд \"Голден Цейлон\" 25пак черн.", category: Category.COFFEE_TEA, volumeMl: null, purchasePrice: 72, caseSize: 10, imageUrl: "/greenfield-golden-ceylon.jpg" },
  { name: "Гринфилд \"Грин Мелисса\" 100пак", category: Category.COFFEE_TEA, volumeMl: null, purchasePrice: 258, caseSize: 9, markup: 20, imageUrl: "/greenfield-green-melissa.jpg" },
  { name: "Тесс \"Плеже\" 25пак черн. с доб.", category: Category.COFFEE_TEA, volumeMl: null, purchasePrice: 60, caseSize: 10, imageUrl: "/tess-plaisir.jpg" },
  { name: "Принцесса \"Нури\" Высокогорный 100пак. черн.", category: Category.COFFEE_TEA, volumeMl: null, purchasePrice: 148, caseSize: 18, imageUrl: "/princessa-nuri-vysokogorny.jpg" },
  { name: "Кофе \"Нескафе 3в1\" Классик", category: Category.COFFEE_TEA, volumeMl: null, weightGrams: 15, purchasePrice: 290, caseSize: 20, imageUrl: "/nescafe-3v1-classic.jpg" },
  { name: "Кофе \"Якобс Монарх Интенс\" (ст/б)", category: Category.COFFEE_TEA, volumeMl: null, weightGrams: 48, purchasePrice: 185, caseSize: 12, markup: 20, imageUrl: "/jacobs-monarch-intense.jpg" },
  { name: "Кофе \"Черная карта голд\"", category: Category.COFFEE_TEA, volumeMl: null, weightGrams: 75, purchasePrice: 185, caseSize: 12, markup: 20, imageUrl: "/chernaya-karta-gold.jpg" },
  { name: "Кофе \"Суаре\" \"Кофейня на паяхъ\"", category: Category.COFFEE_TEA, volumeMl: null, weightGrams: 75, purchasePrice: 228, caseSize: 12, markup: 20, imageUrl: "/suare-kofeynya.jpg" },
  { name: "Кофе Жокей \"Триумф\" раст.субл. м/у", category: Category.COFFEE_TEA, volumeMl: null, weightGrams: 75, purchasePrice: 168, caseSize: 12, markup: 20, imageUrl: "/zhokey-triumf.jpg" },

  // Консервы
  { name: "Сардина в т/с с овощ. гарн. ГОСТ (Сохраним Традиции)", category: Category.CANNED, volumeMl: null, weightGrams: 240, purchasePrice: 110, caseSize: 24, imageUrl: "/sardina-v-tomate.jpg" },
  { name: "Килька в т/с красная банка", category: Category.CANNED, volumeMl: null, purchasePrice: 49, caseSize: 1, imageUrl: "/kilka-v-tomate.jpg" },
  { name: "Скумбрия в масле (Сохраним традиции)", category: Category.CANNED, volumeMl: null, weightGrams: 240, purchasePrice: 165, caseSize: 24, imageUrl: "/skumbriya-v-masle.jpg" },
  { name: "Сгущенка \"МариМолоко\" 250г", category: Category.CANNED, volumeMl: null, weightGrams: 250, purchasePrice: 52, caseSize: 24, imageUrl: "/sgushenka-marimoloko.jpg" },
  { name: "Горошек \"Фрау Марта\"", category: Category.CANNED, volumeMl: null, weightGrams: 310, purchasePrice: 68, caseSize: 15, imageUrl: "/frau-marta-goroshek.jpg" },
  { name: "Сгущенка \"МариМолоко\" 350г", category: Category.CANNED, volumeMl: null, weightGrams: 350, purchasePrice: 56, caseSize: 24, markup: 15, imageUrl: "/sgushenka-marimoloko-350.jpg" },
  { name: "Сгущенка \"МариМолоко\" 450г", category: Category.CANNED, volumeMl: null, weightGrams: 450, purchasePrice: 71, caseSize: 30, markup: 10, imageUrl: "/sgushenka-marimoloko-350.jpg" },
  { name: "Хрен \"Махеевъ\" туба столовый", category: Category.CANNED, volumeMl: null, weightGrams: 100, purchasePrice: 60, caseSize: 15, markup: 10, imageUrl: "/maheev-hren.jpg" },

  // Бакалея
  { name: "Гречка", category: Category.GROCERY, volumeMl: null, weightGrams: 10000, purchasePrice: 500, caseSize: 1, markup: 100, imageUrl: "/grechka-10kg.jpg" },
  { name: "Рис круглозерный", category: Category.GROCERY, volumeMl: null, weightGrams: 10000, purchasePrice: 585, caseSize: 1, markup: 100, imageUrl: "/ris-kruglozerniy-10kg.jpg" },
  { name: "Рис пропаренный", category: Category.GROCERY, volumeMl: null, weightGrams: 3000, purchasePrice: 365, caseSize: 1, markup: 40, imageUrl: "/ris-proparenniy-3kg.jpg" },
  { name: "Масло \"Злато\"", category: Category.GROCERY, volumeMl: 800, purchasePrice: 125, caseSize: 15, markup: 20, imageUrl: "/maslo-zlato-08l.jpg" },
  { name: "Корица молотая", category: Category.GROCERY, volumeMl: null, weightGrams: 10, purchasePrice: 12, caseSize: 150, markup: 10, imageUrl: "/koritsa-molotaya.jpg" },
  { name: "Приправа \"Магия Востока\" овощная универсальная", category: Category.GROCERY, volumeMl: null, weightGrams: 75, purchasePrice: 23, caseSize: 20, markup: 10, imageUrl: "/magiya-vostoka-ovoshnaya.jpg" },
  { name: "Бумага туалетная \"Челны\"", category: Category.GROCERY, volumeMl: null, purchasePrice: 23.5, caseSize: 48, markup: 10, imageUrl: "/bumaga-chelny.jpg" },
  { name: "Макаронные изделия \"Ситно\" рожки", category: Category.GROCERY, volumeMl: null, weightGrams: 5000, purchasePrice: 268, caseSize: 1, markup: 100, imageUrl: "/sitno-rozhki-5kg.jpg" },
  { name: "Соль \"Илецкая\"", category: Category.GROCERY, volumeMl: null, weightGrams: 30000, purchasePrice: 465, caseSize: 1, markup: 200, imageUrl: "/sol-ileckaya.jpg" },
  { name: "Горох колотый", category: Category.GROCERY, volumeMl: null, weightGrams: 25000, purchasePrice: 900, caseSize: 1, markup: 120, imageUrl: "/goroh-kolotiy.jpg" },
  { name: "Лапша \"Биг Ланч\" курица", category: Category.GROCERY, volumeMl: null, weightGrams: 90, purchasePrice: 49, caseSize: 24, markup: 10, imageUrl: "/big-lanch-kuritsa.jpg" },
  { name: "Сахар кусковой", category: Category.GROCERY, volumeMl: null, weightGrams: 500, purchasePrice: 54, caseSize: 40, markup: 0 },
  { name: "Сахар", category: Category.GROCERY, volumeMl: null, weightGrams: 250, purchasePrice: 41, caseSize: 40, markup: 0 },
  { name: "Бульон \"Роллтон\" куриный домашний", category: Category.GROCERY, volumeMl: null, weightGrams: 100, purchasePrice: 28, caseSize: 24, markup: 10, imageUrl: "/rollton-bulon-kuriniy.jpg" },

  // Зоотовары
  { name: "Сухой корм \"Китикет\"", category: Category.PET_SUPPLIES, volumeMl: null, weightGrams: 15000, purchasePrice: 3600, caseSize: 1, markup: 100, imageUrl: "/kitekat-15kg.jpg" },
  { name: "Корм для кошек \"Мурчик\" с индейкой", category: Category.PET_SUPPLIES, volumeMl: null, weightGrams: 75, purchasePrice: 17.5, caseSize: 35, markup: 10, imageUrl: "/murchik-indeyka.jpg" },

  // Фрукты и овощи
  { name: "Черешня", category: Category.PRODUCE, volumeMl: null, weightGrams: 1000, purchasePrice: 350, caseSize: 1, markup: 49, imageUrl: "/chereshnya.jpg" },
  { name: "Нектарины азербайджанские", category: Category.PRODUCE, volumeMl: null, weightGrams: 1000, purchasePrice: 140, caseSize: 1, markup: 39, imageUrl: "/nektariny-azerbaydzhan.jpg" },
  { name: "Томаты розовые", category: Category.PRODUCE, volumeMl: null, weightGrams: 1000, purchasePrice: 70, caseSize: 1, markup: 50, imageUrl: "/tomaty-rozoviye.jpg" },
  { name: "Огурцы грунтовые", category: Category.PRODUCE, volumeMl: null, weightGrams: 1000, purchasePrice: 90, caseSize: 1, markup: 20, imageUrl: "/ogurtsy-gruntoviye.jpg" },
  { name: "Картофель", category: Category.PRODUCE, volumeMl: null, weightGrams: 1000, purchasePrice: 45, caseSize: 1, markup: 20, imageUrl: "/kartofel.jpg" },
  { name: "Лук", category: Category.PRODUCE, volumeMl: null, weightGrams: 1000, purchasePrice: 45, caseSize: 1, markup: 15, imageUrl: "/luk.jpg" },
];
