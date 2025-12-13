export const ACCOUNT_LIMITS = {
  personal: {
    maxProjects: 1,
    maxEmployees: 10,
    hasCompanyFinances: false
  },
  business: {
    maxProjects: Infinity,
    maxEmployees: Infinity,
    hasCompanyFinances: true
  }
};

export const checkAccountLimit = (user: any, limitType: 'projects' | 'employees'): boolean => {
  if (user.accountType === 'personal') {
    return false;
  }
  
  if (user.accountType === 'business' && !user.subscriptionActive) {
    return false;
  }
  
  return true;
};

export const getMaxLimit = (accountType: 'personal' | 'business', limitType: 'projects' | 'employees'): number => {
  if (limitType === 'projects') {
    return accountType === 'personal' ? ACCOUNT_LIMITS.personal.maxProjects : ACCOUNT_LIMITS.business.maxProjects;
  }
  if (limitType === 'employees') {
    return accountType === 'personal' ? ACCOUNT_LIMITS.personal.maxEmployees : ACCOUNT_LIMITS.business.maxEmployees;
  }
  return 0;
};

export const canAddItem = (
  accountType: 'personal' | 'business',
  subscriptionActive: boolean,
  currentCount: number,
  limitType: 'projects' | 'employees'
): { allowed: boolean; message: string } => {
  if (accountType === 'personal') {
    const limit = getMaxLimit('personal', limitType);
    if (currentCount >= limit) {
      return {
        allowed: false,
        message: limitType === 'projects' 
          ? 'Личный аккаунт поддерживает только 1 объект. Перейдите на бизнес-аккаунт для неограниченного количества.'
          : 'Достигнут лимит в 10 сотрудников для личного аккаунта. Перейдите на бизнес-аккаунт для неограниченного количества.'
      };
    }
    return { allowed: true, message: '' };
  }
  
  if (accountType === 'business' && !subscriptionActive) {
    return {
      allowed: false,
      message: 'Подписка не активна. Оплатите подписку для продолжения работы.'
    };
  }
  
  return { allowed: true, message: '' };
};
