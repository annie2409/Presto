export const loginPage = '/login';
export const registerPage = '/register';
export const dashboardPage = '/dashboard';
export const editPresentationPage = '/presentation/:presentationId/edit';
export const editPresentationPageAtSlide =
  '/presentation/:presentationId/edit/:slide';
export const editPresentationPageAtSlideFor = (presentationId, slideNum) =>
  `/presentation/${presentationId}/edit/${slideNum}`;
export const editPresentationPageFor = (presentationId) =>
  `/presentation/${presentationId}/edit`;

export const previewPresentationPage = '/presentation/:presentationId/preview';
export const previewPresentationPageAtSlide =
  '/presentation/:presentationId/preview/:slide';
export const previewPresentationPageFor = (presentationId) =>
  `/presentation/${presentationId}/preview`;
export const previewPresentationPageAtSlideFor = (presentationId, slideNum) =>
  `/presentation/${presentationId}/preview/${slideNum}`;
