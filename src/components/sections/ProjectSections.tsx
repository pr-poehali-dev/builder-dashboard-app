import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface ProjectSectionsProps {
  projects: any[];
  totalBudget: number;
  totalSpent: number;
  totalIncome: number;
  filterProject: string;
  filterDate: string;
  filterMinAmount: string;
  filterMaxAmount: string;
  isProjectDialogOpen: boolean;
  isStageDialogOpen: boolean;
  isExpenseDialogOpen: boolean;
  isCommentDialogOpen: boolean;
  selectedStage: number | null;
  viewingProject: number | null;
  selectedProject: number | null;
  setActiveSection: (section: string) => void;
  setViewingProject: (id: number | null) => void;
  setFilterProject: (value: string) => void;
  setFilterDate: (value: string) => void;
  setFilterMinAmount: (value: string) => void;
  setFilterMaxAmount: (value: string) => void;
  setIsProjectDialogOpen: (open: boolean) => void;
  setIsStageDialogOpen: (open: boolean) => void;
  setIsExpenseDialogOpen: (open: boolean) => void;
  setIsCommentDialogOpen: (open: boolean) => void;
  setSelectedStage: (id: number | null) => void;
  setSelectedProject: (id: number | null) => void;
  handleAddProject: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAddStage: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAddExpense: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAddComment: (e: React.FormEvent<HTMLFormElement>) => void;
  handleArchiveProject: (id: number) => void;
  handleUnarchiveProject: (id: number) => void;
  getAllExpenses: () => any[];
  getFilteredExpenses: () => any[];
}

