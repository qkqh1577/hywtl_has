import {createAction} from "typesafe-actions";
import {ProjectDbPreset, ProjectDbSchemaVO, ProjectDbVO} from "./domain";
import {ProjectDbFilter} from "./reducer";

export enum ProjectDbAction {
    requestList = 'project/db/list/request',
    setList = 'project/db/list/set',
    requestSchema = 'project/db/schema/request',
    setSchema = 'project/db/schema/set',
    setFilter = 'project/db/filger/set',

    requestPresetList = 'project/db/preset/request',
    setPresetList = 'project/db/preset/set',
    addPreset = 'project/db/preset/add',
    removePreset = 'project/db/preset/remove',
    changePreset = 'project/db/preset/change'
}

export const projectDbAction = {
    requestList: createAction(ProjectDbAction.requestList)(),
    setList: createAction(ProjectDbAction.setList)<ProjectDbVO[]>(),
    requestSchema: createAction(ProjectDbAction.requestSchema)(),
    setSchema: createAction(ProjectDbAction.setSchema)<ProjectDbSchemaVO[]>(),
    setFilter: createAction(ProjectDbAction.setFilter)<ProjectDbFilter>(),

    requestPresetList: createAction(ProjectDbAction.requestPresetList)(),
    setPresetList: createAction(ProjectDbAction.setPresetList)<ProjectDbPreset[]>(),
    addPreset: createAction(ProjectDbAction.addPreset)<ProjectDbPreset>(),
    removePreset: createAction(ProjectDbAction.removePreset)<number>(),
    changePreset: createAction(ProjectDbAction.changePreset)<number, ProjectDbFilter>(),
};