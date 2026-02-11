import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Idea {
  id: string;
  title: string;
  description: string;
  author: string;
  votes: number;
  createdAt: string;
  voted: boolean;
}

export const IdeasSection = () => {
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: '1',
      title: 'Мобильное приложение',
      description: 'Создать мобильное приложение для iOS и Android, чтобы можно было управлять проектами прямо со стройки',
      author: 'Иван Петров',
      votes: 24,
      createdAt: '2024-02-10',
      voted: false
    },
    {
      id: '2',
      title: 'Интеграция с 1С',
      description: 'Добавить возможность синхронизации данных с 1С для автоматического переноса финансовой информации',
      author: 'Мария Сидорова',
      votes: 18,
      createdAt: '2024-02-09',
      voted: false
    },
    {
      id: '3',
      title: 'Фото до/после в проектах',
      description: 'Возможность прикреплять фотографии этапов работы, чтобы показывать прогресс заказчикам',
      author: 'Алексей Иванов',
      votes: 31,
      createdAt: '2024-02-08',
      voted: false
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newIdea, setNewIdea] = useState({ title: '', description: '' });

  const handleVote = (ideaId: string) => {
    setIdeas(prevIdeas =>
      prevIdeas.map(idea =>
        idea.id === ideaId
          ? { ...idea, votes: idea.voted ? idea.votes - 1 : idea.votes + 1, voted: !idea.voted }
          : idea
      )
    );
  };

  const handleSubmitIdea = () => {
    if (!newIdea.title.trim() || !newIdea.description.trim()) return;

    const idea: Idea = {
      id: Date.now().toString(),
      title: newIdea.title,
      description: newIdea.description,
      author: 'Вы',
      votes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      voted: false
    };

    setIdeas([idea, ...ideas]);
    setNewIdea({ title: '', description: '' });
    setIsDialogOpen(false);
  };

  const sortedIdeas = [...ideas].sort((a, b) => b.votes - a.votes);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border-l-4 border-primary">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Icon name="Lightbulb" size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Экспериментальный отдел</h3>
            <p className="text-muted-foreground">
              Мы создали экспериментальный отдел, чтобы вы могли предложить свои идеи по улучшению сервиса. 
              Голосуйте за идеи других пользователей — самые популярные мы реализуем в первую очередь!
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Идеи пользователей</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Icon name="Plus" size={18} className="mr-2" />
          Предложить идею
        </Button>
      </div>

      <div className="grid gap-4">
        {sortedIdeas.map((idea) => (
          <div
            key={idea.id}
            className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <Button
                  variant={idea.voted ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleVote(idea.id)}
                  className="h-10 w-10 p-0"
                >
                  <Icon name="ArrowUp" size={18} />
                </Button>
                <span className="text-lg font-bold">{idea.votes}</span>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{idea.title}</h3>
                <p className="text-muted-foreground mb-3">{idea.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="User" size={14} />
                    {idea.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    {new Date(idea.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Предложить идею</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Название идеи</label>
              <Input
                placeholder="Например: Интеграция с WhatsApp"
                value={newIdea.title}
                onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Описание</label>
              <Textarea
                placeholder="Опишите вашу идею подробнее. Какую проблему она решает? Как это должно работать?"
                value={newIdea.description}
                onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                rows={6}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleSubmitIdea}>
                <Icon name="Send" size={18} className="mr-2" />
                Отправить идею
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
