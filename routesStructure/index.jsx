/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>

          <Route path="/" element={<PrivateRoutes />}>
            <Route index element={<h1>Dashboard</h1>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
