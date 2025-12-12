import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FinancesViewProps {
  projects: any[];
  selectedProject: number | null;
  setSelectedProject: (id: number | null) => void;
  isStageDialogOpen: boolean;
  setIsStageDialogOpen: (open: boolean) => void;
  handleAddStage: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FinancesView = (props: FinancesViewProps) => {
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
