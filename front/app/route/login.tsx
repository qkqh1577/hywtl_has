import useLogin from 'app/service/loginHook';
import LoginForm from 'app/view/LoginForm';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from 'services/routes';

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


const loginRoute: AppRoute = {
  path:    '/login',
  element: <Element />
};

export default loginRoute;