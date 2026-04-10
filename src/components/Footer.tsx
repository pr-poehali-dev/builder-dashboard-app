import Icon from '@/components/ui/icon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold">ELECTRO</span>
                <span className="text-xl font-bold text-primary">EV</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Специализированный сервисный центр по обслуживанию и ремонту электромобилей в Москве.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Услуги</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">Диагностика</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Ремонт батареи</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Обслуживание</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Зарядные станции</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Марки</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#brands" className="hover:text-primary transition-colors">Tesla</a></li>
              <li><a href="#brands" className="hover:text-primary transition-colors">BMW</a></li>
              <li><a href="#brands" className="hover:text-primary transition-colors">Mercedes</a></li>
              <li><a href="#brands" className="hover:text-primary transition-colors">Все марки</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={14} className="text-primary" />
                <a href="tel:+74994604132" className="hover:text-primary transition-colors">+7 (499) 460-41-32</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={14} className="text-primary" />
                <a href="mailto:info@electroev.ru" className="hover:text-primary transition-colors">info@electroev.ru</a>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="MapPin" size={14} className="text-primary mt-0.5" />
                <span>Москва, 3-я Мытищинская ул., 16, стр. 25</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            &copy; {currentYear} ELECTRO EV. Все права защищены.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-primary transition-colors">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
