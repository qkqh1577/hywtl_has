import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton
} from '@mui/material';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import {
  FormikValues,
  useFormikContext
} from 'formik';
import {
  PersonnelAcademicView,
  initAcademicView,
  initView,
  usePersonnel
} from 'services/personnel';
import TextField from 'components/TextField';
import DateField from 'components/DateField';

type Props = {
  id: number;
}
const FIELD_NAME = 'academicList';
const PersonnelDetailAcademicList = ({
                                       id,
                                     }: Props) => {
  const {
          state:           {
                             academicList: detail,
                           },
          getAcademicList: getOne
        } = usePersonnel();

  const { setFieldValue, values } = useFormikContext<FormikValues>();

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue(FIELD_NAME, detail?.map((item) => ({
      academyName: item.academyName ?? initAcademicView.academyName,
      major:       item.major ?? initAcademicView.major,
      degree:      item.degree ?? initAcademicView.degree,
      state:       item.state ?? initAcademicView.state,
      grade:       item.grade ?? initAcademicView.grade,
      startDate:   item.startDate ?? initAcademicView.startDate,
      endDate:     item.endDate ?? initAcademicView.endDate,
    })) ?? initView.academicList);
  }, [detail]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} sx={{
        display:        'flex',
        justifyContent: 'space-between',
      }}>
        <h2>학력 정보</h2>
        <Button onClick={() => {
          if (Array.isArray(values)) {
            setFieldValue(FIELD_NAME, [...values, initAcademicView]);
          }
          else {
            setFieldValue(FIELD_NAME, [initAcademicView]);
          }
        }}>
          추가
        </Button>
      </Grid>
      {Array.isArray(values) && (values as PersonnelAcademicView[])
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
                <TextField required
                  label="교육기관명"
                  name={`${FIELD_NAME}[${i}].academyName`}
                />
              </Grid>
              <Grid item>
                <TextField required
                  label="전공"
                  name={`${FIELD_NAME}[${i}].major`}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="학위"
                  name={`${FIELD_NAME}[${i}].degree`}
                />
              </Grid>
              <Grid item>
                <TextField required
                  label="재적 상태"
                  name={`${FIELD_NAME}[${i}].state`}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="학점"
                  name={`${FIELD_NAME}[${i}].grade`}
                />
              </Grid>
              <Grid item>
                <DateField
                  required
                  name={`${FIELD_NAME}[${i}].startDate`}
                  label="시작일"
                  openTo="year"
                />
              </Grid>
              <Grid item>
                <DateField
                  required
                  name={`${FIELD_NAME}[${i}].endDate`}
                  label="종료일"
                  openTo="year"
                />
              </Grid>
            </Grid>
            <IconButton
              edge="end"
              color="secondary"
              aria-label="삭제"
              onClick={() => {
                const list = (values as PersonnelAcademicView[]);
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

export default PersonnelDetailAcademicList;
