import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useAuthInfo from 'customHooks/useAuthInfo';
import LayoutWrapper from 'containers/common/layout';

function PrivateRoutes() {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAuthInfo();
  // const isAuthenticated = true;
  return isAuthenticated ? <LayoutWrapper /> : <Navigate to="/auth/sign-in" state={{ from: `${pathname}${search}` }} />;
}

export default PrivateRoutes;
