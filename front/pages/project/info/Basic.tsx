import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'components';
import useProject from 'services/project/hook';
import { initProjectBasic, ProjectBasicView } from 'services/project/view';
import { ProjectBasicParameter } from 'services/project/parameter';

const ProjectBasicDetail = () => {

  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const {
    projectState: {
      basic: detail
    },
    getBasic: getOne,
    setBasic: setOne,
    clearBasic: clearOne,
    updateBasic: update,
  } = useProject();
  const [view, setView] = useState<ProjectBasicView>(initProjectBasic);

  const handler = {
    submit: (values: any, callback: () => void) => {
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
          window.alert('수정하였습니다.');
          setOne(data);
          callback();
        }
      });
    },
    updateView: () => {
      setView({
        name: detail?.name ?? view.name,
        code: detail?.code ?? view.code,
        alias: detail?.alias ?? view.alias,
        salesManagerId: detail?.salesManager.id ?? view.salesManagerId,
        projectManagerId: detail?.projectManager.id ?? view.projectManagerId,
        address: detail?.address ?? view.address,
        purpose1: detail?.purpose1 ?? view.purpose1,
        purpose2: detail?.purpose2 ?? view.purpose2,
        lotArea: detail?.lotArea ?? view.lotArea,
        totalArea: detail?.totalArea ?? view.totalArea,
        buildingCount: detail?.buildingCount ?? view.buildingCount,
        householdCount: detail?.householdCount ?? view.householdCount,
        floorCount: detail?.floorCount ?? view.floorCount,
        baseCount: detail?.baseCount ?? view.baseCount,
        clientName: detail?.clientName ?? view.clientName,
        isClientLH: (detail && typeof detail.isClientLH === 'boolean') ? (detail.isClientLH ? '예' : '아니요') : view.isClientLH,
        clientManager: detail?.clientManager ?? view.clientManager,
        clientPhone: detail?.clientPhone ?? view.clientPhone,
        clientEmail: detail?.clientEmail ?? view.clientEmail,
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
    <Container
      title="기본 정보"
      view={view}
      submit={handler.submit}
      updatedTime={detail?.updatedTime}
      updateView={handler.updateView}
      fields={[
        {
          sm: 2,
          name: 'code',
          label: '프로젝트 코드',
          required: true
        },
        {
          sm: 6,
          name: 'name',
          label: '프로젝트명',
          required: true,
        },
        {
          sm: 2,
          name: 'alias',
          label: '프로젝트 닉네임',
          helperText: '※최대 5글자',
        },
        {
          sm: 2,
          type: 'user',
          name: 'salesManagerId',
          label: '영업 담당자',
          required: true,
        },
        {
          sm: 6,
          name: 'address',
          label: '주소',
        },
        {
          sm: 2,
          name: 'purpose1',
          label: '건물 용도1',
        },
        {
          sm: 2,
          name: 'purpose2',
          label: '건물 용도1',
        },
        {
          sm: 2,
          type: 'user',
          name: 'projectManagerId',
          label: '담당 PM',
          required: true,
        },
        {
          sm: 2,
          type: 'number',
          name: 'buildingCount',
          label: '총 동 수',
        },
        {
          sm: 2,
          type: 'number',
          name: 'householdCount',
          label: '건물 당 세대 수',
        },
        {
          sm: 2,
          type: 'number',
          name: 'floorCount',
          label: '층 수',
        },
        {
          sm: 2,
          type: 'number',
          name: 'baseCount',
          label: '지하층 수',
        },
        {
          sm: 2,
          type: 'number',
          name: 'lotArea',
          label: '대지면적',
        },
        {
          sm: 2,
          type: 'number',
          name: 'totalArea',
          label: '연면적',
        },
        {
          sm: 3,
          type: 'number',
          name: 'clientName',
          label: '업체',
        },
        {
          sm: 2,
          type: 'select',
          name: 'isClientLH',
          label: '업체 LH 여부',
          options: ['예', '아니요'],
        },
        {
          sm: 2,
          name: 'clientManager',
          label: '업체 담당자',
        },
        {
          sm: 2,
          name: 'clientPhone',
          label: '업체 담당자 핸드폰',
        },
        {
          sm: 3,
          name: 'clientEmail',
          label: '업체 담당자 이메일',
        }
      ]}
    />
  );


};

export default ProjectBasicDetail;
