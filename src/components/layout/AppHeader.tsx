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
  );
};
