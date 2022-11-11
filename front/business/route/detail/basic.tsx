import BusinessBasicSection from 'business/view/Detail/Form/Basic';
import RegistrationNumberCheckButton from 'business/view/Detail/Form/RegistrationNumberCheckButton';
import React, {
  useCallback,
  useRef,
} from 'react';
import { businessAction } from 'business/action';
import { useDispatch } from 'react-redux';

export default function BusinessBasicRoute() {

  const dispatch = useDispatch();
  const onCheck = useCallback((registrationNumber: string) =>
      dispatch(businessAction.setRegistrationNumber(registrationNumber))
    , [dispatch]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <BusinessBasicSection
      inputRef={inputRef}
      checkButton={
        <RegistrationNumberCheckButton
          inputRef={inputRef}
          onCheck={onCheck}
        />
      }
    />
  );
}
