import Link from "next/link";

export const metadata = {
  title: "Политика конфиденциальности — Йошкар Маркет",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-16 pt-8">
      <Link href="/" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60">
        ← Назад в каталог
      </Link>

      <h1 className="mb-5 text-xl font-bold">Политика конфиденциальности</h1>

      <div className="space-y-4 text-sm leading-relaxed text-foreground/80">
        <p>
          Настоящая политика определяет порядок обработки персональных данных пользователей сайта
          yoshkar-market.ru (далее — «Сайт»), в соответствии с Федеральным законом от 27.07.2006
          № 152-ФЗ «О персональных данных».
        </p>

        <section>
          <h2 className="mb-1.5 font-semibold text-foreground">Оператор персональных данных</h2>
          <p>ИП Байрамова Зарнишан Азиз Кызы, ИНН 121529862040, г. Йошкар-Ола.</p>
        </section>

        <section>
          <h2 className="mb-1.5 font-semibold text-foreground">Какие данные собираются</h2>
          <p>
            При оформлении заказа Сайт собирает: имя, номер телефона и адрес доставки (или
            отметку о самовывозе). Эти данные используются исключительно для обработки и доставки
            заказа, а также для связи с покупателем по вопросам заказа.
          </p>
        </section>

        <section>
          <h2 className="mb-1.5 font-semibold text-foreground">Как используются данные</h2>
          <p>
            Данные не передаются третьим лицам, за исключением случаев, необходимых для доставки
            заказа (например, курьеру), и не используются в рекламных целях без отдельного
            согласия. Данные о заказе хранятся в базе данных магазина.
          </p>
        </section>

        <section>
          <h2 className="mb-1.5 font-semibold text-foreground">Согласие на обработку</h2>
          <p>
            Оформляя заказ на Сайте, пользователь даёт согласие на обработку указанных им
            персональных данных в целях, описанных выше.
          </p>
        </section>

        <section>
          <h2 className="mb-1.5 font-semibold text-foreground">Контакты</h2>
          <p>
            По вопросам, связанным с обработкой персональных данных, можно связаться через контакты,
            указанные при оформлении заказа на Сайте.
          </p>
        </section>
      </div>
    </main>
  );
}
