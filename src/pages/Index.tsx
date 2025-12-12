import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const mockProjects = [
  {
    id: 1,
    name: 'ЖК Новый Горизонт',
    address: 'ул. Ленина, 45',
    progress: 65,
    budget: 5000000,
    spent: 3250000,
    income: 4000000,
    stages: [
      { name: 'Фундамент', progress: 100, spent: 800000, materials: 500000, labor: 300000 },
      { name: 'Стены', progress: 80, spent: 1200000, materials: 700000, labor: 500000 },
      { name: 'Кровля', progress: 30, spent: 450000, materials: 300000, labor: 150000 },
    ]
  },
  {
    id: 2,
    name: 'Коттедж на Лесной',
    address: 'пос. Зеленый, уч. 12',
    progress: 45,
    budget: 3000000,
    spent: 1350000,
    income: 1800000,
    stages: [
      { name: 'Фундамент', progress: 100, spent: 400000, materials: 250000, labor: 150000 },
      { name: 'Стены', progress: 60, spent: 600000, materials: 350000, labor: 250000 },
      { name: 'Кровля', progress: 0, spent: 0, materials: 0, labor: 0 },
    ]
  },
];

const mockEmployees = [
  { id: 1, name: 'Иван Петров', role: 'Прораб', tasks: 3 },
  { id: 2, name: 'Сергей Иванов', role: 'Каменщик', tasks: 2 },
  { id: 3, name: 'Михаил Сидоров', role: 'Электрик', tasks: 4 },
];

