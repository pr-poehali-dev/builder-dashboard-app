const images = [
  {
    src: 'https://cdn.poehali.dev/projects/31d8a4e2-7e87-4f61-8a2a-78007327d062/files/868f5401-848b-4194-a5d4-fef4f33f3513.jpg',
    alt: 'Сервис электромобилей',
    caption: 'Современный сервисный центр',
  },
  {
    src: 'https://cdn.poehali.dev/projects/31d8a4e2-7e87-4f61-8a2a-78007327d062/files/b01393d0-c0a9-41ad-9edd-7de0471a1c73.jpg',
    alt: 'Обслуживание батареи',
    caption: 'Диагностика высоковольтной батареи',
  },
  {
    src: 'https://cdn.poehali.dev/projects/31d8a4e2-7e87-4f61-8a2a-78007327d062/files/423c3ee7-b79a-49e5-b56a-23d5ff6eadd0.jpg',
    alt: 'Зарядные станции',
    caption: 'Установка зарядных станций',
  },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-sm font-semibold text-primary tracking-widest uppercase">Наш сервис</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 sm:mt-4">Галерея</h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Посмотрите, как выглядит наш сервисный центр и процесс работы
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {images.map((image) => (
            <div
              key={image.alt}
              className="group relative rounded-2xl overflow-hidden aspect-square"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm sm:text-base font-semibold text-foreground">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
