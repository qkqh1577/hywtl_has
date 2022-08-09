import useLogin from 'App/service/loginHook';
import LoginForm from 'App/view/LoginForm';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'services/routes';

function Element() {
  const navigate = useNavigate();
  const { user } = useLogin();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (<LoginForm />);
}


const loginRoute: AppRoutes = {
  path:    '/login',
  element: <Element />
};

export default loginRoute;