const mockTasks = [
  { id: 1, title: 'Залить бетон', project: 'ЖК Новый Горизонт', assignee: 'Иван Петров', status: 'В работе' },
  { id: 2, title: 'Установить окна', project: 'Коттедж на Лесной', assignee: 'Сергей Иванов', status: 'Ожидает' },
  { id: 3, title: 'Провести проводку', project: 'ЖК Новый Горизонт', assignee: 'Михаил Сидоров', status: 'В работе' },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState(mockProjects);
  const [employees, setEmployees] = useState(mockEmployees);
  const [tasks, setTasks] = useState(mockTasks);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isStageDialogOpen, setIsStageDialogOpen] = useState(false);
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const { toast } = useToast();

  const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);
  const totalSpent = projects.reduce((acc, p) => acc + p.spent, 0);
  const totalIncome = projects.reduce((acc, p) => acc + p.income, 0);

  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProject = {
      id: projects.length + 1,
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      budget: Number(formData.get('budget')),
      progress: 0,
      spent: 0,
      income: 0,
      stages: []
    };
    setProjects([...projects, newProject]);
    setIsProjectDialogOpen(false);
    toast({ title: 'Объект добавлен', description: `${newProject.name} успешно создан` });
  };

  const handleAddStage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const projectId = Number(formData.get('projectId'));
    const newStage = {
      name: formData.get('stageName') as string,
      progress: 0,
      spent: 0,
      materials: 0,
      labor: 0
    };
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, stages: [...p.stages, newStage] } : p
    ));
    setIsStageDialogOpen(false);
    toast({ title: 'Этап добавлен', description: `Этап "${newStage.name}" создан` });
  };

  const handleAddEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEmployee = {
      id: employees.length + 1,
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      tasks: 0
    };
    setEmployees([...employees, newEmployee]);
    setIsEmployeeDialogOpen(false);
    toast({ title: 'Сотрудник добавлен', description: `${newEmployee.name} добавлен в команду` });
  };

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTask = {
      id: tasks.length + 1,
      title: formData.get('title') as string,
      project: formData.get('project') as string,
      assignee: formData.get('assignee') as string,
      status: 'Ожидает'
    };
    setTasks([...tasks, newTask]);
    setIsTaskDialogOpen(false);
    toast({ title: 'Задача создана', description: `"${newTask.title}" добавлена` });
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Общий бюджет</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{(totalBudget / 1000000).toFixed(1)} млн ₽</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Расходы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{(totalSpent / 1000000).toFixed(1)} млн ₽</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Доходы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{(totalIncome / 1000000).toFixed(1)} млн ₽</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Объекты</h2>
          <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Icon name="Plus" size={18} className="mr-2" />
                Новый объект
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Создать новый объект</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div>
                  <Label htmlFor="name">Название объекта</Label>
                  <Input id="name" name="name" placeholder="ЖК Солнечный" required />
                </div>
                <div>
                  <Label htmlFor="address">Адрес</Label>
                  <Input id="address" name="address" placeholder="ул. Мира, 10" required />
                </div>
                <div>
                  <Label htmlFor="budget">Бюджет (₽)</Label>
                  <Input id="budget" name="budget" type="number" placeholder="5000000" required />
                </div>
                <Button type="submit" className="w-full">Создать объект</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(project => (
            <Card 
              key={project.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedProject(project.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{project.name}</span>
                  <Badge variant="outline">{project.progress}%</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{project.address}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Прогресс</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Бюджет</p>
                    <p className="font-semibold">{(project.budget / 1000000).toFixed(1)}м</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Расходы</p>
                    <p className="font-semibold text-red-600">{(project.spent / 1000000).toFixed(1)}м</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Доходы</p>
                    <p className="font-semibold text-green-600">{(project.income / 1000000).toFixed(1)}м</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFinances = () => {
    const project = projects.find(p => p.id === selectedProject) || projects[0];
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Финансы</h2>
          <div className="flex gap-2">
            <select 
              className="border rounded-lg px-4 py-2"
              value={selectedProject || projects[0].id}
              onChange={(e) => setSelectedProject(Number(e.target.value))}
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <Dialog open={isStageDialogOpen} onOpenChange={setIsStageDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить этап
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить этап работ</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddStage} className="space-y-4">
                  <div>
                    <Label htmlFor="projectId">Объект</Label>
                    <select id="projectId" name="projectId" className="w-full border rounded-lg px-3 py-2" required>
                      {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="stageName">Название этапа</Label>
                    <Input id="stageName" name="stageName" placeholder="Фундамент" required />
                  </div>
                  <Button type="submit" className="w-full">Добавить этап</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Расходы по этапам</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.stages.map((stage, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{stage.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {(stage.spent / 1000).toFixed(0)} тыс ₽
                      </span>
                    </div>
                    <Progress value={stage.progress} className="h-2" />
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>Материалы: {(stage.materials / 1000).toFixed(0)} тыс</span>
                      <span>Работы: {(stage.labor / 1000).toFixed(0)} тыс</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Распределение затрат</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        Материалы
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {((project.stages.reduce((acc, s) => acc + s.materials, 0) / project.spent) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div 
                      style={{ width: `${(project.stages.reduce((acc, s) => acc + s.materials, 0) / project.spent) * 100}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    />
                  </div>
                </div>

                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-orange-600">
                        Работы
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-orange-600">
                        {((project.stages.reduce((acc, s) => acc + s.labor, 0) / project.spent) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-200">
                    <div 
                      style={{ width: `${(project.stages.reduce((acc, s) => acc + s.labor, 0) / project.spent) * 100}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Бюджет</span>
                    <span className="text-sm">{(project.budget / 1000000).toFixed(2)} млн ₽</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Потрачено</span>
                    <span className="text-sm text-red-600">{(project.spent / 1000000).toFixed(2)} млн ₽</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Получено</span>
                    <span className="text-sm text-green-600">{(project.income / 1000000).toFixed(2)} млн ₽</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold">
                    <span>Прибыль</span>
                    <span className={project.income - project.spent >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {((project.income - project.spent) / 1000000).toFixed(2)} млн ₽
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderEmployees = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Сотрудники</h2>
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
        {employees.map(employee => (
          <Card key={employee.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
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

  const renderTasks = () => (
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

  const renderProfile = () => (
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white border-r min-h-screen p-6 space-y-2">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary">СтройКонтроль</h1>
            <p className="text-xs text-muted-foreground">Управление объектами</p>
          </div>
          
          <Button 
            variant={activeSection === 'dashboard' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveSection('dashboard')}
          >
            <Icon name="LayoutDashboard" size={20} className="mr-3" />
            Дашборд
          </Button>
          
          <Button 
            variant={activeSection === 'finances' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveSection('finances')}
          >
            <Icon name="DollarSign" size={20} className="mr-3" />
            Финансы
          </Button>
          
          <Button 
            variant={activeSection === 'employees' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveSection('employees')}
          >
            <Icon name="Users" size={20} className="mr-3" />
            Сотрудники
          </Button>
          
          <Button 
            variant={activeSection === 'tasks' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveSection('tasks')}
          >
            <Icon name="CheckSquare" size={20} className="mr-3" />
            Задачи
          </Button>
          
          <Button 
            variant={activeSection === 'profile' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveSection('profile')}
          >
            <Icon name="User" size={20} className="mr-3" />
            Профиль
          </Button>
        </aside>

        <main className="flex-1 p-8">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'finances' && renderFinances()}
          {activeSection === 'employees' && renderEmployees()}
          {activeSection === 'tasks' && renderTasks()}
          {activeSection === 'profile' && renderProfile()}
        </main>
      </div>
    </div>
  );
};

export default Index;