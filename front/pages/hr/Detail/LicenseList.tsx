import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { FormikErrors } from 'formik';
import { DataField, DatePicker } from 'components';
import {
  PersonnelLicenseView as View,
  initLicenseView as initView,
  usePersonnel
} from 'services/personnel';

type Props = {
  id: number;
  values: any;
  errors: FormikErrors<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

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

  const [view, setView] = useState<View[]>(values);

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue('licenseList', view);
  }, [view]);

  useEffect(() => {
    setView(detail?.map((item) => ({
      name: item.name,
      type: item.type ?? '',
      organizationName: item.organizationName,
      qualifiedNumber: item.qualifiedNumber,
      qualifiedDate: item.qualifiedDate,
      memo: item.memo ?? '',
    })) ?? view);
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
            setView([...view, initView]);
          }}
        >
          추가
        </Button>
      </Grid>
      {view && view.map((item, i) => (
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
                  name={`licenseList[${i}].name`}
                  value={item.name}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="종별"
                  name={`licenseList[${i}].type`}
                  value={item.type}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item>
                <DataField
                  label="발급기관명"
                  name={`licenseList[${i}].organizationName`}
                  value={item.organizationName}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DataField
                  label="인가 번호"
                  name={`licenseList[${i}].qualifiedNumber`}
                  value={item.qualifiedNumber}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item>
                <DatePicker
                  name={`licenseList[${i}].qualifiedDate`}
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
                  name={`licenseList[${i}].memo`}
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
                setView(view.filter((item, j) => i !== j));
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
