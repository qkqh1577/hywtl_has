import React, {useCallback, useEffect} from 'react';
import {AppRoute} from "../../services/routes";
import ProjectDbPage from "../view/Page";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducer";

import {projectDbAction} from 'project_db/action';
import {ProjectDbFilter} from "../reducer";

function Element() {

    const dispatch = useDispatch();
    const {schema} = useSelector((root: RootState) => root.projectDb);
    const setFilter = useCallback((filterState: ProjectDbFilter) => {
        dispatch(projectDbAction.setFilter(filterState));
    }, [schema]);

    useEffect(() => {
        dispatch(projectDbAction.requestList());
        dispatch(projectDbAction.requestSchema());
        dispatch(projectDbAction.requestPresetList());
    }, [dispatch]);

    useEffect(() => {
        //TODO: LOAD INITIAL FILTER STATE
        const initialFilterState = {};
        const entities: string[] = Object.keys(schema);
        entities.map((entityName, index) => {
            const entityInfo = schema[entityName];
            const attributes = Object.keys(entityInfo.attributes);
            const initialAttrState = {};
            attributes.map((attributeName, attributeIndex) => {
                const attributeInfo = entityInfo.attributes[attributeName];
                initialAttrState[attributeName] = entityName === 'project';
            });

            initialFilterState[entityInfo.type] = {
                checked: entityName === 'project',
                attributes: initialAttrState
            };
        });
        setFilter(initialFilterState);
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