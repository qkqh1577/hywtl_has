import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { FormikErrors } from 'formik';
import { DataField, DatePicker, FileInput } from 'components';
import { usePersonnel } from 'services/personnel';
import {
  PersonnelBasicView as View,
} from 'services/personnel/view';

type Props = {
  id: number;
  values: any;
  errors: FormikErrors<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const PersonnelDetailBasic = ({
  id,
  values,
  errors,
  setFieldValue,
}: Props) => {

  const {
    state: {
      basic: detail
    },
    getBasic: getOne
  } = usePersonnel();

  const [view, setView] = useState<View>(values);

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setFieldValue('basic', view);
  }, [view]);

  useEffect(() => {
    setView({
      engName: detail?.engName ?? view.engName,
      birthDate: detail?.birthDate ?? view.birthDate,
      sex: detail?.sex ?? view.sex,
      image: detail?.image ?? view.image,
      address: detail?.address ?? view.address,
      phone: detail?.phone ?? view.phone,
      emergencyPhone: detail?.emergencyPhone ?? view.emergencyPhone,
      relationship: detail?.relationship ?? view.relationship,
      personalEmail: detail?.personalEmail ?? view.personalEmail,
    });
  }, [detail]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <h2>기본 정보</h2>
      </Grid>
      <Grid item sm={6} xs={12}>
        <DataField
          name="basic.engName"
          label="영문명"
          value={view.engName}
          setFieldValue={setFieldValue}
          errors={errors}
          required
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <DatePicker
          name="basic.birthDate"
          label="생년월일"
          value={view.birthDate}
          setFieldValue={setFieldValue}
          errors={errors}
          openTo="year"
          required
          disableFuture
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <DataField
          type="select"
          name="basic.sex"
          label="성별"
          value={view.sex}
          setFieldValue={setFieldValue}
          errors={errors}
          options={['남', '여']}
          required
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FileInput
          name="basic.image"
          label="프로필 사진"
          value={view.image}
          setFieldValue={setFieldValue}
          errors={errors}
          labelDisabled
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <DataField
          name="basic.phone"
          label="연락처"
          value={view.phone}
          setFieldValue={setFieldValue}
          errors={errors}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <DataField
          name="basic.emergencyPhone"
          label="비상연락망"
          value={view.emergencyPhone}
          setFieldValue={setFieldValue}
          errors={errors}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <DataField
          name="basic.relationship"
          label="비상연락망 - 사원과의관계"
          value={view.relationship}
          setFieldValue={setFieldValue}
          errors={errors}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <DataField
          name="basic.personalEmail"
          label="개인 이메일"
          value={view.personalEmail}
          setFieldValue={setFieldValue}
          errors={errors}
        />
      </Grid>
    </Grid>
  );
};

export default PersonnelDetailBasic;
