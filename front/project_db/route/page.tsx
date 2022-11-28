import React, {useCallback, useEffect} from 'react';
import {AppRoute} from "../../services/routes";
import ProjectDbPage from "../view/Page";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducer";

import {projectDbAction} from 'project_db/action';
import {ProjectDbSearch} from "../reducer";
import dayjs from "dayjs";

function Element() {

    const dispatch = useDispatch();
    const {schema, search} = useSelector((root: RootState) => root.projectDb);

    useEffect(() => {
        dispatch(projectDbAction.requestSchema());
        dispatch(projectDbAction.requestPresetList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(projectDbAction.openDefaultPreset());
    }, [schema]);

    useEffect(() => {
        const initSearch: ProjectDbSearch = search || {
            condition: {},
        };
        dispatch(projectDbAction.requestList(initSearch));
    }, [search]);

    return (
        <ProjectDbPage/>
    )
}

const salesDbPageRoute: AppRoute = {
    path: '/sales-db-analysis',
    element: <Element/>
}

export default salesDbPageRoute;