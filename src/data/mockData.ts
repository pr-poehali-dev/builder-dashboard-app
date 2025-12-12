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

export const mockExpenseCategories = [
  { 
    id: 1, 
    name: 'Аренда офиса', 
    type: 'recurring',
    amount: 50000,
    description: 'Ежемесячная аренда офиса',
    payments: [
      { id: 1, amount: 50000, date: '2024-11-01', receipt: null },
      { id: 2, amount: 50000, date: '2024-12-01', receipt: null }
    ]
  },
  { 
    id: 2, 
    name: 'Зарплата персонала', 
    type: 'recurring',
    amount: 250000,
    description: 'Зарплата сотрудников офиса',
    payments: [
      { id: 3, amount: 250000, date: '2024-11-25', receipt: null },
      { id: 4, amount: 250000, date: '2024-12-25', receipt: null }
    ]
  },
  { 
    id: 3, 
    name: 'Топливо', 
    type: 'one-time',
    amount: 0,
    description: 'Разовые расходы на топливо',
    payments: [
      { id: 5, amount: 35000, date: '2024-12-05', receipt: null },
      { id: 6, amount: 42000, date: '2024-12-15', receipt: null }
    ]
  },
  { 
    id: 4, 
    name: 'Налоги', 
    type: 'recurring',
    amount: 120000,
    description: 'Квартальные налоги',
    payments: [
      { id: 7, amount: 120000, date: '2024-10-10', receipt: null },
    ]
  }
];

export const mockCompanyExpenses = [
  { id: 1, description: 'Аренда офиса', amount: 50000, category: 'rent', date: '2024-12-01', receipt: null, categoryId: 1 },
  { id: 2, description: 'Зарплата персонала', amount: 250000, category: 'salary', date: '2024-12-01', receipt: null, categoryId: 2 },
  { id: 3, description: 'Топливо для техники', amount: 35000, category: 'fuel', date: '2024-12-05', receipt: null, categoryId: 3 },
  { id: 4, description: 'Налоги', amount: 120000, category: 'taxes', date: '2024-12-10', receipt: null, categoryId: 4 },
];