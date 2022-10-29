import {createAction} from "typesafe-actions";
import {ProjectDbSchemaVO, ProjectDbVO} from "./domain";

export enum ProjectDbAction {
    requestList = 'project/db/list/request',
    setList = 'project/db/list/set',
    requestSchema = 'project/db/schema/request',
    setSchema = 'project/db/schema/set'
}

export const projectDbAction = {
    requestList: createAction(ProjectDbAction.requestList)(),
    setList: createAction(ProjectDbAction.setList)<ProjectDbVO[]>(),
    requestSchema: createAction(ProjectDbAction.requestSchema)(),
    setSchema: createAction(ProjectDbAction.setSchema)<ProjectDbSchemaVO[]>()
};