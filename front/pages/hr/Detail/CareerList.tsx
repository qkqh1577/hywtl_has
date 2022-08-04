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
import {
  PersonnelCareerView,
  initCareerView,
  initView,
  usePersonnel
} from 'services/personnel';
import TextField from 'components/TextField';
import DateField from 'components/DateField';

type Props = {
  id: number;
}

const FIELD_NAME = 'careerList';
const PersonnelDetailCareerList = ({
                                     id,
                                   }: Props) => {
  const {
          state:         {
                           careerList: detail,
                         },
          getCareerList: getOne
        } = usePersonnel();

  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue(FIELD_NAME, detail?.map((item) => ({
      companyName: item.companyName ?? initCareerView.companyName,
      startDate:   item.startDate ?? initCareerView.startDate,
      endDate:     item.endDate ?? initCareerView.endDate,
      majorJob:    item.majorJob ?? initCareerView.majorJob,
    })) ?? initView.careerList);
  }, [detail]);

  return (
    <Grid container spacing={2}>
      <Grid item
        sm={12}
        sx={{
          display:        'flex',
          justifyContent: 'space-between',
        }}>
        <h2>경력 정보</h2>
        <Button onClick={() => {
          if (Array.isArray(values)) {
            setFieldValue(FIELD_NAME, [...values, initCareerView]);
          }
          else {
            setFieldValue(FIELD_NAME, [initCareerView]);
          }
        }}>
          추가
        </Button>
      </Grid>
      {Array.isArray(values) && (values as PersonnelCareerView[])
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
                  label="근무처명"
                  name={`${FIELD_NAME}[${i}].companyName`}
                />
              </Grid>
              <Grid item>
                <DateField
                  required
                  disableFuture
                  name={`${FIELD_NAME}[${i}].startDate`}
                  label="시작일"
                  openTo="year"
                />
              </Grid>
              <Grid item>
                <DateField
                  required
                  disableFuture
                  name={`${FIELD_NAME}[${i}].endDate`}
                  label="종료일"
                  openTo="year"
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  label="주 업무"
                  name={`${FIELD_NAME}[${i}].majorJob`}
                />
              </Grid>
            </Grid>
            <IconButton
              edge="end"
              color="secondary"
              aria-label="삭제"
              onClick={() => {
                const list = (values as PersonnelCareerView[]);
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

export default PersonnelDetailCareerList;
