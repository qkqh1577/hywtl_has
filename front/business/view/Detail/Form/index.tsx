import React from 'react';
import {
  Box,
} from '@mui/material';
import BasicInformationForm from 'business/view/Detail/Form/BasicInformationForm';
import ManagerInformationForm from 'business/view/Detail/Form/ManagerInformationForm';
import { RegistrationNumberCheckButtonProps } from 'business/view/Detail/Form/RegistrationNumberCheckButton';
import InvolvedProjectInformationList from 'business/view/Detail/Form/InvolvedProjectInformationList';
import RivalProjectInformationList from 'business/view/Detail/Form/RivalProjectInformationList';
import {
  InvolvedProjectVO,
  RivalProjectVO
} from 'business/domain';
import { ColorPalette } from 'app/view/App/theme';

export interface BusinessFormProps
  extends RegistrationNumberCheckButtonProps {
  involvedProjectList?: InvolvedProjectVO[];
  businessName: string;
  rivalProjectList?: RivalProjectVO[];
}

function SpaceBox(props: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{
      display:      'flex',
      width:        '100%',
      marginBottom: '20px',
      border:       `1px solid ${ColorPalette._e4e9f2}`
    }}
      children={props.children}
    />
  );
}

export default function (props: BusinessFormProps) {
  return (
    <Box sx={{
      display:  'flex',
      width:    '100%',
      flexWrap: 'wrap',
    }}>
      <SpaceBox>
        <BasicInformationForm {...props} />
      </SpaceBox>
      {props.involvedProjectList && (
        <SpaceBox>
          <InvolvedProjectInformationList list={props.involvedProjectList} />
        </SpaceBox>
      )}
      {props.rivalProjectList && (
        <SpaceBox>
          <RivalProjectInformationList list={props.rivalProjectList} businessName={props.businessName} />
          <RivalProjectInformationList list={props.rivalProjectList} businessName={props.businessName} />
        </SpaceBox>
      )}
      <SpaceBox>
        <ManagerInformationForm />
      </SpaceBox>
    </Box>
  );
};