export const renderDashboard = (props: ProjectSectionsProps) => {
  const { projects, totalBudget, totalSpent, totalIncome, setActiveSection, setViewingProject, getAllExpenses } = props;
  const activeProjects = projects.filter(p => !p.archived && p.spent < p.budget);
  const recentExpenses = getAllExpenses().slice(0, 5);

  return (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Активные объекты</CardTitle>
          </CardHeader>
          <CardContent>
            {activeProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">Нет активных объектов</p>
            ) : (
              <div className="space-y-3">
                {activeProjects.map(project => (
                  <div 
                    key={project.id} 
                    className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                    onClick={() => {
                      setViewingProject(project.id);
                      setActiveSection('project-detail');
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{project.name}</h4>
                      <Badge variant="outline">
                        {((project.spent / project.budget) * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{project.address}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Потрачено:</span>
                      <span className="font-medium">{(project.spent / 1000000).toFixed(2)} млн ₽</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Последние расходы</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setActiveSection('expenses')}>
                Все расходы
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentExpenses.length === 0 ? (
              <p className="text-sm text-muted-foreground">Расходов пока нет</p>
            ) : (
              <div className="space-y-3">
                {recentExpenses.map(expense => (
                  <div key={expense.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{expense.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {expense.projectName} • {expense.stageName}
                        </p>
                      </div>
                      <span className="font-semibold">{expense.amount.toLocaleString()} ₽</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {expense.type === 'materials' ? 'Материалы' : 'Работы'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const renderProjects = (props: ProjectSectionsProps) => {
  const { projects, isProjectDialogOpen, setIsProjectDialogOpen, handleAddProject, setViewingProject, setActiveSection, handleArchiveProject, handleUnarchiveProject } = props;
  const [showArchived, setShowArchived] = useState(false);
  const displayedProjects = showArchived ? projects.filter(p => p.archived) : projects.filter(p => !p.archived);

  return (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">Объекты</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowArchived(!showArchived)}
        >
          <Icon name="Archive" size={16} className="mr-2" />
          {showArchived ? 'Активные' : 'Архив'}
        </Button>
      </div>
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
      {displayedProjects.map(project => (
        <Card 
          key={project.id} 
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => {
            setViewingProject(project.id);
            setActiveSection('project-detail');
          }}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle>{project.name}</CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Icon name="MapPin" size={14} />
                  {project.address}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  if (project.archived) {
                    handleUnarchiveProject(project.id);
                  } else {
                    handleArchiveProject(project.id);
                  }
                }}
              >
                <Icon name={project.archived ? "ArchiveRestore" : "Archive"} size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
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
  );
};

export const renderExpenses = (props: ProjectSectionsProps) => {
  const { projects, filterProject, filterDate, filterMinAmount, filterMaxAmount, setFilterProject, setFilterDate, setFilterMinAmount, setFilterMaxAmount, getFilteredExpenses } = props;
  const filteredExpenses = getFilteredExpenses();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Все расходы</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Фильтры</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="filterProject">Объект</Label>
              <select 
                id="filterProject" 
                className="w-full border rounded-lg px-3 py-2"
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
              >
                <option value="all">Все объекты</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="filterDate">Дата</Label>
              <Input 
                id="filterDate" 
                type="date" 
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="filterMin">Мин. сумма</Label>
              <Input 
                id="filterMin" 
                type="number" 
                placeholder="0"
                value={filterMinAmount}
                onChange={(e) => setFilterMinAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="filterMax">Макс. сумма</Label>
              <Input 
                id="filterMax" 
                type="number" 
                placeholder="1000000"
                value={filterMaxAmount}
                onChange={(e) => setFilterMaxAmount(e.target.value)}
              />
            </div>
          </div>
          {(filterProject !== 'all' || filterDate || filterMinAmount || filterMaxAmount) && (
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => {
                setFilterProject('all');
                setFilterDate('');
                setFilterMinAmount('');
                setFilterMaxAmount('');
              }}
            >
              <Icon name="X" size={16} className="mr-2" />
              Сбросить фильтры
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          {filteredExpenses.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Расходов не найдено</p>
          ) : (
            <div className="space-y-3">
              {filteredExpenses.map(expense => (
                <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">{expense.description}</h4>
                      <Badge variant="secondary">
                        {expense.type === 'materials' ? 'Материалы' : 'Работы'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {expense.projectName} • {expense.stageName} • {expense.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold">{expense.amount.toLocaleString()} ₽</span>
                    {expense.receipt && (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => window.open(expense.receipt!, '_blank')}
                      >
                        <Icon name="Receipt" size={18} />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export const renderFinances = (props: ProjectSectionsProps) => {
  const { projects, selectedProject, setSelectedProject, isStageDialogOpen, setIsStageDialogOpen, handleAddStage } = props;
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
                  <div className="flex gap-4 text-xs text-muted-foreground mt-2">
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

export const renderProjectDetail = (props: ProjectSectionsProps) => {
  const { projects, viewingProject, isCommentDialogOpen, setIsCommentDialogOpen, isExpenseDialogOpen, setIsExpenseDialogOpen, setActiveSection, handleAddComment, handleAddExpense, setSelectedStage } = props;
  const project = projects.find(p => p.id === viewingProject);
  if (!project) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setActiveSection('dashboard')}>
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <Icon name="MapPin" size={14} />
            {project.address}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Бюджет</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(project.budget / 1000000).toFixed(2)} млн ₽</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Расходы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{(project.spent / 1000000).toFixed(2)} млн ₽</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Доходы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{(project.income / 1000000).toFixed(2)} млн ₽</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Комментарии</CardTitle>
            <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить комментарий</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddComment} className="space-y-4">
                  <div>
                    <Label htmlFor="comment">Комментарий</Label>
                    <Textarea id="comment" name="comment" placeholder="Введите комментарий..." rows={4} required />
                  </div>
                  <Button type="submit" className="w-full">Добавить комментарий</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {project.comments.length === 0 ? (
            <p className="text-sm text-muted-foreground">Комментариев пока нет</p>
          ) : (
            <div className="space-y-4">
              {project.comments.map(comment => (
                <div key={comment.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-bold mb-4">Этапы работ</h3>
        <div className="space-y-4">
          {project.stages.map(stage => (
            <Card key={stage.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{stage.name}</span>
                  <Badge variant="outline">{(stage.spent / 1000).toFixed(0)} тыс ₽</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Материалы</p>
                    <p className="font-semibold">{(stage.materials / 1000).toFixed(0)} тыс ₽</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Работы</p>
                    <p className="font-semibold">{(stage.labor / 1000).toFixed(0)} тыс ₽</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Расходы</h4>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedStage(stage.id);
                        setIsExpenseDialogOpen(true);
                      }}
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить
                    </Button>
                  </div>
                  {stage.expenses.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Расходов пока нет</p>
                  ) : (
                    <div className="space-y-2">
                      {stage.expenses.map(expense => (
                        <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{expense.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {expense.type === 'materials' ? 'Материалы' : 'Работы'}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">{expense.amount.toLocaleString()} ₽</span>
                            {expense.receipt && (
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => window.open(expense.receipt!, '_blank')}
                              >
                                <Icon name="Receipt" size={16} />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить расход</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddExpense} className="space-y-4">
            <div>
              <Label htmlFor="description">Описание</Label>
              <Input id="description" name="description" placeholder="Цемент М500" required />
            </div>
            <div>
              <Label htmlFor="amount">Сумма (₽)</Label>
              <Input id="amount" name="amount" type="number" placeholder="50000" required />
            </div>
            <div>
              <Label htmlFor="type">Тип расхода</Label>
              <select id="type" name="type" className="w-full border rounded-lg px-3 py-2" required>
                <option value="materials">Материалы</option>
                <option value="labor">Работы</option>
              </select>
            </div>
            <div>
              <Label htmlFor="receipt">Фото чека (опционально)</Label>
              <Input id="receipt" name="receipt" type="file" accept="image/*" />
            </div>
            <Button type="submit" className="w-full">Добавить расход</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
