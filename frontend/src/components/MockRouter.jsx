// MockRouter.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const MockRouter = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default MockRouter;
