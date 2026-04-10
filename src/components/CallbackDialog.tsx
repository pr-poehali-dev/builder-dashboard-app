import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface CallbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CallbackDialog = ({ open, onOpenChange }: CallbackDialogProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast({ title: 'Заполните обязательные поля', variant: 'destructive' });
      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setMessage('');
      onOpenChange(false);
    }, 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Записаться на сервис</DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-8">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Заявка отправлена!</h3>
            <p className="text-sm text-muted-foreground">Перезвоним в течение 15 минут</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Имя *</label>
              <Input
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Телефон *</label>
              <Input
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Марка авто и описание проблемы</label>
              <Textarea
                placeholder="Tesla Model 3, не заряжается..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="bg-secondary border-border"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-base font-bold">
              <Icon name="Send" size={18} className="mr-2" />
              Отправить заявку
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CallbackDialog;
