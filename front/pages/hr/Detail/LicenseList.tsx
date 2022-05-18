import React, { useEffect } from 'react';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { FormikErrors } from 'formik';
import { DataField, DatePicker } from 'components';
import {
  PersonnelLicenseView,
  initLicenseView,
  initView,
  usePersonnel
} from 'services/personnel';

type Props = {
  id: number;
  values: any;
  errors: FormikErrors<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const FIELD_NAME = 'licenseList';
const PersonnelDetailLicenseList = ({
  id,
  values,
  errors,
  setFieldValue,
}: Props) => {
  const {
    state: {
      licenseList: detail,
    },
    getLicenseList: getOne
  } = usePersonnel();

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue(FIELD_NAME, detail?.map((item) => ({
      name: item.name ?? initLicenseView.name,
      type: item.type ?? initLicenseView.type,
      organizationName: item.organizationName ?? initLicenseView.organizationName,
      qualifiedNumber: item.qualifiedNumber ?? initLicenseView.qualifiedNumber,
      qualifiedDate: item.qualifiedDate ?? initLicenseView.qualifiedDate,
      memo: item.memo ?? initLicenseView.memo,
    })) ?? initView.licenseList);
  }, [detail]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <h2>면허 정보</h2>
        <Button
          color="primary"
          variant="contained"
          style={{ height: '36px' }}
          onClick={() => {
            if (Array.isArray(values)) {
              setFieldValue(FIELD_NAME, [...values, initLicenseView]);
            } else {
              setFieldValue(FIELD_NAME, [initLicenseView]);
            }
          }}
        >
          추가
        </Button>
      </Grid>
      {Array.isArray(values) && (values as PersonnelLicenseView[])
      .map((item, i) => (
        <Grid key={i} item sm={12}>
          <Box sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
          }}>
            <Grid container spacing={2} wrap="nowrap">
              <Grid item>
                <DataField
                  label="면허명"
                  name={`${FIELD_NAME}[${i}].name`}
                  value={item.name}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="종별"
                  name={`${FIELD_NAME}[${i}].type`}
                  value={item.type}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField
                  label="발급기관명"
                  name={`${FIELD_NAME}[${i}].organizationName`}
                  value={item.organizationName}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="인가 번호"
                  name={`${FIELD_NAME}[${i}].qualifiedNumber`}
                  value={item.qualifiedNumber}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DatePicker
                  name={`${FIELD_NAME}[${i}].qualifiedDate`}
                  label="인가일"
                  value={item.qualifiedDate}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  openTo="year"
                  required
                  disableFuture
                />
              </Grid>
              <Grid item>
                <DataField
                  label="비고"
                  name={`${FIELD_NAME}[${i}].memo`}
                  value={item.memo}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
            </Grid>
            <IconButton
              edge="end"
              color="secondary"
              aria-label="삭제"
              onClick={() => {
                const list = (values as PersonnelLicenseView[]);
                setFieldValue(FIELD_NAME, list.filter((item, j) => i !== j));
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PersonnelDetailLicenseList;
