import React from 'react';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { FormikContextType } from 'formik';
import { Address } from 'components/AddressModal/domain';
import { DefaultFunction } from 'type/Function';
import { ProjectBasicDesignParameter } from 'project_basic/parameter';

interface Props {
  formik?: FormikContextType<any>;
  fieldName?: string | string[];
  addressValue: Address,
  detailAddress: string,
  onClose: DefaultFunction,
  setIsSaved: (boolean) => void,
  isSaved: boolean;
  onUpdate?: (params: ProjectBasicDesignParameter) => void
}

function Footer({
                  formik,
                  fieldName,
                  addressValue,
                  detailAddress,
                  onClose,
                  setIsSaved,
                  isSaved,
                  onUpdate
                }: Props) {
  return (
    <Box sx={{
      width:          '100%',
      margin:         '20px 0',
      display:        'flex',
      justifyContent: 'center',
      alignItems:     'center',
    }}>
      <Button
        sx={{
          marginRight: '10px',
        }}
        onClick={() => {
          if (formik && fieldName) {
            if (Array.isArray(fieldName)) {
              fieldName.forEach((name) => {
                if (name.includes('address')) {
                  formik.setFieldValue(name, `${addressValue.roadAddr} ${detailAddress}`);
                }
                else {
                  formik.setFieldValue(name, addressValue.zipNo);
                }
              });
            }
            else {
              formik.setFieldValue(fieldName, `${addressValue.roadAddr} ${detailAddress}`);
            }
          }
          if (onUpdate) {
            onUpdate({ address: `${addressValue.roadAddr} ${detailAddress}` });
          }
          setIsSaved(!isSaved);
          onClose();
        }}>
        저장
      </Button>
      <Button
        shape="basic2"
        onClick={() => {
          setIsSaved(!isSaved);
          onClose();
        }}>
        취소
      </Button>
    </Box>
  );
}

export default Footer;
