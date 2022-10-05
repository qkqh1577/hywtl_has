import LoginForm from 'app/view/LoginForm';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from 'services/routes';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';

function Element() {
  const navigate = useNavigate();
  const { detail: loginUser } = useSelector((root: RootState) => root.login);

  useEffect(() => {
    if (loginUser) {
      navigate('/');
    }
  }, [loginUser]);

  return (<LoginForm />);
}


const loginRoute: AppRoute = {
  path:    '/login',
  element: <Element />
};

export default loginRoute;