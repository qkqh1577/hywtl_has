import {createAction} from "typesafe-actions";
import {ProjectDbPreset, ProjectDbSchemaVO, ProjectDbVO} from "./domain";
import {ProjectDbFilter, ProjectDbSearch} from "./reducer";

export enum ProjectDbAction {
    requestList = 'project/db/list/request',
    setList = 'project/db/list/set',
    setLoading = 'project/db/loading',
    requestSchema = 'project/db/schema/request',
    setSchema = 'project/db/schema/set',
    setFilter = 'project/db/filter/set',
    setSearch = 'project/db/search',

    requestPresetList = 'project/db/preset/request',
    setPresetList = 'project/db/preset/set',
    addPreset = 'project/db/preset/add',
    removePreset = 'project/db/preset/remove',
    changePreset = 'project/db/preset/change',

    setActivePreset = 'project/db/preset/active',
    openDefaultPreset = 'project/db/preset/default',
    setDynamicSelectState = 'project/db/dynamic/select/set'
}

export const projectDbAction = {
    requestList: createAction(ProjectDbAction.requestList)<ProjectDbSearch>(),
    setList: createAction(ProjectDbAction.setList)<ProjectDbVO[]>(),
    setLoading: createAction(ProjectDbAction.setLoading)<boolean>(),
    requestSchema: createAction(ProjectDbAction.requestSchema)(),
    setSchema: createAction(ProjectDbAction.setSchema)<ProjectDbSchemaVO[]>(),
    setFilter: createAction(ProjectDbAction.setFilter)<ProjectDbFilter>(),
    setSearch: createAction(ProjectDbAction.setSearch)<ProjectDbSearch>(),

    requestPresetList: createAction(ProjectDbAction.requestPresetList)(),
    setPresetList: createAction(ProjectDbAction.setPresetList)<ProjectDbPreset[]>(),
    addPreset: createAction(ProjectDbAction.addPreset)<ProjectDbPreset>(),
    removePreset: createAction(ProjectDbAction.removePreset)<number>(),
    changePreset: createAction(ProjectDbAction.changePreset)<number, ProjectDbFilter>(),

    setActivePreset: createAction(ProjectDbAction.setActivePreset)<ProjectDbPreset | undefined>(),
    openDefaultPreset: createAction(ProjectDbAction.openDefaultPreset)(),
    setDynamicSelectState: createAction(ProjectDbAction.setDynamicSelectState)<object>()
};