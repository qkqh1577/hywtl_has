import {AppRoute} from 'services/routes';
import React, {useEffect} from 'react';
import ProjectContainerRoute from 'project/route/container';
import ProjectComplexSiteRoute from 'project_complex/route/site';
import {
    useDispatch, useSelector,
} from 'react-redux';
import useId from 'services/useId';
import {projectComplexAction} from 'project_complex/action';
import {ProjectId} from 'project/domain';
import ProjectComplexBuildingRoute from 'project_complex/route/building';
import ProjectComplexBuildingFileModalRoute from 'project_complex/route/buildingFileModal';
import {RootState} from "../../services/reducer";

function Element() {
    const dispatch = useDispatch();
    const {siteListLoading, buildingListLoading} = useSelector((root: RootState) => root.projectComplex);
    const id = useId();

    useEffect(() => {
        id && dispatch(projectComplexAction.setId(ProjectId(id)));
        return () => {
            dispatch(projectComplexAction.setSiteList(undefined));
            dispatch(projectComplexAction.setBuildingList(undefined));
            dispatch(projectComplexAction.setTestDetail(undefined));
        }
    }, [id]);

    return (
        <ProjectContainerRoute>
            <ProjectComplexSiteRoute loading={siteListLoading}/>
            <ProjectComplexBuildingRoute loading={buildingListLoading}/>
            <ProjectComplexBuildingFileModalRoute/>
        </ProjectContainerRoute>
    );
}

const projectComplexRoute: AppRoute = {
    path: '/project/sales-management/:id/complex',
    element: <Element/>
};
export default projectComplexRoute;