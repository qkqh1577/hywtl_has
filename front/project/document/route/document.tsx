import React, { useEffect } from 'react';
import { AppRoute } from 'services/routes';
import useId from 'services/useId';
import ProjectContainer from 'project/route/container';
import ProjectDocument from 'project/document/view';
import {
  documentAction,
} from 'project/document/action';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';

function Element() {
  const id = useId();
  const dispatch = useDispatch();

  const { receivedList, sentList, buildingList } = useSelector((root: RootState) => root.projectDocument);

  useEffect(() => {
      if (id) {
        dispatch(documentAction.setAllList(id));
      }
    }, [id]
  );


  return (
    <ProjectContainer>
      <ProjectDocument
        receivedList={receivedList}
        sentList={sentList}
        buildingList={buildingList}
      />
    </ProjectContainer>
  );
}

const projectDocumentRoute: AppRoute = {
  path:    '/project/sales-management/:id/document',
  element: <Element />
};

export default projectDocumentRoute;
