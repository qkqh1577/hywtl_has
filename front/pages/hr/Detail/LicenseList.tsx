import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton
} from '@mui/material';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import {
  useFormikContext
} from 'formik';
import { DataField } from 'components';
import {
  PersonnelLicenseView,
  initLicenseView,
  initView,
  usePersonnel
} from 'services/personnel';
import TextField from 'components/TextField';

type Props = {
  id: number;
}

const FIELD_NAME = 'licenseList';
const PersonnelDetailLicenseList = ({
                                      id,
                                    }: Props) => {
  const {
          state:          {
                            licenseList: detail,
                          },
          getLicenseList: getOne
        } = usePersonnel();
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue(FIELD_NAME, detail?.map((item) => ({
      name:             item.name ?? initLicenseView.name,
      type:             item.type ?? initLicenseView.type,
      organizationName: item.organizationName ?? initLicenseView.organizationName,
      qualifiedNumber:  item.qualifiedNumber ?? initLicenseView.qualifiedNumber,
      qualifiedDate:    item.qualifiedDate ?? initLicenseView.qualifiedDate,
      memo:             item.memo ?? initLicenseView.memo,
    })) ?? initView.licenseList);
  }, [detail]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} sx={{
        display:        'flex',
        justifyContent: 'space-between',
      }}>
        <h2>면허 정보</h2>
        <Button onClick={() => {
          if (Array.isArray(values)) {
            setFieldValue(FIELD_NAME, [...values, initLicenseView]);
          }
          else {
            setFieldValue(FIELD_NAME, [initLicenseView]);
          }
        }}>
          추가
        </Button>
      </Grid>
      {Array.isArray(values) && (values as PersonnelLicenseView[])
      .map((item,
            i
      ) => (
        <Grid item key={i} sm={12}>
          <Box sx={{
            display:        'flex',
            width:          '100%',
            justifyContent: 'space-between'
          }}>
            <Grid container spacing={2} wrap="nowrap">
              <Grid item>
                <TextField
                  required
                  label="면허명"
                  name={`${FIELD_NAME}[${i}].name`}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="종별"
                  name={`${FIELD_NAME}[${i}].type`}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  label="발급기관명"
                  name={`${FIELD_NAME}[${i}].organizationName`}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  label="인가 번호"
                  name={`${FIELD_NAME}[${i}].qualifiedNumber`}
                />
              </Grid>
              <Grid item>
                <DataField
                  required
                  disableFuture
                  type="date"
                  name={`${FIELD_NAME}[${i}].qualifiedDate`}
                  label="인가일"
                  openTo="year"
                />
              </Grid>
              <Grid item>
                <TextField
                  label="비고"
                  name={`${FIELD_NAME}[${i}].memo`}
                />
              </Grid>
            </Grid>
            <IconButton
              edge="end"
              color="secondary"
              aria-label="삭제"
              onClick={() => {
                // TODO: setFieldValue
                const list = (values as PersonnelLicenseView[]);
                setFieldValue(FIELD_NAME, list.filter((item,
                                                       j
                ) => i !== j));
              }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PersonnelDetailLicenseList;
