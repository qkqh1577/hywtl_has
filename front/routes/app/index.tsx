import useLogin from 'App/service/loginHook';
import LoginForm from 'App/view/LoginForm';
import { AppRoutes } from 'routes/index';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginElement() {
  const navigate = useNavigate();
  const { user } = useLogin();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (<LoginForm />);
}


const LoginRoutes: AppRoutes[] = [{
  path:    '/login',
  element: <LoginElement />
}];

export default LoginRoutes;