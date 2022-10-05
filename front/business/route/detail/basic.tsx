import BusinessBasicSection from 'business/view/Detail/Form/Basic';
import RegistrationNumberCheckButton from 'business/view/Detail/Form/RegistrationNumberCheckButton';
import React, { useCallback } from 'react';
import { businessAction } from 'business/action';
import { useDispatch } from 'react-redux';

export default function BusinessBasicRoute() {

  const dispatch = useDispatch();
  const onCheck = useCallback((registrationNumber: string) =>
      dispatch(businessAction.setRegistrationNumber(registrationNumber))
    , [dispatch]);

  return (
    <BusinessBasicSection
      checkButton={
        <RegistrationNumberCheckButton
          onCheck={onCheck}
        />
      }
    />
  );
}