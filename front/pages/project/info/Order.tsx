import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Container, useDialog } from 'components';
import {
  ProjectOrderParameter,
  ProjectOrderView as View,
  initProjectOrderView as initView,
  useProject,
} from 'services/project';

const ProjectOrderDetail = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const dialog = useDialog();
  const {
    state: {
      order: detail
    },
    getOrder: getOne,
    setOrder: setOne,
    clearOrder: clearOne,
    updateOrder: update
  } = useProject();
  const [view, setView] = useState<View>(initView);

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
          dialog.alert('수정하였습니다.', () => {
            setOne(data);
            callback();
          });
        }
      }));
    },
    updateView: () => {
      setView({
        amount: detail?.amount ?? initView.amount,
        receivedDate: detail?.receivedDate ?? initView.receivedDate,
        beginDate: detail?.beginDate ?? initView.beginDate,
        closeDate: detail?.closeDate ?? initView.closeDate,
        isOnGoing: (detail && typeof detail.isOnGoing === 'boolean') ?
          (detail.isOnGoing ? '예' : '아니요') : initView.isOnGoing
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
      modifiedAt={detail?.modifiedAt}
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