import { Dashboard } from './projects/Dashboard';
import { ProjectsList } from './projects/ProjectsList';
import { ExpensesView } from './projects/ExpensesView';
import { FinancesView } from './projects/FinancesView';
import { ProjectDetail } from './projects/ProjectDetail';

interface ProjectSectionsProps {
  projects: any[];
  companyExpenses: any[];
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
  isCompanyExpenseDialogOpen: boolean;
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
  setIsCompanyExpenseDialogOpen: (open: boolean) => void;
  setSelectedStage: (id: number | null) => void;
  setSelectedProject: (id: number | null) => void;
  handleAddProject: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAddStage: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAddExpense: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAddComment: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAddCompanyExpense: (e: React.FormEvent<HTMLFormElement>) => void;
  handleArchiveProject: (id: number) => void;
  handleUnarchiveProject: (id: number) => void;
  getAllExpenses: () => any[];
  getFilteredExpenses: () => any[];
}

export const renderDashboard = (props: ProjectSectionsProps) => {
  return <Dashboard 
    projects={props.projects}
    totalBudget={props.totalBudget}
    totalSpent={props.totalSpent}
    totalIncome={props.totalIncome}
    setActiveSection={props.setActiveSection}
    setViewingProject={props.setViewingProject}
    getAllExpenses={props.getAllExpenses}
  />;
};

export const renderProjects = (props: ProjectSectionsProps) => {
  return <ProjectsList 
    projects={props.projects}
    isProjectDialogOpen={props.isProjectDialogOpen}
    setIsProjectDialogOpen={props.setIsProjectDialogOpen}
    handleAddProject={props.handleAddProject}
    setViewingProject={props.setViewingProject}
    setActiveSection={props.setActiveSection}
    handleArchiveProject={props.handleArchiveProject}
    handleUnarchiveProject={props.handleUnarchiveProject}
  />;
};

export const renderExpenses = (props: ProjectSectionsProps) => {
  return <ExpensesView 
    projects={props.projects}
    filterProject={props.filterProject}
    filterDate={props.filterDate}
    filterMinAmount={props.filterMinAmount}
    filterMaxAmount={props.filterMaxAmount}
    setFilterProject={props.setFilterProject}
    setFilterDate={props.setFilterDate}
    setFilterMinAmount={props.setFilterMinAmount}
    setFilterMaxAmount={props.setFilterMaxAmount}
    getFilteredExpenses={props.getFilteredExpenses}
  />;
};

export const renderFinances = (props: ProjectSectionsProps) => {
  return <FinancesView 
    projects={props.projects}
    companyExpenses={props.companyExpenses}
    selectedProject={props.selectedProject}
    setSelectedProject={props.setSelectedProject}
    isStageDialogOpen={props.isStageDialogOpen}
    setIsStageDialogOpen={props.setIsStageDialogOpen}
    isCompanyExpenseDialogOpen={props.isCompanyExpenseDialogOpen}
    setIsCompanyExpenseDialogOpen={props.setIsCompanyExpenseDialogOpen}
    handleAddStage={props.handleAddStage}
    handleAddCompanyExpense={props.handleAddCompanyExpense}
  />;
};

export const renderProjectDetail = (props: ProjectSectionsProps) => {
  return <ProjectDetail 
    projects={props.projects}
    viewingProject={props.viewingProject}
    isCommentDialogOpen={props.isCommentDialogOpen}
    setIsCommentDialogOpen={props.setIsCommentDialogOpen}
    isExpenseDialogOpen={props.isExpenseDialogOpen}
    setIsExpenseDialogOpen={props.setIsExpenseDialogOpen}
    setActiveSection={props.setActiveSection}
    handleAddComment={props.handleAddComment}
    handleAddExpense={props.handleAddExpense}
    setSelectedStage={props.setSelectedStage}
  />;
};