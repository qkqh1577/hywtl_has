import {createAction} from "typesafe-actions";
import {ProjectDbVO} from "./domain";

export enum ProjectDbAction {
    requestList = 'project/db/list/request',
    setList = 'project/db/list/set'
}

export const projectDbAction = {
    requestList: createAction(ProjectDbAction.requestList)(),
    setList: createAction(ProjectDbAction.setList)<ProjectDbVO[]>()
};