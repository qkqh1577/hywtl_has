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
      let buildingCount = 0;
      const buildingNameList: string[] = [];
      for (let i = 0; i < buildingList.length; i++) {
        const building = buildingList[i];
        if (!building.testTypeList || building.testTypeList.length === 0) {
          continue;
        }
        if (building.testTypeList?.includes(testType)) {
          buildingNameList.push(building.name ?? '');
          buildingCount++;
        }
        else {
          buildingNameList.push('');
        }
      }

      return {
        testType,
        buildingCount,
        buildingNameList,
      };
    });

  }, [buildingList]);

  const totalBuildingCount: number = useMemo(() => {
    const buildingNameList: string[] = [];
    buildingTestList
    .map(item => item.buildingNameList)
    .forEach((nameList) => {
      for (let i = 0; i < nameList.length; i++) {
        if (buildingNameList.includes(nameList[i])) {
          continue;
        }
        buildingNameList.push(nameList[i]);
      }
    });

    return buildingNameList.length;
  }, [buildingTestList]);

  const update = useCallback((params: ProjectComplexSiteParameter) => dispatch(projectComplexAction.updateSite(params)), [dispatch]);
  const deleteSite = useCallback((id: ProjectComplexSiteId) => dispatch(projectComplexAction.deleteSite(id)), [dispatch]);
  return (
    <ProjectComplexSiteSection
      onAdd={add}
      list={siteList}
      buildingTestList={buildingTestList}
      totalBuildingCount={totalBuildingCount}
      onUpdate={update}
      onDelete={deleteSite}
    />
  );
}