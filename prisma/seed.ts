import "dotenv/config";
import { PrismaClient, Category } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const MARKUP = 10;

type Raw = { name: string; category: Category; volumeMl: number | null; purchasePrice: number };

// Наименования и закупочные цены — из прайс-листа поставщика (2026-07-03).
// Одинаковые позиции, встречавшиеся в прайсе дважды, объединены в одну строку.
const products: Raw[] = [
  // Пиво
  { name: "Балтика №0 белое (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 60 },
  { name: "Балтика №0 пшеничное (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 59 },
  { name: "Балтика №3 (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 72 },
  { name: "Балтика №7 мягкое (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 72 },
  { name: "Балтика №7 (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 83 },
  { name: "Балтика №7 (ПЭТ)", category: Category.BEER, volumeMl: null, purchasePrice: 110 },
  { name: "Балтика №9 (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 67 },
  { name: "Балтика №9 (ПЭТ)", category: Category.BEER, volumeMl: 1300, purchasePrice: 127 },
  { name: "Балтика Кулер (ПЭТ)", category: Category.BEER, volumeMl: 1250, purchasePrice: 128 },
  { name: "Крон Бланш Бьер (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 91 },
  { name: "Крон Бланш Бьер (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 91 },
  { name: "Гаррет Черная вишня (ст/б)", category: Category.BEER, volumeMl: 400, purchasePrice: 81 },
  { name: "Жатецкий Гусь (ПЭТ)", category: Category.BEER, volumeMl: 1350, purchasePrice: 147 },
  { name: "Жатецкий Гусь (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 83 },
  { name: "Дон (ПЭТ)", category: Category.BEER, volumeMl: 1500, purchasePrice: 123 },
  { name: "Кулер (ст/б)", category: Category.BEER, volumeMl: 470, purchasePrice: 68 },
  { name: "Кулер (ж/б)", category: Category.BEER, volumeMl: 470, purchasePrice: 70 },
  { name: "Охота крепкое (ПЭТ)", category: Category.BEER, volumeMl: 1250, purchasePrice: 130 },
  { name: "Голд Майн Бир (ПЭТ)", category: Category.BEER, volumeMl: 1200, purchasePrice: 112 },
  { name: "Бочкарев Холод и Солод светлое (ПЭТ)", category: Category.BEER, volumeMl: 950, purchasePrice: 105 },
  { name: "Бочкарев Живой Розлив светлое (ПЭТ)", category: Category.BEER, volumeMl: 950, purchasePrice: 105 },
  { name: "Белый Медведь Светлое (ПЭТ)", category: Category.BEER, volumeMl: 1200, purchasePrice: 115 },
  { name: "Белый Медведь Крепкое (ПЭТ)", category: Category.BEER, volumeMl: 1150, purchasePrice: 135 },
  { name: "Эфес Пилсенер (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 82 },
  { name: "Эсса Солнце на пляже (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 79 },
  { name: "Шпатен Мюнхен Хеллес (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 116 },
  { name: "Хугарден Грейпфрут (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 90 },
  { name: "Хугарден Вишня (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 90 },
  { name: "Хугарден (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 90 },
  { name: "Стелла (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 102 },
  { name: "Старый Мельник из Бочонка мягкое (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 74 },
  { name: "Редд's (ст/б)", category: Category.BEER, volumeMl: 330, purchasePrice: 82 },
  { name: "Мягкий Солод Светлое 4.2% (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 58 },
  { name: "Миллер (ст/б)", category: Category.BEER, volumeMl: 500, purchasePrice: 72 },
  { name: "Корона Экстра (ст/б)", category: Category.BEER, volumeMl: 355, purchasePrice: 118 },
  { name: "Козел Тёмное (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 88 },
  { name: "Козел Светлое (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 88 },
  { name: "Жигули Барное (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 68 },
  { name: "Жигули 1968 (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 64 },
  { name: "Доктор Дизель Малина-Лайм (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 77 },
  { name: "Гринбит (ст/б)", category: Category.BEER, volumeMl: 480, purchasePrice: 75 },
  { name: "Гаррет Грейпфрут (ст/б)", category: Category.BEER, volumeMl: 400, purchasePrice: 87 },
  { name: "Брамма (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 70 },
  { name: "Бочкарев Холод и Солод светлое (ст/б)", category: Category.BEER, volumeMl: 430, purchasePrice: 69 },
  { name: "Бад (ст/б)", category: Category.BEER, volumeMl: 440, purchasePrice: 100 },
  { name: "Амстердам (ст/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 92 },
  { name: "Эфес Пилсенер (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 80 },
  { name: "Шпатен (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 118 },
  { name: "Мягкий Солод Светлое (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 58 },
  { name: "Охота крепкое (ж/б)", category: Category.BEER, volumeMl: 430, purchasePrice: 63 },
  { name: "Жигули Барное (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 68 },
  { name: "Гринбит (ж/б)", category: Category.BEER, volumeMl: 480, purchasePrice: 75 },
  { name: "Велкопоповицкий Козел Тёмное (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 88 },
  { name: "Велкопоповицкий Козел Светлое (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 88 },
  { name: "Бад (ж/б)", category: Category.BEER, volumeMl: 450, purchasePrice: 100 },

  // Энергетики
  { name: "Adrenaline Rush без сахара (белый)", category: Category.ENERGY, volumeMl: 449, purchasePrice: 98 },
  { name: "Adrenaline Rush (ж/б)", category: Category.ENERGY, volumeMl: 250, purchasePrice: 75 },
  { name: "Adrenaline Rush", category: Category.ENERGY, volumeMl: 449, purchasePrice: 102 },
  { name: "Флэш Ягодный (ж/б, все виды)", category: Category.ENERGY, volumeMl: 440, purchasePrice: 63 },
  { name: "Флэш (ПЭТ)", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 88 },
  { name: "Флэш (ПЭТ) 0.5л", category: Category.ENERGY, volumeMl: 500, purchasePrice: 63 },
  { name: "Black Monster ультра фэнтези", category: Category.ENERGY, volumeMl: 500, purchasePrice: 165 },
  { name: "Торнадо Шторм (все виды)", category: Category.ENERGY, volumeMl: 450, purchasePrice: 66 },
  { name: "Торнадо Манго (ПЭТ)", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 89 },
  { name: "Mountain Dew (ПЭТ) 1л", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 95 },
  { name: "Mountain Dew (ПЭТ) 0.5л", category: Category.ENERGY, volumeMl: 500, purchasePrice: 74 },
  { name: "Mountain Dew (ж/б)", category: Category.ENERGY, volumeMl: 330, purchasePrice: 64 },
  { name: "Power Torr Манго (ПЭТ, все виды)", category: Category.ENERGY, volumeMl: 1000, purchasePrice: 90 },
  { name: "Power Torr синий (ПЭТ, все виды)", category: Category.ENERGY, volumeMl: 500, purchasePrice: 59 },
  { name: "Lit Energy Персик (все виды)", category: Category.ENERGY, volumeMl: 450, purchasePrice: 73 },
  { name: "Volt Гуава (ж/б)", category: Category.ENERGY, volumeMl: 450, purchasePrice: 74 },

  // Напитки
  { name: "Мохито клубничный (ж/б)", category: Category.OTHER, volumeMl: 500, purchasePrice: 61 },
  { name: "Добрый Апельсин/Фанта 1л (все виды)", category: Category.OTHER, volumeMl: 1000, purchasePrice: 75 },
  { name: "Добрый Фанта (ПЭТ, все виды)", category: Category.OTHER, volumeMl: 500, purchasePrice: 54 },
  { name: "Добрый Апельсин/Фанта (ж/б, все виды)", category: Category.OTHER, volumeMl: 330, purchasePrice: 55 },
  { name: "Кока-Кола классическая 1л", category: Category.OTHER, volumeMl: 1000, purchasePrice: 59 },
  { name: "Кока-Кола классическая 2л", category: Category.OTHER, volumeMl: 2000, purchasePrice: 80 },
  { name: "Кола (Иран, ст/б)", category: Category.OTHER, volumeMl: 330, purchasePrice: 68 },
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        category: p.category,
        volumeMl: p.volumeMl,
        purchasePrice: p.purchasePrice,
        sellPrice: p.purchasePrice + MARKUP,
      },
    });
  }
  console.log(`Создано товаров: ${products.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
