import {ProjectDbVO} from "./domain";
import {createReducer} from "typesafe-actions";
import {ProjectDbAction} from "./action";

export interface ProjectDbState {
    list: ProjectDbVO[],
}

const initialState: ProjectDbState = {
    list: []
};

export const projectDbReducer = createReducer(initialState, {
    [ProjectDbAction.setList]: (state, action) => ({
        ...state,
        list: action.payload
    })
});