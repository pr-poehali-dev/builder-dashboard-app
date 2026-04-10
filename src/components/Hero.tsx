import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroProps {
  onCallback: () => void;
}

const Hero = ({ onCallback }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://cdn.poehali.dev/projects/31d8a4e2-7e87-4f61-8a2a-78007327d062/files/868f5401-848b-4194-a5d4-fef4f33f3513.jpg"
          alt="Сервис электромобилей"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Специализированный сервис</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-4 sm:mb-6">
            Обслуживание
            <br />
            <span className="text-gradient">электромобилей</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mb-8 sm:mb-10 leading-relaxed">
            Профессиональная диагностика, ремонт и техобслуживание электрокаров
            всех марок. Современное оборудование и гарантия на все работы.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="text-base font-bold px-8 h-14"
              onClick={onCallback}
            >
              <Icon name="Calendar" size={20} className="mr-2" />
              Оставить заявку
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base font-medium px-8 h-14 border-border hover:bg-secondary"
              onClick={() => {
                const el = document.querySelector('#services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Наши услуги
              <Icon name="ArrowDown" size={18} className="ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-border">
            <div>
              <p className="text-2xl sm:text-4xl font-black text-primary">500+</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Обслужено авто</p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-black text-primary">12</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Лет опыта</p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-black text-primary">24</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Марки авто</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;