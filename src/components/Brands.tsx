const brands = [
  { name: 'Tesla', models: 'Model S, 3, X, Y' },
  { name: 'BMW', models: 'iX, i4, i7, iX3' },
  { name: 'Mercedes', models: 'EQA, EQB, EQC, EQS' },
  { name: 'Audi', models: 'e-tron, Q4, Q8' },
  { name: 'Porsche', models: 'Taycan, Macan EV' },
  { name: 'Volkswagen', models: 'ID.3, ID.4, ID.5' },
  { name: 'Hyundai', models: 'Ioniq 5, Ioniq 6' },
  { name: 'Kia', models: 'EV6, EV9, Niro EV' },
  { name: 'NIO', models: 'ES6, ES8, ET5, ET7' },
  { name: 'BYD', models: 'Atto 3, Han, Tang' },
  { name: 'Zeekr', models: '001, 009, X' },
  { name: 'Li Auto', models: 'L7, L8, L9' },
];

const Brands = () => {
  return (
    <section id="brands" className="py-16 sm:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-sm font-semibold text-primary tracking-widest uppercase">Работаем с</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 sm:mt-4">Все популярные марки</h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Обслуживаем электромобили всех ведущих производителей.
            Знаем особенности каждой марки и модели.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group p-4 sm:p-6 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-default"
            >
              <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {brand.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">{brand.models}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-6 sm:mt-8 text-sm">
          Не нашли свою марку? Позвоните нам — работаем с любыми электромобилями.
        </p>
      </div>
    </section>
  );
};

export default Brands;
