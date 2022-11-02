import {createAction} from "typesafe-actions";
import {ProjectDbSchemaVO, ProjectDbVO} from "./domain";
import {ProjectDbFilter} from "./reducer";

export enum ProjectDbAction {
    requestList = 'project/db/list/request',
    setList = 'project/db/list/set',
    requestSchema = 'project/db/schema/request',
    setSchema = 'project/db/schema/set',
    setFilter = 'project/db/filger/set'
}

export const projectDbAction = {
    requestList: createAction(ProjectDbAction.requestList)(),
    setList: createAction(ProjectDbAction.setList)<ProjectDbVO[]>(),
    requestSchema: createAction(ProjectDbAction.requestSchema)(),
    setSchema: createAction(ProjectDbAction.setSchema)<ProjectDbSchemaVO[]>(),
    setFilter: createAction(ProjectDbAction.setFilter)<ProjectDbFilter>()
};