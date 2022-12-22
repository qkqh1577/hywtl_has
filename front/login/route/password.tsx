import React from 'react';
import { AppRoute } from 'services/routes';
import FormToFindPassword from 'login/view/FormToFindPassword';

function Element(props) {
  return (
    <FormToFindPassword />
  );
}

const loginForgotRoute: AppRoute = {
  path: '/login/forgot',
  element: <Element />
}

export default loginForgotRoute;
