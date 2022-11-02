import React, {useEffect} from 'react';
import {AppRoute} from "../../services/routes";
import ProjectDbPage from "../view/Page";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducer";

import {projectDbAction} from 'project_db/action';

function Element() {

    const dispatch = useDispatch();
    const {list, schema, filter} = useSelector((root: RootState) => root.projectDb);

    useEffect(() => {
        dispatch(projectDbAction.requestList());
        dispatch(projectDbAction.requestSchema());
    }, [dispatch]);

    useEffect(() => {
        //TODO: LOAD INITIAL FILTER STATE (CURRENT: RANDOM DATA)
        const initialFilterState = {};
        const entities: string[] = Object.keys(schema);
        entities.map((entityName, index) => {
            const entityInfo = schema[entityName];
            const attributes = Object.keys(entityInfo.attributes);
            const initialAttrState = {};
            attributes.map((attributeName, attributeIndex) => {
                const attributeInfo = entityInfo.attributes[attributeName];
                //initialAttrState[attributeName] = attributeIndex % 2 === 0;
                initialAttrState[attributeName] = true;
            });
            initialFilterState[entityInfo.type] = {
                checked: true,
                attributes: initialAttrState
            };
        });
        dispatch(projectDbAction.setFilter(initialFilterState));
    }, [schema]);

    return (
        <ProjectDbPage list={list} schema={schema} filter={filter}/>
    )
}

const salesDbPageRoute: AppRoute = {
    path: '/sales-db-analysis',
    element: <Element/>
}

export default salesDbPageRoute;