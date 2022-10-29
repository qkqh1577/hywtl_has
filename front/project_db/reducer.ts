import {ProjectDbSchemaVO, ProjectDbVO} from "./domain";
import {createReducer} from "typesafe-actions";
import {ProjectDbAction} from "./action";

export interface ProjectDbState {
    list: ProjectDbVO[],
    schema: ProjectDbSchemaVO[]
}

const initialState: ProjectDbState = {
    list: [],
    schema: []
};

export const projectDbReducer = createReducer(initialState, {
    [ProjectDbAction.setList]: (state, action) => ({
        ...state,
        list: action.payload
    }),
    [ProjectDbAction.setSchema]: (state, action) => ({
        ...state,
        schema: action.payload
    })
});