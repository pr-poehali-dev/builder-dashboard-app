import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TeamSectionsProps {
  employees: any[];
  tasks: any[];
  projects: any[];
  isEmployeeDialogOpen: boolean;
  isTaskDialogOpen: boolean;
  showArchivedEmployees: boolean;
  setIsEmployeeDialogOpen: (open: boolean) => void;
  setIsTaskDialogOpen: (open: boolean) => void;
  setShowArchivedEmployees: (value: boolean) => void;
  handleAddEmployee: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAddTask: (e: React.FormEvent<HTMLFormElement>) => void;
  handleArchiveEmployee: (id: number) => void;
  handleUnarchiveEmployee: (id: number) => void;
}

export const renderEmployees = (props: TeamSectionsProps) => {
  const { employees, isEmployeeDialogOpen, setIsEmployeeDialogOpen, handleAddEmployee, handleArchiveEmployee, handleUnarchiveEmployee, showArchivedEmployees, setShowArchivedEmployees } = props;
  const displayedEmployees = showArchivedEmployees ? employees.filter(e => e.archived) : employees.filter(e => !e.archived);

  return (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">Сотрудники</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowArchivedEmployees(!showArchivedEmployees)}
        >
          <Icon name="Archive" size={16} className="mr-2" />
          {showArchivedEmployees ? 'Активные' : 'Архив'}
        </Button>
      </div>
      <Dialog open={isEmployeeDialogOpen} onOpenChange={setIsEmployeeDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Icon name="UserPlus" size={18} className="mr-2" />
            Добавить
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить сотрудника</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddEmployee} className="space-y-4">
            <div>
              <Label htmlFor="empName">ФИО</Label>
              <Input id="empName" name="name" placeholder="Иван Иванов" required />
            </div>
            <div>
              <Label htmlFor="role">Должность</Label>
              <Input id="role" name="role" placeholder="Прораб" required />
            </div>
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+7 (999) 123-45-67" />
            </div>
            <div>
              <Label htmlFor="telegram">Telegram</Label>
              <Input id="telegram" name="telegram" placeholder="@username" />
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" name="whatsapp" type="tel" placeholder="+79991234567" />
            </div>
            <div>
              <Label htmlFor="max">MAX</Label>
              <Input id="max" name="max" placeholder="@max_username" />
            </div>
            <Button type="submit" className="w-full">Добавить сотрудника</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>

    {displayedEmployees.length === 0 && (
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-dashed">
        <CardContent className="pt-6">
          <div className="text-center space-y-4 py-12">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Users" size={40} className="text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{showArchivedEmployees ? 'Архив пуст' : 'Нет сотрудников'}</h3>
              <p className="text-muted-foreground">
                {showArchivedEmployees 
                  ? 'Архивированные сотрудники будут отображаться здесь' 
                  : 'Добавьте сотрудников вашей команды с контактами'}
              </p>
            </div>
            {!showArchivedEmployees && (
              <Button onClick={() => setIsEmployeeDialogOpen(true)} size="lg">
                <Icon name="UserPlus" size={18} className="mr-2" />
                Добавить первого сотрудника
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )}
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {displayedEmployees.map(employee => (
        <Card key={employee.id}>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0"
                onClick={() => {
                  if (employee.archived) {
                    handleUnarchiveEmployee(employee.id);
                  } else {
                    handleArchiveEmployee(employee.id);
                  }
                }}
              >
                <Icon name={employee.archived ? "ArchiveRestore" : "Archive"} size={16} />
              </Button>
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl bg-primary text-white">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{employee.name}</h3>
                <p className="text-sm text-muted-foreground">{employee.role}</p>
              </div>
              <Badge variant="secondary">
                {employee.tasks} {employee.tasks === 1 ? 'задача' : 'задачи'}
              </Badge>
              
              {(employee.phone || employee.telegram || employee.whatsapp || employee.max) && (
                <div className="w-full space-y-2 pt-2 border-t">
                  {employee.phone && (
                    <a 
                      href={`tel:${employee.phone}`}
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon name="Phone" size={14} />
                      <span>{employee.phone}</span>
                    </a>
                  )}
                  {employee.telegram && (
                    <a 
                      href={`https://t.me/${employee.telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon name="Send" size={14} />
                      <span>{employee.telegram}</span>
                    </a>
                  )}
                  {employee.whatsapp && (
                    <a 
                      href={`https://wa.me/${employee.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon name="MessageCircle" size={14} />
                      <span>{employee.whatsapp}</span>
                    </a>
                  )}
                  {employee.max && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="AtSign" size={14} />
                      <span>{employee.max}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
  );
};

export const renderTasks = (props: TeamSectionsProps) => {
  const { tasks, projects, employees, isTaskDialogOpen, setIsTaskDialogOpen, handleAddTask } = props;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Задачи</h2>
        <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icon name="Plus" size={18} className="mr-2" />
              Новая задача
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Создать задачу</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <Label htmlFor="taskTitle">Название задачи</Label>
                <Input id="taskTitle" name="title" placeholder="Залить бетон" required />
              </div>
              <div>
                <Label htmlFor="taskProject">Объект</Label>
                <select id="taskProject" name="project" className="w-full border rounded-lg px-3 py-2" required>
                  {projects.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="taskAssignee">Исполнитель</Label>
                <select id="taskAssignee" name="assignee" className="w-full border rounded-lg px-3 py-2" required>
                  {employees.map(e => (
                    <option key={e.id} value={e.name}>{e.name}</option>
                  ))}
                </select>
              </div>
              <Button type="submit" className="w-full">Создать задачу</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="CheckSquare" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-muted-foreground">{task.project} • {task.assignee}</p>
                  </div>
                </div>
                <Badge variant={task.status === 'В работе' ? 'default' : 'secondary'}>
                  {task.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const renderProfile = (user: any, handleLogout: () => void) => {
  const getIndustryName = (industry: string) => {
    const industries: Record<string, string> = {
      construction: 'Строительство',
      renovation: 'Ремонт и отделка',
      engineering: 'Инженерные системы',
      landscape: 'Благоустройство',
      architecture: 'Архитектура и проектирование',
      other: 'Другое'
    };
    return industries[industry] || industry;
  };

  const initials = user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Профиль</h2>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6 mb-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-3xl bg-primary text-white">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">{user.name}</h3>
              <p className="text-muted-foreground">{user.company}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Телефон</label>
              <p className="text-muted-foreground">{user.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Направление</label>
              <p className="text-muted-foreground">{getIndustryName(user.industry)}</p>
            </div>
          </div>
          
          {(user.telegram || user.instagram || user.vk || user.website) && (
            <>
              <div className="border-t my-6"></div>
              <div>
                <h4 className="text-sm font-medium mb-4">Рабочие страницы</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.telegram && (
                    <div>
                      <label className="text-sm text-muted-foreground flex items-center gap-2">
                        <Icon name="Send" size={14} />
                        Telegram
                      </label>
                      <a 
                        href={`https://t.me/${user.telegram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {user.telegram}
                      </a>
                    </div>
                  )}
                  {user.instagram && (
                    <div>
                      <label className="text-sm text-muted-foreground flex items-center gap-2">
                        <Icon name="Instagram" size={14} />
                        Instagram
                      </label>
                      <a 
                        href={`https://instagram.com/${user.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {user.instagram}
                      </a>
                    </div>
                  )}
                  {user.vk && (
                    <div>
                      <label className="text-sm text-muted-foreground flex items-center gap-2">
                        <Icon name="Share2" size={14} />
                        ВКонтакте
                      </label>
                      <a 
                        href={user.vk.startsWith('http') ? user.vk : `https://${user.vk}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {user.vk}
                      </a>
                    </div>
                  )}
                  {user.website && (
                    <div>
                      <label className="text-sm text-muted-foreground flex items-center gap-2">
                        <Icon name="Globe" size={14} />
                        Сайт
                      </label>
                      <a 
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {user.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};