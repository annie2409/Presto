/* eslint-disable prettier/prettier */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route components
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import { dashboardPage, loginPage, presentationPage, registerPage } from './utils/routes';
import { Presentation } from './pages/Presentation';

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
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ErrorBoundary fallbackRender={fallbackRender}>
          <BrowserRouter>
            <Routes>
              <Route path={dashboardPage} element={<Dashboard />}/>
              <Route path={loginPage} element={<Login />} />
              <Route path={registerPage} element={<Register />} />
              <Route path={presentationPage} element={<Presentation/>}/>
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export const navBarPages = [{ to: dashboardPage, text: 'Dashboard' }];

export default App;
