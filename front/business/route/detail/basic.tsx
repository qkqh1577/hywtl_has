import BusinessBasicSection from 'business/view/Detail/Form/Basic';
import RegistrationNumberCheckButton from 'business/view/Detail/Form/RegistrationNumberCheckButton';
import React, {
  useCallback,
  useRef,
} from 'react';
import { businessAction } from 'business/action';
import { useDispatch } from 'react-redux';
import { DefaultFunction } from 'type/Function';
import { RegistrationNumberState } from 'business/domain';

interface Props {
  onAddressModal: DefaultFunction;
  checkRegistrationNumber?: RegistrationNumberState;
}

export default function BusinessBasicRoute(props: Props) {

  const dispatch = useDispatch();
  const onCheck = useCallback((registrationNumber: string) =>
      dispatch(businessAction.setRegistrationNumber(registrationNumber))
    , [dispatch]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <BusinessBasicSection
      inputRef={inputRef}
      onAddressModal={props.onAddressModal}
      checkRegistrationNumber={props.checkRegistrationNumber}
      checkButton={
        <RegistrationNumberCheckButton
          inputRef={inputRef}
          onCheck={onCheck}
        />
      }
    />
  );
}
