import React from 'react';
import { DefaultFunction } from 'type/Function';
import ModalLayout from 'layouts/ModalLayout';
import {
  Box,
  Button
} from '@mui/material';
import ProjectBasicInvolvedTypeSelectorComponent from 'project_basic/view/components/InvolvedTypeSelector';
import ProjectBasicBusinessSelectorComponent from 'project_basic/view/components/BusinessSelector';
import ProjectBasicBusinessManagerSelectorComponent from 'project_basic/view/components/BusinessManagerSelector';
import {
  BusinessId,
  BusinessInvolvedType,
  BusinessManagerId,
  BusinessManagerVO,
  BusinessVO
} from 'business/domain';

type FilterCondition = { keywordType: string, keyword: string };

interface Props {
  selectedValues: {
    involvedType?: BusinessInvolvedType;
    businessId?: BusinessId;
    businessManagerId?: BusinessManagerId;
  };
  values: {
    businessList: BusinessVO[];
    businessFilterCondition?: FilterCondition;
    businessManagerList: BusinessManagerVO[];
    businessManagerFilterCondition?: FilterCondition;
  };
  handlers: {
    onSelectInvolvedType: (type: BusinessInvolvedType) => void;
    onSelectBusiness: (id: BusinessId) => void;
    onSelectBusinessManager: (id: BusinessManagerId) => void;
    onBusinessFilter: (condition: FilterCondition) => void;
    onBusinessManagerFilter: (condition: FilterCondition) => void;
    onSubmit: (selected: {
      businessId: BusinessId;
      businessManagerId: BusinessManagerId;
      involvedType: BusinessInvolvedType;
    }) => void;
    onClose: DefaultFunction;
  };
  open: boolean;
  isSubmitting: boolean;
}

export default function ProjectBasicBusinessAddModal(props: Props) {
  const { selectedValues, values, handlers, open, isSubmitting } = props;
  const {
          onSelectInvolvedType, onSelectBusiness, onSelectBusinessManager,
          onBusinessFilter, onBusinessManagerFilter, onSubmit, onClose
        } = handlers;

  return <ModalLayout
    width="90vw"
    open={open}
    title="관계사 등록"
    onClose={onClose}
    children={
      <Box sx={{
        width:    '100%',
        display:  'flex',
        flexWrap: 'wrap',
      }}>
        <Box sx={{
          width:        '50%',
          display:      'flex',
          flexWrap:     'wrap',
          alignContent: 'flex-start'
        }}>
          <ProjectBasicInvolvedTypeSelectorComponent
            initInvolvedType={selectedValues.involvedType}
            handleChangeInvolvedType={(e) => {
              if (!e) {
                return;
              }
              const v = e.target.value;
              onSelectInvolvedType(v);
            }}
          />
          <ProjectBasicBusinessSelectorComponent
            initBusinessList={values.businessList}
            selectedBusinessId={selectedValues.businessId}
            handleSelectBusinessId={(id) => {
              onSelectBusiness(id);
            }}
            initFilterCondition={values.businessFilterCondition}
            handleSetFilter={(condition) => {
              onBusinessFilter(condition);
            }}
          />
        </Box>
        <Box sx={{
          width:        '50%',
          display:      'flex',
          flexWrap:     'wrap',
          alignContent: 'flex-start'
        }}>
          <ProjectBasicInvolvedTypeSelectorComponent
            hidden
          />
          <ProjectBasicBusinessManagerSelectorComponent
            initBusinessManagerList={values.businessManagerList}
            selectedBusinessManagerId={selectedValues.businessManagerId}
            handleSelectBusinessManagerId={(id) => {
              onSelectBusinessManager(id);
            }}
            initFilterCondition={values.businessManagerFilterCondition}
            handleSetFilter={(condition) => {
              onBusinessManagerFilter(condition);
            }}
          />
        </Box>
      </Box>
    }
    footer={
      <>
        <Button
          children="등록"
          disabled={isSubmitting}
          onClick={() => {
            if (!selectedValues.involvedType || !selectedValues.businessId || !selectedValues.businessManagerId) {
              return;
            }

            onSubmit({
              involvedType:      selectedValues.involvedType,
              businessId:        selectedValues.businessId,
              businessManagerId: selectedValues.businessManagerId,
            });
          }}
          sx={{
            marginRight: '20px',
          }}
        />
        <Button onClick={onClose}>
          취소
        </Button>
      </>
    }
  />;
}
