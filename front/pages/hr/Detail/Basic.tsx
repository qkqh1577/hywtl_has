import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { FormikErrors } from 'formik';
import {
  DataField,
  FileInput
} from 'components';
import {
  initBasicView as initView,
  usePersonnel,
} from 'services/personnel';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';

type Props = {
  id: number;
  values: any;
  errors: FormikErrors<any>;
  setFieldValue: (field: string,
                  value: any,
                  shouldValidate?: boolean
  ) => void;
}

const FIELD_NAME = 'basic';
const PersonnelDetailBasic = ({
                                id,
                                values,
                                setFieldValue,
                              }: Props) => {

  const {
          state:    {
                      basic: detail
                    },
          getBasic: getOne,
        } = usePersonnel();

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue(FIELD_NAME, {
      engName:        detail?.engName ?? initView.engName,
      birthDate:      detail?.birthDate ?? initView.birthDate,
      sex:            detail?.sex ?? initView.sex,
      image:          detail?.image ?? initView.image,
      address:        detail?.address ?? initView.address,
      phone:          detail?.phone ?? initView.phone,
      emergencyPhone: detail?.emergencyPhone ?? initView.emergencyPhone,
      relationship:   detail?.relationship ?? initView.relationship,
      personalEmail:  detail?.personalEmail ?? initView.personalEmail,
    });
  }, [detail]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <h2>기본 정보</h2>
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          required
          name={`${FIELD_NAME}.engName`}
          label="영문명"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <DataField
          required
          disableFuture
          type="date"
          name={`${FIELD_NAME}.birthDate`}
          label="생년월일"
          openTo="year"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <SelectField
          required
          name={`${FIELD_NAME}.sex`}
          label="성별"
          options={['남', '여']}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FileInput disableLabel
          name={`${FIELD_NAME}.image`}
          label="프로필 사진"
          value={values.image}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          name={`${FIELD_NAME}.phone`}
          label="연락처"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          name={`${FIELD_NAME}.emergencyPhone`}
          label="비상연락망"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          name={`${FIELD_NAME}.relationship`}
          label="비상연락망 - 사원과의관계"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          name={`${FIELD_NAME}.personalEmail`}
          label="개인 이메일"
        />
      </Grid>
    </Grid>
  );
};

export default PersonnelDetailBasic;
