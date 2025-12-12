export const mockProjects = [
  {
    id: 1,
    name: 'ЖК Новый Горизонт',
    address: 'ул. Ленина, 45',
    budget: 5000000,
    spent: 3250000,
    income: 4000000,
    archived: false,
    comments: [
      { id: 1, text: 'Начали работу на объекте', date: '2024-12-01', author: 'Иван Петров' }
    ],
    stages: [
      { 
        id: 1,
        name: 'Фундамент', 
        spent: 800000, 
        materials: 500000, 
        labor: 300000,
        expenses: [
          { id: 1, description: 'Цемент М500', amount: 250000, type: 'materials', receipt: null },
          { id: 2, description: 'Арматура', amount: 250000, type: 'materials', receipt: null },
          { id: 3, description: 'Бетонные работы', amount: 300000, type: 'labor', receipt: null },
        ]
      },
      { 
        id: 2,
        name: 'Стены', 
        spent: 1200000, 
        materials: 700000, 
        labor: 500000,
        expenses: [
          { id: 4, description: 'Кирпич', amount: 700000, type: 'materials', receipt: null },
          { id: 5, description: 'Кладка стен', amount: 500000, type: 'labor', receipt: null },
        ]
      },
      { 
        id: 3,
        name: 'Кровля', 
        spent: 450000, 
        materials: 300000, 
        labor: 150000,
        expenses: [
          { id: 6, description: 'Металлочерепица', amount: 300000, type: 'materials', receipt: null },
          { id: 7, description: 'Монтаж кровли', amount: 150000, type: 'labor', receipt: null },
        ]
      },
    ]
  },
  {
    id: 2,
    name: 'Коттедж на Лесной',
    address: 'пос. Зеленый, уч. 12',
    budget: 3000000,
    spent: 1350000,
    income: 1800000,
    archived: false,
    comments: [],
    stages: [
      { 
        id: 4,
        name: 'Фундамент', 
        spent: 400000, 
        materials: 250000, 
        labor: 150000,
        expenses: []
      },
      { 
        id: 5,
        name: 'Стены', 
        spent: 600000, 
        materials: 350000, 
        labor: 250000,
        expenses: []
      },
      { 
        id: 6,
        name: 'Кровля', 
        spent: 0, 
        materials: 0, 
        labor: 0,
        expenses: []
      },
    ]
  },
];

export const mockEmployees = [
  { id: 1, name: 'Иван Петров', role: 'Прораб', tasks: 3, archived: false, phone: '+7 (999) 123-45-67', telegram: '@ivan_petrov', whatsapp: '+79991234567', max: '@ivan_max' },
  { id: 2, name: 'Сергей Иванов', role: 'Каменщик', tasks: 2, archived: false, phone: '+7 (999) 765-43-21', telegram: '', whatsapp: '', max: '' },
  { id: 3, name: 'Михаил Сидоров', role: 'Электрик', tasks: 4, archived: false, phone: '+7 (999) 555-12-34', telegram: '@m_sidorov', whatsapp: '+79995551234', max: '' },
];

export const mockTasks = [
  { id: 1, title: 'Залить бетон', project: 'ЖК Новый Горизонт', assignee: 'Иван Петров', status: 'В работе' },
  { id: 2, title: 'Установить окна', project: 'Коттедж на Лесной', assignee: 'Сергей Иванов', status: 'Ожидает' },
  { id: 3, title: 'Провести проводку', project: 'ЖК Новый Горизонт', assignee: 'Михаил Сидоров', status: 'В работе' },
];