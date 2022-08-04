import React, {
  useEffect,
  useState
} from 'react';
import { useParams } from 'react-router-dom';
import { useDialog } from 'components';
import useProject from 'services/project/hook';
import {
  ProjectBasicParameter,
  ProjectBasicView as View,
  initProjectBasicView as initView,
} from 'services/project';
import PageLayout from 'components/PageLayout';
import { Grid } from '@mui/material';
import TextField from 'components/TextField';
import UserSelector from 'components/UserSelector';
import SelectField from 'components/SelectField';

export default function ProjectBasicDetail() {

  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const dialog = useDialog();
  const {
          state:       {
                         basic: detail
                       },
          getBasic:    getOne,
          setBasic:    setOne,
          clearBasic:  clearOne,
          updateBasic: update,
        } = useProject();
  const [view, setView] = useState<View>(initView);

  const handler = {
    submit:     (values: any,
                 callback: () => void
                ) => {
      const errors: any = {};
      if (!projectId || !detail) {
        errors.projectId = '프로젝트를 찾을 수 없습니다.';
        throw errors;
      }

      const name: string = values.name;
      if (!name) {
        errors.name = '프로젝트명 입력은 필수입니다.';
      }

      const code: string = values.code;
      if (!code) {
        errors.code = '프로젝트 코드 입력은 필수입니다.';
      }

      const alias: string | undefined = values.alias || undefined;

      const salesManagerId: number = values.salesManagerId;
      if (!salesManagerId) {
        errors.salesManagerId = '영업 담당자 선택은 필수입니다.';
      }

      const projectManagerId: number = values.projectManagerId;
      if (!projectManagerId) {
        errors.projectManagerId = '담당 PM 선택은 필수입니다.';
      }

      const address: string | undefined = values.address || undefined;
      const purpose1: string | undefined = values.purpose1 || undefined;
      const purpose2: string | undefined = values.purpose2 || undefined;
      const lotArea: number | undefined = values.lotArea || undefined;
      const totalArea: number | undefined = values.totalArea || undefined;
      const buildingCount: number | undefined = values.buildingCount || undefined;
      const householdCount: number | undefined = values.householdCount || undefined;
      const floorCount: number | undefined = values.floorCount || undefined;
      const baseCount: number | undefined = values.baseCount || undefined;
      const clientName: string | undefined = values.clientName || undefined;
      const isClientLH: boolean | undefined = values.isClientLH === '' ? undefined : values.isClientLH === '예';
      const clientManager: string | undefined = values.clientManager || undefined;
      const clientPhone: string | undefined = values.clientPhone || undefined;
      const clientEmail: string | undefined = values.clientEmail || undefined;

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      const params: ProjectBasicParameter = {
        name,
        code,
        alias,
        salesManagerId,
        projectManagerId,
        address,
        purpose1,
        purpose2,
        lotArea,
        totalArea,
        buildingCount,
        householdCount,
        floorCount,
        baseCount,
        clientName,
        isClientLH,
        clientManager,
        clientPhone,
        clientEmail
      };

      update(projectId, params, (data) => {
        if (data) {
          dialog.alert('수정하였습니다.', () => {
            setOne(data);
            callback();
          });
        }
      });
    },
    updateView: () => {
      setView({
        name:             detail?.name ?? initView.name,
        code:             detail?.code ?? initView.code,
        alias:            detail?.alias ?? initView.alias,
        salesManagerId:   detail?.salesManager.id ?? initView.salesManagerId,
        projectManagerId: detail?.projectManager.id ?? initView.projectManagerId,
        address:          detail?.address ?? initView.address,
        purpose1:         detail?.purpose1 ?? initView.purpose1,
        purpose2:         detail?.purpose2 ?? initView.purpose2,
        lotArea:          detail?.lotArea ?? initView.lotArea,
        totalArea:        detail?.totalArea ?? initView.totalArea,
        buildingCount:    detail?.buildingCount ?? initView.buildingCount,
        householdCount:   detail?.householdCount ?? initView.householdCount,
        floorCount:       detail?.floorCount ?? initView.floorCount,
        baseCount:        detail?.baseCount ?? initView.baseCount,
        clientName:       detail?.clientName ?? initView.clientName,
        isClientLH:       (detail && typeof detail.isClientLH === 'boolean') ? (detail.isClientLH ? '예' : '아니요') : initView.isClientLH,
        clientManager:    detail?.clientManager ?? initView.clientManager,
        clientPhone:      detail?.clientPhone ?? initView.clientPhone,
        clientEmail:      detail?.clientEmail ?? initView.clientEmail,
      });
    }
  };

  useEffect(() => {
    if (projectId) {
      getOne(projectId);
    }
    return () => {
      clearOne();
    };
  }, [projectId]);

  useEffect(() => {
    handler.updateView();
  }, [detail]);

  return (
    <PageLayout
      title="기본 정보"
      modifiedAt={detail?.modifiedAt}
      body={
        <Grid container spacing={3}>
          <Grid item sm={2}>
            <TextField
              required
              name="code"
              label="프로젝트 코드"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              required
              name="name"
              label="프로젝트명"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name="alias"
              label="프로젝트 닉네임"
              helperText="※최대 5글자"
            />
          </Grid>
          <Grid item sm={2}>
            <UserSelector
              required
              name="salesManagerId"
              label="영업 담당자"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              name="address"
              label="주소"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name="purpose1"
              label="건물 용도1"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name="purpose2"
              label="건물 용도2"
            />
          </Grid>
          <Grid item sm={2}>
            <UserSelector
              required
              name="projectManagerId"
              label="담당 PM"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              type="number"
              name="buildingCount"
              label="총 동 수"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              type="number"
              name="householdCount"
              label="건물 당 세대 수"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              type="number"
              name="floorCount"
              label="층 수"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              type="number"
              name="baseCount"
              label="지하층 수"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              type="number"
              name="lotArea"
              label="대지면적"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              type="number"
              name="totalArea"
              label="연면적"
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              name="clientName"
              label="업체"
            />
          </Grid>
          <Grid item sm={2}>
            <SelectField
              name="isClientLH"
              label="업체 LH 여부"
              options={['예', '아니요']}
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name="clientManager"
              label="업체 담당자"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name="clientPhone"
              label="업체 담당자 핸드폰"
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              name="clientEmail"
              label="업체 담당자 이메일"
            />
          </Grid>
        </Grid>
      }
    />
  );
};

