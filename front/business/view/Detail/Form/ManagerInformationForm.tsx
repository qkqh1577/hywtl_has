import React, {
  useContext
} from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import SelectField from 'components/SelectField';
import {
  BusinessManagerStatus,
  businessManagerStatusList,
  businessManagerStatusName,
  BusinessVO,
  initialBusinessManagerVO,
} from 'business/domain';
import TextField from 'components/TextField';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import useDialog from 'components/Dialog';

export default function () {
  const { error } = useDialog();
  const formikContext: FormikContextType<BusinessVO & { edit: boolean; }> = useContext(FormikContext);
  const managerList = formikContext?.values.managerList;
  const edit = formikContext?.values.edit ?? true;

  return (
    <Box sx={{
      display:  'flex',
      width:    '100%',
      flexWrap: 'wrap',
    }}>
      <Grid container spacing={2}>
        <Grid item sm={edit ? 8 : 12}>
          <Typography variant="h6">담당자 정보</Typography>
        </Grid>
        {edit && (
          <Grid item sm={4}>
            <Button
              children="+추가"
              onClick={() => {
                formikContext!.setFieldValue('managerList', [...(managerList ?? []), initialBusinessManagerVO]);
              }}
            />
          </Grid>
        )}
      </Grid>
      {managerList && managerList.map((manager,
                                       i
      ) => {
        return (
          <Box key={i} sx={{
            display:         'flex',
            width:           '100%',
            backgroundColor: manager.status === BusinessManagerStatus.RESIGNATION ? '#eee' : 'inherit',
            padding:         '12px 0',
            border:          '1px solid #0000001f',
            margin:          '12px 0'
          }}>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  required
                  name={`managerList.${i}.name`}
                  label="담당자명"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name={`managerList.${i}.department`}
                  label="소속"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name={`managerList.${i}.jobTitle`}
                  label="직위"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name={`managerList.${i}.mobilePhone`}
                  label="핸드폰"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name={`managerList.${i}.officePhone`}
                  label="전화번호"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name={`managerList.${i}.meta`}
                  label="메타"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name={`managerList.${i}.email`}
                  label="이메일"
                />
              </Grid>
              <Grid item xs={4}>
                <SelectField
                  name={`managerList.${i}.status`}
                  label="상태"
                  options={businessManagerStatusList.map((item) => ({
                    key:  item,
                    text: businessManagerStatusName(item)
                  }))}
                />
              </Grid>
              {!edit && (
                <Grid item xs={4}>
                  <TextField
                    name={`managerList.${i}.projectCount`}
                    label="담당 프로젝트"
                  />
                </Grid>
              )}
              {edit && (
                <Grid item sm={4}>
                  <Button
                    children="삭제"
                    onClick={() => {
                      if (managerList.length === 1) {
                        error('최소 하나 이상의 담당자 정보가 필요합니다.');
                        return;
                      }
                      formikContext!.setFieldValue('managerList', managerList.filter((manager,
                                                                                      j
                      ) => i !== j));
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};
