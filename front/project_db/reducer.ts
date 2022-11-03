import {ProjectDbPreset, ProjectDbSchemaVO, ProjectDbVO} from "./domain";
import {createReducer} from "typesafe-actions";
import {ProjectDbAction} from "./action";

export interface ProjectDbState {
    list: ProjectDbVO[],
    schema: ProjectDbSchemaVO[],
    filter: ProjectDbFilter,
    preset: ProjectDbPreset[]
}

export interface ProjectDbFilter {
    [entity: string]: {
        checked: boolean,
        attributes: {
            [attr: string]: boolean
        }
    }
}

const initialState: ProjectDbState = {
    list: [],
    schema: [],
    filter: {},
    preset: []
};

export const projectDbReducer = createReducer(initialState, {
    [ProjectDbAction.setList]: (state, action) => ({
        ...state,
        list: action.payload
    }),
    [ProjectDbAction.setSchema]: (state, action) => ({
        ...state,
        schema: action.payload
    }),
    [ProjectDbAction.setFilter]: (state, action) => ({
        ...state,
        filter: action.payload
    }),
    [ProjectDbAction.setPresetList]: (state, action) => ({
        ...state,
        preset: action.payload
    })
});