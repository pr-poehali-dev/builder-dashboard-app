import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { mockProjects, mockEmployees, mockTasks, mockCompanyExpenses, mockExpenseCategories } from '@/data/mockData';
import { renderDashboard, renderProjects, renderExpenses, renderFinances, renderProjectDetail } from '@/components/sections/ProjectSections';
import { renderEmployees, renderTasks, renderProfile } from '@/components/sections/TeamSections';
import Auth from './Auth';
import Onboarding from '@/components/Onboarding';

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [viewingProject, setViewingProject] = useState<number | null>(null);
  const [projects, setProjects] = useState(mockProjects);
  const [employees, setEmployees] = useState(mockEmployees);
  const [tasks, setTasks] = useState(mockTasks);
  const [companyExpenses, setCompanyExpenses] = useState(mockCompanyExpenses);
  const [expenseCategories, setExpenseCategories] = useState(mockExpenseCategories);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isStageDialogOpen, setIsStageDialogOpen] = useState(false);
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [isCompanyExpenseDialogOpen, setIsCompanyExpenseDialogOpen] = useState(false);
  const [isExpenseCategoryDialogOpen, setIsExpenseCategoryDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [viewingCategory, setViewingCategory] = useState<number | null>(null);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [filterProject, setFilterProject] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterMinAmount, setFilterMinAmount] = useState<string>('');
  const [filterMaxAmount, setFilterMaxAmount] = useState<string>('');
  const [showArchivedEmployees, setShowArchivedEmployees] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      if (userData.firstLogin) {
        setShowOnboarding(true);
      }
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    if (userData.firstLogin) {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    if (user.firstLogin) {
      const updatedUser = { ...user, firstLogin: false };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      localStorage.setItem('user_' + user.phone, JSON.stringify(updatedUser));
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast({ title: 'Выход выполнен', description: 'До скорой встречи!' });
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const totalBudget = projects.filter(p => !p.archived).reduce((acc, p) => acc + p.budget, 0);
  const totalSpent = projects.filter(p => !p.archived).reduce((acc, p) => acc + p.spent, 0);
  const totalIncome = projects.filter(p => !p.archived).reduce((acc, p) => acc + p.income, 0);

  const handleArchiveProject = (projectId: number) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, archived: true } : p
    ));
    toast({ title: 'Объект архивирован', description: 'Объект перемещён в архив' });
  };

  const handleUnarchiveProject = (projectId: number) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, archived: false } : p
    ));
    toast({ title: 'Объект восстановлен', description: 'Объект возвращён из архива' });
  };

  const handleArchiveEmployee = (employeeId: number) => {
    setEmployees(employees.map(e => 
      e.id === employeeId ? { ...e, archived: true } : e
    ));
    toast({ title: 'Сотрудник архивирован', description: 'Сотрудник перемещён в архив' });
  };

  const handleUnarchiveEmployee = (employeeId: number) => {
    setEmployees(employees.map(e => 
      e.id === employeeId ? { ...e, archived: false } : e
    ));
    toast({ title: 'Сотрудник восстановлен', description: 'Сотрудник возвращён из архива' });
  };

  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProject = {
      id: projects.length + 1,
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      budget: Number(formData.get('budget')),
      spent: 0,
      income: 0,
      archived: false,
      comments: [],
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
      id: Date.now(),
      name: formData.get('stageName') as string,
      spent: 0,
      materials: 0,
      labor: 0,
      expenses: []
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
      phone: formData.get('phone') as string || '',
      telegram: formData.get('telegram') as string || '',
      whatsapp: formData.get('whatsapp') as string || '',
      max: formData.get('max') as string || '',
      tasks: 0,
      archived: false
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

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const projectId = viewingProject;
    const stageId = selectedStage;
    const files = (e.currentTarget.elements.namedItem('receipt') as HTMLInputElement).files;
    const receiptUrl = files && files.length > 0 ? URL.createObjectURL(files[0]) : null;
    
    const newExpense = {
      id: Date.now(),
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
      type: formData.get('type') as string,
      receipt: receiptUrl
    };

    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          stages: p.stages.map(s => {
            if (s.id === stageId) {
              const updatedExpenses = [...s.expenses, newExpense];
              const materials = updatedExpenses.filter(e => e.type === 'materials').reduce((sum, e) => sum + e.amount, 0);
              const labor = updatedExpenses.filter(e => e.type === 'labor').reduce((sum, e) => sum + e.amount, 0);
              return { ...s, expenses: updatedExpenses, materials, labor, spent: materials + labor };
            }
            return s;
          })
        };
      }
      return p;
    }));

    setIsExpenseDialogOpen(false);
    toast({ title: 'Расход добавлен', description: `Расход на ${newExpense.amount} ₽ добавлен` });
  };

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const projectId = viewingProject;
    
    const newComment = {
      id: Date.now(),
      text: formData.get('comment') as string,
      date: new Date().toISOString().split('T')[0],
      author: 'Алексей Петров'
    };

    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, comments: [...p.comments, newComment] } : p
    ));

    setIsCommentDialogOpen(false);
    toast({ title: 'Комментарий добавлен', description: 'Комментарий успешно создан' });
  };

  const handleAddCompanyExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const files = (e.currentTarget.elements.namedItem('receipt') as HTMLInputElement).files;
    const receiptUrl = files && files.length > 0 ? URL.createObjectURL(files[0]) : null;
    
    const newExpense = {
      id: Date.now(),
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
      category: formData.get('category') as string,
      date: formData.get('date') as string || new Date().toISOString().split('T')[0],
      receipt: receiptUrl
    };

    setCompanyExpenses([...companyExpenses, newExpense]);
    setIsCompanyExpenseDialogOpen(false);
    toast({ title: 'Расход компании добавлен', description: `Расход на ${newExpense.amount.toLocaleString()} ₽ добавлен` });
  };

  const handleAddExpenseCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newCategory = {
      id: Date.now(),
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      amount: Number(formData.get('amount')) || 0,
      description: formData.get('description') as string,
      payments: []
    };

    setExpenseCategories([...expenseCategories, newCategory]);
    setIsExpenseCategoryDialogOpen(false);
    toast({ title: 'Статья расходов создана', description: `"${newCategory.name}" успешно добавлена` });
  };

  const handleAddPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const files = (e.currentTarget.elements.namedItem('receipt') as HTMLInputElement).files;
    const receiptUrl = files && files.length > 0 ? URL.createObjectURL(files[0]) : null;
    const categoryId = viewingCategory;
    
    const newPayment = {
      id: Date.now(),
      amount: Number(formData.get('amount')),
      date: formData.get('date') as string || new Date().toISOString().split('T')[0],
      receipt: receiptUrl
    };

    setExpenseCategories(expenseCategories.map(cat => 
      cat.id === categoryId ? { ...cat, payments: [...cat.payments, newPayment] } : cat
    ));

    setIsPaymentDialogOpen(false);
    toast({ title: 'Платёж добавлен', description: `Платёж на ${newPayment.amount.toLocaleString()} ₽ добавлен` });
  };

  const getAllExpenses = () => {
    const allExpenses: Array<{
      id: number;
      description: string;
      amount: number;
      type: string;
      receipt: string | null;
      projectName: string;
      projectId: number;
      stageName: string;
      date: string;
    }> = [];

    projects.forEach(project => {
      project.stages.forEach(stage => {
        stage.expenses.forEach(expense => {
          allExpenses.push({
            ...expense,
            projectName: project.name,
            projectId: project.id,
            stageName: stage.name,
            date: new Date().toISOString().split('T')[0]
          });
        });
      });
    });

    return allExpenses.sort((a, b) => b.id - a.id);
  };

  const getFilteredExpenses = () => {
    let expenses = getAllExpenses();

    if (filterProject !== 'all') {
      expenses = expenses.filter(e => e.projectId === Number(filterProject));
    }

    if (filterDate) {
      expenses = expenses.filter(e => e.date === filterDate);
    }

    if (filterMinAmount) {
      expenses = expenses.filter(e => e.amount >= Number(filterMinAmount));
    }

    if (filterMaxAmount) {
      expenses = expenses.filter(e => e.amount <= Number(filterMaxAmount));
    }

    return expenses;
  };

  const sectionProps = {
    projects,
    employees,
    tasks,
    companyExpenses,
    expenseCategories,
    totalBudget,
    totalSpent,
    totalIncome,
    filterProject,
    filterDate,
    filterMinAmount,
    filterMaxAmount,
    isProjectDialogOpen,
    isStageDialogOpen,
    isEmployeeDialogOpen,
    isTaskDialogOpen,
    isExpenseDialogOpen,
    isCommentDialogOpen,
    isCompanyExpenseDialogOpen,
    isExpenseCategoryDialogOpen,
    isPaymentDialogOpen,
    selectedStage,
    viewingProject,
    selectedProject,
    viewingCategory,
    showArchivedEmployees,
    setActiveSection,
    setViewingProject,
    setViewingCategory,
    setFilterProject,
    setFilterDate,
    setFilterMinAmount,
    setFilterMaxAmount,
    setIsProjectDialogOpen,
    setIsStageDialogOpen,
    setIsEmployeeDialogOpen,
    setIsTaskDialogOpen,
    setIsExpenseDialogOpen,
    setIsCommentDialogOpen,
    setIsCompanyExpenseDialogOpen,
    setIsExpenseCategoryDialogOpen,
    setIsPaymentDialogOpen,
    setSelectedStage,
    setSelectedProject,
    setShowArchivedEmployees,
    handleAddProject,
    handleAddStage,
    handleAddEmployee,
    handleAddTask,
    handleAddExpense,
    handleAddComment,
    handleAddCompanyExpense,
    handleAddExpenseCategory,
    handleAddPayment,
    handleArchiveProject,
    handleUnarchiveProject,
    handleArchiveEmployee,
    handleUnarchiveEmployee,
    getAllExpenses,
    getFilteredExpenses
  };

  return (
    <>
      {showOnboarding && <Onboarding userName={user.name} onComplete={handleOnboardingComplete} />}
      
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-primary">СтройКонтроль</h1>
                <p className="text-xs text-muted-foreground">{user.company}</p>
              </div>
              
              <nav className="flex gap-1 items-center">
              <Button 
                variant={activeSection === 'dashboard' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('dashboard')}
              >
                <Icon name="LayoutDashboard" size={18} className="mr-2" />
                Дашборд
              </Button>
              
              <Button 
                variant={activeSection === 'projects' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('projects')}
              >
                <Icon name="Building2" size={18} className="mr-2" />
                Объекты
              </Button>
              
              <Button 
                variant={activeSection === 'finances' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('finances')}
              >
                <Icon name="DollarSign" size={18} className="mr-2" />
                Финансы
              </Button>
              
              <Button 
                variant={activeSection === 'employees' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('employees')}
              >
                <Icon name="Users" size={18} className="mr-2" />
                Сотрудники
              </Button>
              
              <Button 
                variant={activeSection === 'tasks' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('tasks')}
              >
                <Icon name="CheckSquare" size={18} className="mr-2" />
                Задачи
              </Button>
              
              <Button 
                variant={activeSection === 'profile' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('profile')}
              >
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="ml-2"
              >
                <Icon name="LogOut" size={18} />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {activeSection === 'project-detail' && renderProjectDetail(sectionProps)}
        {activeSection === 'dashboard' && renderDashboard(sectionProps)}
        {activeSection === 'projects' && renderProjects(sectionProps)}
        {activeSection === 'expenses' && renderExpenses(sectionProps)}
        {activeSection === 'finances' && renderFinances(sectionProps)}
        {activeSection === 'employees' && renderEmployees(sectionProps)}
        {activeSection === 'tasks' && renderTasks(sectionProps)}
        {activeSection === 'profile' && renderProfile(user, handleLogout)}
      </main>
    </div>
    </>
  );
};

export default Index;