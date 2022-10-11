import React from 'react';
import { DefaultFunction } from 'type/Function';
import ModalLayout from 'layouts/ModalLayout';
import Button from 'layouts/Button';
import ProjectBasicBusinessDetailComponent from 'project_basic/view/components/BusinessDetail';
import ProjectBasicBusinessManagerDetailComponent from 'project_basic/view/components/BusinessManagerDetail';
import {
  BusinessInvolvedType,
  BusinessManagerVO,
  BusinessVO
} from 'business/domain';

interface Props {
  values: {
    involvedType: BusinessInvolvedType;
    business: BusinessVO;
    businessManager: BusinessManagerVO;
  };
  handlers: {
    onDeleteOpen: () => void;
    onUpdateOpen: () => void;
    onClose: DefaultFunction;
  };
  open: boolean;
  isSubmitting: boolean;
}

export default function ProjectBasicBusinessDetailModal(props: Props) {
  const { values, handlers, open, isSubmitting } = props;
  const { onDeleteOpen, onUpdateOpen, onClose } = handlers;

  return (
    <ModalLayout
      width="40vw"
      open={open}
      title="관계사 상세"
      onClose={onClose}
      children={
        <>
          <ProjectBasicBusinessDetailComponent involvedType={values.involvedType} business={values.business} />
          <ProjectBasicBusinessManagerDetailComponent business={values.business} businessManager={values.businessManager} />
        </>
      }
      footer={
        <>
          <Button
            shape="basic3"
            children="삭제"
            disabled={isSubmitting}
            onClick={() => {
              onDeleteOpen();
            }}
            sx={{
              marginRight: '0.5rem'
            }}
          />
          <Button
            children="수정"
            disabled={isSubmitting}
            onClick={() => {
              onUpdateOpen();
            }}
            sx={{
              marginRight: '0.5rem'
            }}
          />
          <Button
            shape="basic2"
            children="닫기"
            onClick={() => {
              onClose();
            }}
          />
        </>
      }
    />
  );
}
