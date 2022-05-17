import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, useDialog } from 'components';
import {
  ProjectTargetParameter,
  ProjectTargetView,
  initProjectTarget,
  useProjectTarget,
} from 'services/project_target';

const ProjectTargetDetail = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const dialog = useDialog();
  const {
    state: {
      detail,
    },
    getOne,
    clearOne,
    update,
  } = useProjectTarget();
  const [view, setView] = useState<ProjectTargetView>(initProjectTarget);

  const handler = {
    submit: (values: any, callback: () => void) => {
      const errors: any = {};
      if (!projectId || !detail) {
        errors.projectId = '프로젝트를 찾을 수 없습니다.';
        throw errors;
      }
      const landModelCount: number | undefined = values.landModelCount || undefined;
      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      const params: ProjectTargetParameter = {
        landModelCount,
      };
      update(projectId, params, () => {
        dialog.alert('저장되었습니다.');
      });
      callback();
    },
    updateView: () => {
      setView({
        landModelCount: detail?.landModelCount ?? view.landModelCount,
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
      title="형상비 검토"
      view={view}
      submit={handler.submit}
      updateView={handler.updateView}
      modifiedAt={detail?.modifiedAt}
      fields={[
        {
          sm: 2,
          type: 'number',
          name: 'landModelCount',
          label: '대지모형 개수',
        }
      ]}
    />
  );
};
export default ProjectTargetDetail;
