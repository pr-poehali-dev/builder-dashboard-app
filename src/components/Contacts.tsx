import Icon from '@/components/ui/icon';

const Contacts = () => {
  return (
    <section id="contacts" className="py-16 sm:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-sm font-semibold text-primary tracking-widest uppercase">Свяжитесь</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 sm:mt-4">Контакты</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="MapPin" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-1">Адрес</h3>
                <p className="text-sm sm:text-base text-muted-foreground">г. Казань, ул. Космонавтов, 73</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Удобный подъезд, бесплатная парковка</p>
              </div>
            </div>

            <div className="flex items-start gap-4 sm:gap-5">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Mail" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-1">Email</h3>
                <a href="mailto:info@electroev.ru" className="text-sm sm:text-base text-foreground hover:text-primary transition-colors font-semibold">
                  info@electroev.ru
                </a>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Ответим в течение 30 минут</p>
              </div>
            </div>

            <div className="flex items-start gap-4 sm:gap-5">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Clock" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-1">Часы работы</h3>
                <div className="text-sm sm:text-base text-muted-foreground space-y-1">
                  <p>Пн–Пт: 9:00 – 21:00</p>
                  <p>Сб–Вс: 10:00 – 18:00</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Icon name="MessageCircle" size={20} className="text-muted-foreground" />
              </a>
              <a
                href="#"
                className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Icon name="Send" size={20} className="text-muted-foreground" />
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden h-[300px] sm:h-[400px] lg:h-full border border-border">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=49.1221%2C55.7963&z=16&pt=49.1221%2C55.7963%2Cpm2rdm"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
