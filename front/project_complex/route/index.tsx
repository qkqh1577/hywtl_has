import {AppRoute} from 'services/routes';
import React, {useEffect} from 'react';
import ProjectContainerRoute from 'project/route/container';
import ProjectComplexSiteRoute from 'project_complex/route/site';
import {
    useDispatch,
} from 'react-redux';
import useId from 'services/useId';
import {projectComplexAction} from 'project_complex/action';
import {ProjectId} from 'project/domain';
import ProjectComplexBuildingRoute from 'project_complex/route/building';
import ProjectComplexBuildingFileModalRoute from 'project_complex/route/buildingFileModal';

function Element() {
    const dispatch = useDispatch();
    const id = useId();

    useEffect(() => {
        return ()=>{
            dispatch(projectComplexAction.setSiteList(undefined));
            dispatch(projectComplexAction.setBuildingList(undefined));
            dispatch(projectComplexAction.setTestDetail(undefined));
        }
    }, []);

    useEffect(() => {
        id && dispatch(projectComplexAction.setId(ProjectId(id)));
    }, [id]);

    return (
        <ProjectContainerRoute>
            <ProjectComplexSiteRoute/>
            <ProjectComplexBuildingRoute/>
            <ProjectComplexBuildingFileModalRoute/>
        </ProjectContainerRoute>
    );
}

const projectComplexRoute: AppRoute = {
    path: '/project/sales-management/:id/complex',
    element: <Element/>
};
export default projectComplexRoute;