import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProject from 'services/project/hook';
import { initProjectOrder, ProjectOrderView } from 'services/project/view';
import { ProjectOrderParameter } from 'services/project/parameter';
import { Container } from 'components';
import dayjs from 'dayjs';

const ProjectOrderDetail = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const {
    projectState: {
      order: detail
    },
    getOrder: getOne,
    setOrder: setOne,
    clearOrder: clearOne,
    updateOrder: update
  } = useProject();
  const [view, setView] = useState<ProjectOrderView>(initProjectOrder);

  const handler = {
    submit: (values: any, callback: () => void) => {
      const errors: any = {};
      if (!projectId || !detail) {
        errors.projectId = '프로젝트를 찾을 수 없습니다.';
        throw errors;
      }

      const amount: number | undefined = values.amount || undefined;
      if (amount && amount < 0) {
        errors.amount = '금액은 음수가 될 수 없습니다.';
      }

      const receivedDate: string | undefined = values.receivedDate ? dayjs(values.receivedDate).format('YYYY-MM-DD') : undefined;
      const beginDate: string | undefined = values.beginDate ? dayjs(values.beginDate).format('YYYY-MM-DD') : undefined;
      const closeDate: string | undefined = values.closeDate ? dayjs(values.closeDate).format('YYYY-MM-DD') : undefined;
      const isOnGoing: boolean | undefined =
        typeof values.isOnGoing === 'string' && values.isOnGoing !== '' ?
          values.isOnGoing === '예' : undefined;

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      const params: ProjectOrderParameter = {
        amount,
        receivedDate,
        beginDate,
        closeDate,
        isOnGoing
      };

      update(projectId, params, ((data) => {
        if (data) {
          window.alert('수정하였습니다.');
          setOne(data);
          callback();
        }
      }));
    },
    updateView: () => {
      setView({
        amount: detail?.amount ?? view.amount,
        receivedDate: detail?.receivedDate ?? view.receivedDate,
        beginDate: detail?.beginDate ?? view.beginDate,
        closeDate: detail?.closeDate ?? view.closeDate,
        isOnGoing: (detail && typeof detail.isOnGoing === 'boolean') ?
          (detail.isOnGoing ? '예' : '아니요') : view.isOnGoing
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
      title="프로젝트 주요 정보"
      view={view}
      submit={handler.submit}
      updateView={handler.updateView}
      updatedTime={detail?.updatedTime}
      fields={[
        {
          sm: 3,
          type: 'amount',
          name: 'amount',
          label: '총 수주 금액',

        },
        {
          sm: 2,
          type: 'date',
          name: 'receivedDate',
          label: '수주일',
        },
        {
          sm: 2,
          type: 'date',
          name: 'beginDate',
          label: '착수일',
        },
        {
          sm: 2,
          type: 'date',
          name: 'closeDate',
          label: '마감일',
        },
        {
          sm: 2,
          type: 'select',
          name: 'isOnGoing',
          label: '수주 적용 여부',
          options: ['예', '아니요']
        }
      ]}
    />
  );
};

export default ProjectOrderDetail;
