import React, {useEffect} from 'react';
import {AppRoute} from "../../services/routes";
import ProjectDbPage from "../view/Page";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducer";

import {projectDbAction} from 'project_db/action';

function Element() {

    const dispatch = useDispatch();
    const {list, schema} = useSelector((root: RootState) => root.projectDb);

    useEffect(() => {
        dispatch(projectDbAction.requestList());
        dispatch(projectDbAction.requestSchema());
    }, []);

    return (
        <ProjectDbPage list={list} schema={schema}/>
    )
}

const salesDbPageRoute: AppRoute = {
    path: '/sales-db-analysis',
    element: <Element/>
}

export default salesDbPageRoute;