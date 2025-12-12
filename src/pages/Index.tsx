import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/hooks/useAppState';
import { useAppHandlers } from '@/hooks/useAppHandlers';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppContent } from '@/components/layout/AppContent';
import Auth from './Auth';
import Onboarding from '@/components/Onboarding';

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { toast } = useToast();

  const state = useAppState();
  const handlers = useAppHandlers({
    projects: state.projects,
    setProjects: state.setProjects,
    employees: state.employees,
    setEmployees: state.setEmployees,
    tasks: state.tasks,
    setTasks: state.setTasks,
    companyExpenses: state.companyExpenses,
    setCompanyExpenses: state.setCompanyExpenses,
    expenseCategories: state.expenseCategories,
    setExpenseCategories: state.setExpenseCategories,
    viewingProject: state.viewingProject,
    selectedStage: state.selectedStage,
    viewingCategory: state.viewingCategory,
    setIsProjectDialogOpen: state.setIsProjectDialogOpen,
    setIsStageDialogOpen: state.setIsStageDialogOpen,
    setIsEmployeeDialogOpen: state.setIsEmployeeDialogOpen,
    setIsTaskDialogOpen: state.setIsTaskDialogOpen,
    setIsExpenseDialogOpen: state.setIsExpenseDialogOpen,
    setIsCommentDialogOpen: state.setIsCommentDialogOpen,
    setIsCompanyExpenseDialogOpen: state.setIsCompanyExpenseDialogOpen,
    setIsExpenseCategoryDialogOpen: state.setIsExpenseCategoryDialogOpen,
    setIsPaymentDialogOpen: state.setIsPaymentDialogOpen,
    setIsProjectExpenseDialogOpen: state.setIsProjectExpenseDialogOpen,
    setIsProjectIncomeDialogOpen: state.setIsProjectIncomeDialogOpen,
    selectedProjectForTransaction: state.selectedProjectForTransaction,
    setSelectedProjectForTransaction: state.setSelectedProjectForTransaction,
    filterProject: state.filterProject,
    filterDate: state.filterDate,
    filterMinAmount: state.filterMinAmount,
    filterMaxAmount: state.filterMaxAmount
  });

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

  const sectionProps = {
    projects: state.projects,
    employees: state.employees,
    tasks: state.tasks,
    companyExpenses: state.companyExpenses,
    expenseCategories: state.expenseCategories,
    totalBudget: state.totalBudget,
    totalSpent: state.totalSpent,
    totalIncome: state.totalIncome,
    filterProject: state.filterProject,
    filterDate: state.filterDate,
    filterMinAmount: state.filterMinAmount,
    filterMaxAmount: state.filterMaxAmount,
    isProjectDialogOpen: state.isProjectDialogOpen,
    isStageDialogOpen: state.isStageDialogOpen,
    isEmployeeDialogOpen: state.isEmployeeDialogOpen,
    isTaskDialogOpen: state.isTaskDialogOpen,
    isExpenseDialogOpen: state.isExpenseDialogOpen,
    isCommentDialogOpen: state.isCommentDialogOpen,
    isCompanyExpenseDialogOpen: state.isCompanyExpenseDialogOpen,
    isExpenseCategoryDialogOpen: state.isExpenseCategoryDialogOpen,
    isPaymentDialogOpen: state.isPaymentDialogOpen,
    isProjectExpenseDialogOpen: state.isProjectExpenseDialogOpen,
    isProjectIncomeDialogOpen: state.isProjectIncomeDialogOpen,
    selectedProjectForTransaction: state.selectedProjectForTransaction,
    selectedStage: state.selectedStage,
    viewingProject: state.viewingProject,
    selectedProject: state.selectedProject,
    viewingCategory: state.viewingCategory,
    showArchivedEmployees: state.showArchivedEmployees,
    setActiveSection: state.setActiveSection,
    setViewingProject: state.setViewingProject,
    setViewingCategory: state.setViewingCategory,
    setFilterProject: state.setFilterProject,
    setFilterDate: state.setFilterDate,
    setFilterMinAmount: state.setFilterMinAmount,
    setFilterMaxAmount: state.setFilterMaxAmount,
    setIsProjectDialogOpen: state.setIsProjectDialogOpen,
    setIsStageDialogOpen: state.setIsStageDialogOpen,
    setIsEmployeeDialogOpen: state.setIsEmployeeDialogOpen,
    setIsTaskDialogOpen: state.setIsTaskDialogOpen,
    setIsExpenseDialogOpen: state.setIsExpenseDialogOpen,
    setIsCommentDialogOpen: state.setIsCommentDialogOpen,
    setIsCompanyExpenseDialogOpen: state.setIsCompanyExpenseDialogOpen,
    setIsExpenseCategoryDialogOpen: state.setIsExpenseCategoryDialogOpen,
    setIsPaymentDialogOpen: state.setIsPaymentDialogOpen,
    setIsProjectExpenseDialogOpen: state.setIsProjectExpenseDialogOpen,
    setIsProjectIncomeDialogOpen: state.setIsProjectIncomeDialogOpen,
    setSelectedProjectForTransaction: state.setSelectedProjectForTransaction,
    setSelectedStage: state.setSelectedStage,
    setSelectedProject: state.setSelectedProject,
    setShowArchivedEmployees: state.setShowArchivedEmployees,
    handleAddProject: handlers.handleAddProject,
    handleAddStage: handlers.handleAddStage,
    handleAddEmployee: handlers.handleAddEmployee,
    handleAddTask: handlers.handleAddTask,
    handleAddExpense: handlers.handleAddExpense,
    handleAddComment: handlers.handleAddComment,
    handleAddCompanyExpense: handlers.handleAddCompanyExpense,
    handleAddExpenseCategory: handlers.handleAddExpenseCategory,
    handleAddPayment: handlers.handleAddPayment,
    handleAddProjectExpense: handlers.handleAddProjectExpense,
    handleAddProjectIncome: handlers.handleAddProjectIncome,
    handleArchiveProject: handlers.handleArchiveProject,
    handleUnarchiveProject: handlers.handleUnarchiveProject,
    handleArchiveEmployee: handlers.handleArchiveEmployee,
    handleUnarchiveEmployee: handlers.handleUnarchiveEmployee,
    getAllExpenses: handlers.getAllExpenses,
    getFilteredExpenses: handlers.getFilteredExpenses
  };

  return (
    <>
      {showOnboarding && <Onboarding userName={user.name} onComplete={handleOnboardingComplete} />}
      
      <div className="min-h-screen bg-gray-50">
        <AppHeader 
          user={user}
          activeSection={state.activeSection}
          setActiveSection={state.setActiveSection}
          handleLogout={handleLogout}
        />

        <AppContent 
          activeSection={state.activeSection}
          user={user}
          handleLogout={handleLogout}
          sectionProps={sectionProps}
        />
      </div>
    </>
  );
};

export default Index;