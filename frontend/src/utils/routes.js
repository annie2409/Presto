export const loginPage = '/login';
export const registerPage = '/register';
export const dashboardPage = '/dashboard';
export const editPresentationPage = '/presentation/:presentationId/edit';
export const editPresentationPageFor = (presentationId) =>
  `/presentation/${presentationId}/edit`;
export const previewPresentationPage = '/presentation/:presentationId/preview';
export const previewPresentationPageFor = (presentationId) =>
  `/presentation/${presentationId}/preview`;
