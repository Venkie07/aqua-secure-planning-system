import data from '../data.json';

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
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};
