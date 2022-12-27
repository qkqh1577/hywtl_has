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
import { UpdateByFormik } from 'components/AddressModal/AddressModal';

interface Props {
  onAddressModal: DefaultFunction;
  checkRegistrationNumber?: RegistrationNumberState;
  setAddress: DefaultFunction<UpdateByFormik>;
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
      setAddress={props.setAddress}
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
