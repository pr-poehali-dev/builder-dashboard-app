import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProjectsListProps {
  projects: any[];
  isProjectDialogOpen: boolean;
  setIsProjectDialogOpen: (open: boolean) => void;
  handleAddProject: (e: React.FormEvent<HTMLFormElement>) => void;
  setViewingProject: (id: number | null) => void;
  setActiveSection: (section: string) => void;
  handleArchiveProject: (id: number) => void;
  handleUnarchiveProject: (id: number) => void;
}

export const ProjectsList = (props: ProjectsListProps) => {
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
