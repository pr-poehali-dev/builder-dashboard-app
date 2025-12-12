import { renderDashboard, renderProjects, renderExpenses, renderFinances, renderProjectDetail } from '@/components/sections/ProjectSections';
import { renderEmployees, renderTasks, renderProfile } from '@/components/sections/TeamSections';

interface AppContentProps {
  activeSection: string;
  user: any;
  handleLogout: () => void;
  sectionProps: any;
}

export const AppContent = ({ activeSection, user, handleLogout, sectionProps }: AppContentProps) => {
  return (
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
  );
};
