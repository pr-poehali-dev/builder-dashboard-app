import { renderDashboard, renderProjects, renderExpenses, renderFinances, renderProjectDetail } from '@/components/sections/ProjectSections';
import { renderEmployees, renderTasks, renderProfile } from '@/components/sections/TeamSections';
import { Subscription } from '@/components/sections/Subscription';
import { CommercialOffers } from '@/components/sections/CommercialOffers';

interface AppContentProps {
  activeSection: string;
  user: any;
  handleLogout: () => void;
  onUpdateUser: (userData: any) => void;
  sectionProps: any;
}

export const AppContent = ({ activeSection, user, handleLogout, onUpdateUser, sectionProps }: AppContentProps) => {
  return (
    <main className="container mx-auto px-6 py-8">
      {activeSection === 'project-detail' && renderProjectDetail(sectionProps)}
      {activeSection === 'dashboard' && renderDashboard(sectionProps)}
      {activeSection === 'projects' && renderProjects(sectionProps)}
      {activeSection === 'expenses' && renderExpenses(sectionProps)}
      {activeSection === 'finances' && renderFinances(sectionProps)}
      {activeSection === 'employees' && renderEmployees(sectionProps)}
      {activeSection === 'tasks' && renderTasks(sectionProps)}
      {activeSection === 'profile' && renderProfile(user, handleLogout, onUpdateUser)}
      {activeSection === 'subscription' && <Subscription user={user} onUpdateUser={onUpdateUser} />}
      {activeSection === 'commercial' && <CommercialOffers user={user} />}
    </main>
  );
};