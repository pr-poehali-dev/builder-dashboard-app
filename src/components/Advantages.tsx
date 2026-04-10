import Icon from '@/components/ui/icon';

const advantages = [
  {
    icon: 'Award',
    title: 'Сертифицированные мастера',
    description: 'Наши специалисты прошли обучение у производителей электромобилей и имеют допуск к работе с высоковольтными системами.',
  },
  {
    icon: 'Settings',
    title: 'Профессиональное оборудование',
    description: 'Используем специализированное оборудование для диагностики и ремонта EV: от дилерских сканеров до стендов балансировки ВВБ.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Гарантия на работы',
    description: 'Предоставляем гарантию до 12 месяцев на все выполненные работы. Используем только оригинальные запчасти и расходники.',
  },
  {
    icon: 'Clock',
    title: 'Быстрое обслуживание',
    description: 'Большинство работ выполняем за 1-2 дня. Предоставляем подменный автомобиль на время ремонта при необходимости.',
  },
  {
    icon: 'Banknote',
    title: 'Прозрачные цены',
    description: 'Честная стоимость без скрытых доплат. Согласовываем смету до начала работ, никаких сюрпризов при оплате.',
  },
  {
    icon: 'MapPin',
    title: 'Удобное расположение',
    description: 'Находимся в Москве с удобным подъездом и бесплатной парковкой. Есть зона ожидания с Wi-Fi и кофе.',
  },
];

const Advantages = () => {
  return (
    <section id="advantages" className="py-16 sm:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-sm font-semibold text-primary tracking-widest uppercase">Почему мы</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 sm:mt-4">Наши преимущества</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {advantages.map((item) => (
            <div key={item.title} className="flex gap-4 sm:gap-5">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={26} className="text-primary" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
