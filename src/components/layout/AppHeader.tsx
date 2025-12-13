import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface AppHeaderProps {
  user: any;
  activeSection: string;
  setActiveSection: (section: string) => void;
  handleLogout: () => void;
}

export const AppHeader = ({ user, activeSection, setActiveSection, handleLogout }: AppHeaderProps) => {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">ПростоСтройка</h1>
            <p className="text-xs text-muted-foreground">{user.company}</p>
          </div>
          
          <nav className="flex gap-1 items-center flex-wrap">
            <Button 
              variant={activeSection === 'dashboard' ? 'default' : 'ghost'} 
              onClick={() => setActiveSection('dashboard')}
              className="max-md:flex-row-reverse"
            >
              <Icon name="LayoutDashboard" size={18} className="md:mr-2" />
              <span className="max-md:hidden">Дашборд</span>
            </Button>
            
            <Button 
              variant={activeSection === 'projects' ? 'default' : 'ghost'} 
              onClick={() => setActiveSection('projects')}
              className="max-md:flex-row-reverse"
            >
              <Icon name="Building2" size={18} className="md:mr-2" />
              <span className="max-md:hidden">Объекты</span>
            </Button>
            
            {user.accountType === 'business' && (
              <>
                <Button 
                  variant={activeSection === 'finances' ? 'default' : 'ghost'} 
                  onClick={() => setActiveSection('finances')}
                  className="max-md:flex-row-reverse"
                >
                  <Icon name="DollarSign" size={18} className="md:mr-2" />
                  <span className="max-md:hidden">Финансы</span>
                </Button>
                <Button 
                  variant={activeSection === 'commercial' ? 'default' : 'ghost'} 
                  onClick={() => setActiveSection('commercial')}
                  className="max-md:flex-row-reverse"
                >
                  <Icon name="FileText" size={18} className="md:mr-2" />
                  <span className="max-md:hidden">КП</span>
                </Button>
              </>
            )}
            
            <Button 
              variant={activeSection === 'employees' ? 'default' : 'ghost'} 
              onClick={() => setActiveSection('employees')}
              className="max-md:flex-row-reverse"
            >
              <Icon name="Users" size={18} className="md:mr-2" />
              <span className="max-md:hidden">Сотрудники</span>
            </Button>
            
            <Button 
              variant={activeSection === 'tasks' ? 'default' : 'ghost'} 
              onClick={() => setActiveSection('tasks')}
              className="max-md:flex-row-reverse"
            >
              <Icon name="CheckSquare" size={18} className="md:mr-2" />
              <span className="max-md:hidden">Задачи</span>
            </Button>
            
            <Button 
              variant={activeSection === 'profile' ? 'default' : 'ghost'} 
              onClick={() => setActiveSection('profile')}
              className="max-md:flex-row-reverse"
            >
              <Icon name="User" size={18} className="md:mr-2" />
              <span className="max-md:hidden">Профиль</span>
            </Button>
            
            {user.accountType === 'business' && (
              <Button 
                variant={activeSection === 'subscription' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('subscription')}
                className="max-md:flex-row-reverse"
              >
                <Icon name="CreditCard" size={18} className="md:mr-2" />
                <span className="max-md:hidden">Подписка</span>
              </Button>
            )}
            
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
  );
};