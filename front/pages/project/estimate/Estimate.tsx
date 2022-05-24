import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Container, useDialog } from 'components';
import {
  ProjectEstimateParameter,
  ProjectEstimateView as View,
  initProjectEstimateView as initView,
  useProjectEstimate
} from 'services/project_estimate';

const ProjectEstimateDetail = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const dialog = useDialog();
  const {
    state: {
      detail,
    },
    getOne,
    clearOne,
    upsert,
  } = useProjectEstimate();
  const [view, setView] = useState<View>(initView);

  const handler = {
    submit: (values: any, callback: () => void) => {
      const errors: any = {};
      if (!projectId || !detail) {
        errors.projectId = '프로젝트를 찾을 수 없습니다.';
        throw errors;
      }
      const receivedDate: Date | undefined = values.receivedDate || undefined;
      const figureLevel: string | undefined = values.figureLevel || undefined;
      const testLevel: string | undefined = values.testLevel || undefined;
      const reportLevel: string | undefined = values.reportLevel || undefined;

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      const params: ProjectEstimateParameter = {
        projectId,
        receivedDate: receivedDate ? dayjs(receivedDate).format('YYYY-MM-DD') : undefined,
        figureLevel,
        testLevel,
        reportLevel,
      };

      upsert(params, () => {
        dialog.alert('저장되었습니다.');
        clearOne();
      });
      callback();

    },
    updateView: () => {
      setView({
        receivedDate: detail?.receivedDate ?? view.receivedDate,
        figureLevel: detail?.figureLevel ?? view.figureLevel,
        testLevel: detail?.testLevel ?? view.testLevel,
        reportLevel: detail?.reportLevel ?? view.reportLevel,
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

  useEffect(() => {

  });
  return (
    <Container
      title="견적 기본 정보"
      view={view}
      submit={handler.submit}
      updateView={handler.updateView}
      modifiedAt={detail?.modifiedAt}
      fields={[
        {
          sm: 3,
          type: 'date',
          name: 'receivedDate',
          label: '견적 의뢰 접수일',
        },
        {
          sm: 3,
          type: 'select',
          name: 'figureLevel',
          label: '모형제작 난이도',
          options: ['상', '중상', '중', '중하', '하']
        },
        {
          sm: 3,
          type: 'select',
          name: 'testLevel',
          label: '실험 난이도',
          options: ['상', '중상', '중', '중하', '하']
        },
        {
          sm: 3,
          type: 'select',
          name: 'reportLevel',
          label: '평가 난이도',
          options: ['상', '중상', '중', '중하', '하']
        },
      ]}
    />
  );
};

export default ProjectEstimateDetail;
