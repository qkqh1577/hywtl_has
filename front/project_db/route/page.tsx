import React, {useCallback, useEffect} from 'react';
import {AppRoute} from "../../services/routes";
import ProjectDbPage from "../view/Page";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducer";

import {projectDbAction} from 'project_db/action';
import {ProjectDbFilter} from "../reducer";

function Element() {

    const dispatch = useDispatch();
    const {schema, filter} = useSelector((root: RootState) => root.projectDb);

    useEffect(() => {
        dispatch(projectDbAction.requestList({
            filter: {},
            search: {}
        }));
        dispatch(projectDbAction.requestSchema());
        dispatch(projectDbAction.requestPresetList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(projectDbAction.openDefaultPreset());
    }, [schema]);

    return (
        <ProjectDbPage/>
    )
}

const salesDbPageRoute: AppRoute = {
    path: '/sales-db-analysis',
    element: <Element/>
}

export default salesDbPageRoute;