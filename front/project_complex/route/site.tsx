import ProjectComplexSiteSection from 'project_complex/view/Site';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useMemo
} from 'react';
import useDialog from 'components/Dialog';
import { projectComplexAction } from 'project_complex/action';
import {
  ProjectComplexSiteParameter
} from 'project_complex/parameter';
import { ProjectComplexSiteId } from 'project_complex/domain';
import {
  TestType,
  testTypeList
} from 'admin/estimate/content/domain';

export interface BuildingTest {
  testType: TestType;
  buildingCount: number;
  buildingNameList: string[];
}

export default function ProjectComplexSiteRoute() {

  const dispatch = useDispatch();
  const { id, siteList, buildingList } = useSelector((root: RootState) => root.projectComplex);
  const { error } = useDialog();

  const add = useCallback(() => {
    if (!id) {
      error('프로젝트가 선택되지 않았습니다.');
      return;
    }
    dispatch(projectComplexAction.pushSite());
  }, [dispatch, id]);

  const buildingTestList: BuildingTest[] = useMemo(() => {
    if (!buildingList || buildingList.length === 0) {
      return [];
    }
    return testTypeList
    .filter((testType) => {
      for (let i = 0; i < buildingList.length; i++) {
        if (buildingList[i].testTypeList?.includes(testType)) {
          return true;
        }
      }
      return false;
    })
    .map((testType) => {
      const result: string[] = [];
      for (let i = 0; i < buildingList.length; i++) {
        if (buildingList[i].testTypeList?.includes(testType)) {
          result.push(buildingList[i].name ?? '');
        }
        else {
          result.push('');
        }
      }

      return {
        testType,
        buildingCount:    result.length,
        buildingNameList: result,
      };
    });

  }, [buildingList]);

  const update = useCallback((params: ProjectComplexSiteParameter) => dispatch(projectComplexAction.updateSite(params)), [dispatch]);
  const deleteSite = useCallback((id: ProjectComplexSiteId) => dispatch(projectComplexAction.deleteSite(id)), [dispatch]);
  return (
    <ProjectComplexSiteSection
      onAdd={add}
      list={siteList}
      buildingTestList={buildingTestList}
      onUpdate={update}
      onDelete={deleteSite}
    />
  );
}