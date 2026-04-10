import Icon from '@/components/ui/icon';

const services = [
  {
    icon: 'MonitorSmartphone',
    title: 'Компьютерная диагностика',
    description: 'Полная диагностика всех систем электромобиля: батарея, электромотор, инвертор, BMS, системы безопасности и ADAS.',
    price: 'от 3 000 ₽',
  },
  {
    icon: 'Battery',
    title: 'Обслуживание батареи',
    description: 'Диагностика состояния ВВБ, балансировка ячеек, замена модулей, восстановление ёмкости аккумулятора.',
    price: 'от 5 000 ₽',
  },
  {
    icon: 'Cog',
    title: 'Ремонт электромотора',
    description: 'Диагностика и ремонт тяговых электродвигателей, замена подшипников, перемотка обмоток, ремонт инвертора.',
    price: 'от 8 000 ₽',
  },
  {
    icon: 'Plug',
    title: 'Зарядные системы',
    description: 'Ремонт и замена бортовых зарядных устройств, разъёмов, установка и настройка домашних станций зарядки.',
    price: 'от 4 000 ₽',
  },
  {
    icon: 'Thermometer',
    title: 'Система охлаждения',
    description: 'Обслуживание термосистемы батареи и электромотора: замена теплоносителя, ремонт помпы, радиатора.',
    price: 'от 3 500 ₽',
  },
  {
    icon: 'ShieldCheck',
    title: 'ТО электромобиля',
    description: 'Плановое техобслуживание: тормозная система, подвеска, рулевое, кондиционер, обновление ПО.',
    price: 'от 6 000 ₽',
  },
  {
    icon: 'Wrench',
    title: 'Ходовая и тормоза',
    description: 'Ремонт подвески, замена тормозных колодок и дисков, балансировка колёс, развал-схождение.',
    price: 'от 2 500 ₽',
  },
  {
    icon: 'Cpu',
    title: 'Обновление ПО',
    description: 'Установка обновлений прошивок, активация функций, русификация, настройка параметров через OBD.',
    price: 'от 2 000 ₽',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-sm font-semibold text-primary tracking-widest uppercase">Что мы делаем</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 sm:mt-4">Наши услуги</h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Полный спектр услуг по обслуживанию и ремонту электромобилей
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon name={service.icon} size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
              <p className="text-primary font-bold text-sm">{service.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
