import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ExpenseCategoryDetail } from './ExpenseCategoryDetail';

interface FinancesViewProps {
  projects: any[];
  companyExpenses: any[];
  expenseCategories: any[];
  selectedProject: number | null;
  viewingCategory: number | null;
  setSelectedProject: (id: number | null) => void;
  setViewingCategory: (id: number | null) => void;
  isStageDialogOpen: boolean;
  setIsStageDialogOpen: (open: boolean) => void;
  isCompanyExpenseDialogOpen: boolean;
  setIsCompanyExpenseDialogOpen: (open: boolean) => void;
  isExpenseCategoryDialogOpen: boolean;
  setIsExpenseCategoryDialogOpen: (open: boolean) => void;
  isPaymentDialogOpen: boolean;
  setIsPaymentDialogOpen: (open: boolean) => void;
  handleAddStage: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAddCompanyExpense: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAddExpenseCategory: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAddPayment: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FinancesView = (props: FinancesViewProps) => {
  const { projects, companyExpenses, expenseCategories, selectedProject, viewingCategory, setSelectedProject, setViewingCategory, isStageDialogOpen, setIsStageDialogOpen, isCompanyExpenseDialogOpen, setIsCompanyExpenseDialogOpen, isExpenseCategoryDialogOpen, setIsExpenseCategoryDialogOpen, isPaymentDialogOpen, setIsPaymentDialogOpen, handleAddStage, handleAddCompanyExpense, handleAddExpenseCategory, handleAddPayment } = props;
  const activeProjects = projects.filter(p => !p.archived);
  const project = activeProjects.find(p => p.id === selectedProject) || activeProjects[0];
  
  const viewingCategoryData = expenseCategories.find(c => c.id === viewingCategory);
  
  if (viewingCategoryData) {
    return (
      <ExpenseCategoryDetail 
        category={viewingCategoryData}
        isPaymentDialogOpen={isPaymentDialogOpen}
        setIsPaymentDialogOpen={setIsPaymentDialogOpen}
        handleAddPayment={handleAddPayment}
        onBack={() => setViewingCategory(null)}
      />
    );
  }
  
  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      rent: 'Аренда',
      salary: 'Зарплата',
      fuel: 'Топливо',
      taxes: 'Налоги',
      other: 'Прочее'
    };
    return categories[category] || category;
  };
  
  const totalCompanyExpenses = companyExpenses.reduce((acc, e) => acc + e.amount, 0);
  const totalCategoriesExpenses = expenseCategories.reduce((acc, cat) => 
    acc + cat.payments.reduce((sum: number, p: any) => sum + p.amount, 0), 0
  );
  
  if (!project) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Финансы</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground py-8">
              Нет активных объектов. Создайте объект, чтобы начать работу с финансами.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Финансы</h2>
        <div className="flex gap-2">
          <select 
            className="border rounded-lg px-4 py-2"
            value={selectedProject || project.id}
            onChange={(e) => setSelectedProject(Number(e.target.value))}
          >
            {activeProjects.map(p => (
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
                    {activeProjects.map(p => (
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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Расходы компании</CardTitle>
            <Dialog open={isCompanyExpenseDialogOpen} onOpenChange={setIsCompanyExpenseDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить расход
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить расход компании</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddCompanyExpense} className="space-y-4">
                  <div>
                    <Label htmlFor="companyExpenseDesc">Описание</Label>
                    <Input id="companyExpenseDesc" name="description" placeholder="Аренда офиса" required />
                  </div>
                  <div>
                    <Label htmlFor="companyExpenseAmount">Сумма (₽)</Label>
                    <Input id="companyExpenseAmount" name="amount" type="number" placeholder="50000" required />
                  </div>
                  <div>
                    <Label htmlFor="companyExpenseCategory">Категория</Label>
                    <select id="companyExpenseCategory" name="category" className="w-full border rounded-lg px-3 py-2" required>
                      <option value="rent">Аренда</option>
                      <option value="salary">Зарплата</option>
                      <option value="fuel">Топливо</option>
                      <option value="taxes">Налоги</option>
                      <option value="other">Прочее</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="companyExpenseDate">Дата</Label>
                    <Input id="companyExpenseDate" name="date" type="date" required />
                  </div>
                  <div>
                    <Label htmlFor="companyExpenseReceipt">Чек (опционально)</Label>
                    <Input id="companyExpenseReceipt" name="receipt" type="file" accept="image/*,.pdf" />
                  </div>
                  <Button type="submit" className="w-full">Добавить расход</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {companyExpenses.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Расходов компании пока нет</p>
            ) : (
              companyExpenses.slice(0, 5).map(expense => (
                <div key={expense.id} className="flex justify-between items-start p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{expense.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {getCategoryName(expense.category)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{expense.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">{expense.amount.toLocaleString()} ₽</span>
                    {expense.receipt && (
                      <div className="mt-1">
                        <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          {companyExpenses.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Всего расходов:</span>
                <span className="text-lg font-bold">{totalCompanyExpenses.toLocaleString()} ₽</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Статьи расходов</CardTitle>
            <Dialog open={isExpenseCategoryDialogOpen} onOpenChange={setIsExpenseCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать статью
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Создать статью расходов</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddExpenseCategory} className="space-y-4">
                  <div>
                    <Label htmlFor="categoryName">Название</Label>
                    <Input id="categoryName" name="name" placeholder="Аренда офиса" required />
                  </div>
                  <div>
                    <Label htmlFor="categoryType">Тип</Label>
                    <select id="categoryType" name="type" className="w-full border rounded-lg px-3 py-2" required>
                      <option value="recurring">Постоянный расход</option>
                      <option value="one-time">Разовые платежи</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="categoryAmount">Плановая сумма (₽, опционально)</Label>
                    <Input id="categoryAmount" name="amount" type="number" placeholder="50000" />
                    <p className="text-xs text-muted-foreground mt-1">Для постоянных расходов - ежемесячная сумма</p>
                  </div>
                  <div>
                    <Label htmlFor="categoryDescription">Описание</Label>
                    <Textarea id="categoryDescription" name="description" placeholder="Ежемесячная аренда офиса по адресу..." rows={3} />
                  </div>
                  <Button type="submit" className="w-full">Создать статью</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="font-semibold">Всего расходов по статьям:</span>
              <span className="text-lg font-bold text-red-600">{totalCategoriesExpenses.toLocaleString()} ₽</span>
            </div>
            
            {expenseCategories.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Статей расходов пока нет</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expenseCategories.map(category => {
                  const categoryTotal = category.payments.reduce((acc: number, p: any) => acc + p.amount, 0);
                  return (
                    <Card 
                      key={category.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setViewingCategory(category.id)}
                    >
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{category.name}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                            </div>
                            <Badge variant={category.type === 'recurring' ? 'default' : 'secondary'}>
                              {category.type === 'recurring' ? 'Постоянный' : 'Разовый'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t">
                            <div>
                              <p className="text-xs text-muted-foreground">Оплачено</p>
                              <p className="text-lg font-bold text-red-600">{categoryTotal.toLocaleString()} ₽</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Платежей</p>
                              <p className="text-lg font-bold">{category.payments.length}</p>
                            </div>
                          </div>
                          {category.amount > 0 && (
                            <div className="text-xs text-muted-foreground">
                              План: {category.amount.toLocaleString()} ₽
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Разовые расходы</CardTitle>
            <Dialog open={isCompanyExpenseDialogOpen} onOpenChange={setIsCompanyExpenseDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить расход
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить расход компании</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddCompanyExpense} className="space-y-4">
                  <div>
                    <Label htmlFor="companyDescription">Описание</Label>
                    <Input id="companyDescription" name="description" placeholder="Аренда офиса" required />
                  </div>
                  <div>
                    <Label htmlFor="companyAmount">Сумма (₽)</Label>
                    <Input id="companyAmount" name="amount" type="number" placeholder="50000" required />
                  </div>
                  <div>
                    <Label htmlFor="companyCategory">Категория</Label>
                    <select id="companyCategory" name="category" className="w-full border rounded-lg px-3 py-2" required>
                      <option value="rent">Аренда</option>
                      <option value="salary">Зарплата</option>
                      <option value="fuel">Топливо</option>
                      <option value="taxes">Налоги</option>
                      <option value="other">Прочее</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="companyDate">Дата</Label>
                    <Input id="companyDate" name="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="companyReceipt">Фото чека (опционально)</Label>
                    <Input id="companyReceipt" name="receipt" type="file" accept="image/*" />
                  </div>
                  <Button type="submit" className="w-full">Добавить расход</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="font-semibold">Всего расходов компании:</span>
              <span className="text-lg font-bold text-red-600">{totalCompanyExpenses.toLocaleString()} ₽</span>
            </div>
            
            {companyExpenses.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Расходов компании пока нет</p>
            ) : (
              <div className="space-y-2">
                {companyExpenses.map(expense => (
                  <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium">{expense.description}</h4>
                        <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                          {getCategoryName(expense.category)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{expense.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-red-600">{expense.amount.toLocaleString()} ₽</span>
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
    </div>
  );
};