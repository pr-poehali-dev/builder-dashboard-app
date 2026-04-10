import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Brands from '@/components/Brands';
import Services from '@/components/Services';
import Advantages from '@/components/Advantages';
import Gallery from '@/components/Gallery';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';
import CallbackDialog from '@/components/CallbackDialog';

const Index = () => {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onCallback={() => setIsCallbackOpen(true)} />
      <Hero onCallback={() => setIsCallbackOpen(true)} />
      <Brands />
      <Services />
      <Advantages />
      <Gallery />
      <Contacts />
      <Footer />
      <CallbackDialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen} />
    </div>
  );
};

export default Index;
