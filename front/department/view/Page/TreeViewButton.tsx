import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'layouts/Button';

export default function () {

  const navigate = useNavigate();
  const onClick = () => {
    navigate('/admin/department-tree');
  };

  return (
    <Button
      children="트리로 보기"
      onClick={onClick}
    />
  );
}