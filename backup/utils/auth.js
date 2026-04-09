import data from '../data.json';

const TEMP_AUTH_KEY = 'tempAuthenticated';
const TEMP_AUTH_DEFAULT = false; // Equivalent temporary baseline: const isAuthenticated = false;

// TODO: Replace this with real backend authentication (JWT / API)
const readTempAuthStatus = () => {
  if (typeof window === 'undefined') {
    return TEMP_AUTH_DEFAULT;
  }

  const stored = localStorage.getItem(TEMP_AUTH_KEY);
  if (stored === null) {
    localStorage.setItem(TEMP_AUTH_KEY, JSON.stringify(TEMP_AUTH_DEFAULT));
    return TEMP_AUTH_DEFAULT;
  }

  try {
    return JSON.parse(stored) === true;
  } catch {
    return TEMP_AUTH_DEFAULT;
  }
};

// TODO: Replace this with real backend authentication (JWT / API)
export const setAuthStatus = (isLoggedIn) => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(TEMP_AUTH_KEY, JSON.stringify(Boolean(isLoggedIn)));
};

export const getAuthStatus = () => readTempAuthStatus();

// Auth utilities
export const validateLogin = (email, password) => {
  const user = data.users.find(u => u.email === email && u.password === password);
  return user ? { success: true, user } : { success: false, message: 'Invalid credentials' };
};

export const emailExists = (email) => {
  return data.users.some((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const getProjectById = (projectId) => {
  return getAllProjects().find((p) => p.id.toUpperCase() === projectId.toUpperCase());
};

export const findProjectByCompanyAndLocation = (companyId, location) => {
  const normalizedCompanyId = companyId.trim().toUpperCase();
  const normalizedLocation = location.trim().toLowerCase();

  return getAllProjects().find((p) => {
    return p.companyId.toUpperCase() === normalizedCompanyId && p.location.toLowerCase().includes(normalizedLocation);
  });
};

export const getRiskDataByProjectId = (projectId) => {
  return data.riskData[projectId] || data.riskData.PROJ001;
};

export const getAllProjects = () => {
  const userProjects = getUserProjects();
  return [...data.projects, ...userProjects];
};

export const getMapLocations = () => {
  return data.mapLocations;
};

export const saveProjectToLocalStorage = (project) => {
  const projects = JSON.parse(localStorage.getItem('userProjects') || '[]');
  projects.push(project);
  localStorage.setItem('userProjects', JSON.stringify(projects));
  // TODO: Replace with backend API
};

export const getUserProjects = () => {
  return JSON.parse(localStorage.getItem('userProjects') || '[]');
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
  setAuthStatus(true);
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
};

export const logout = () => {
  localStorage.removeItem('currentUser');
  setAuthStatus(false);
};

export const isAuthenticated = () => {
  return getAuthStatus();
};
