import React from 'react';
import { AppRoute } from 'services/routes';
import AccessDenied from 'login/view/AccessDenied';

function Element(props) {
  return (
    <AccessDenied />
  );
}

const passwordInvalidRoute: AppRoute = {
  path:    '/user/password-reset/invalid',
  element: <Element />
};

export default passwordInvalidRoute;
