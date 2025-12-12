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
            <Button type="submit" className="w-full">Добавить сотрудника</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>

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

export const renderProfile = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Профиль</h2>
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="text-3xl bg-primary text-white">АП</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-semibold">Алексей Петров</h3>
            <p className="text-muted-foreground">Владелец компании</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <p className="text-muted-foreground">alexey@example.com</p>
          </div>
          <div>
            <label className="text-sm font-medium">Телефон</label>
            <p className="text-muted-foreground">+7 (999) 123-45-67</p>
          </div>
          <div>
            <label className="text-sm font-medium">Компания</label>
            <p className="text-muted-foreground">СтройМастер ООО</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);