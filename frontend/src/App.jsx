/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route components
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import { dashboardPage, loginPage, editPresentationPage, registerPage } from './utils/routes';
import { EditPresentation } from './pages/EditPresentation';
import { UserDataProvider } from './context/UserDataContext';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import c from 'highlight.js/lib/languages/c';

const queryClient = new QueryClient();

const fallbackRender = ({ error, resetErrorBoundary }) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    hljs.highlightAll();
    hljs.highlightAll();
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('python', python);
    hljs.registerLanguage('c', c);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ErrorBoundary fallbackRender={fallbackRender}>
          <BrowserRouter>
            <Routes>
              <Route path={loginPage} element={<Login />} />
              <Route path={registerPage} element={<Register />} />
              <Route path={dashboardPage} element={
                <UserDataProvider>
                  <Dashboard />
                </UserDataProvider>
              }/>
              <Route path={editPresentationPage} element={
                <UserDataProvider>
                  <EditPresentation/>
                </UserDataProvider>
              }/>
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export const navBarPages = [{ to: dashboardPage, text: 'Dashboard' }];

export default App;
