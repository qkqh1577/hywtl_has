import {ProjectDbPreset, ProjectDbSchemaVO, ProjectDbVO} from "./domain";
import {createReducer} from "typesafe-actions";
import {ProjectDbAction} from "./action";

export interface ProjectDbState {
    list: ProjectDbVO[],
    schema: ProjectDbSchemaVO[],
    filter: ProjectDbFilter,
    preset: ProjectDbPreset[],
    activePreset?: ProjectDbPreset,
    dynamicSelectState?:{}
}

export interface ProjectDbFilter {
    [entity: string]:  {
        [attr: string]: boolean
    }
}

const initialState: ProjectDbState = {
    list: [],
    schema: [],
    filter: {},
    preset: [],
    dynamicSelectState:{}
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
    }),
    [ProjectDbAction.setActivePreset]: (state, action) => ({
        ...state,
        activePreset: action.payload
    }),
    [ProjectDbAction.openDefaultPreset]: (state, action) => {

        const defaultEntityName = 'ProjectView';

        const initialFilterState : ProjectDbFilter = {};
        const entities: string[] = Object.keys(state.schema);
        entities.map((entityName, index) => {
            const entityInfo = state.schema[entityName];
            const attributes = Object.keys(entityInfo.attributes);
            const initialAttrState = {};
            attributes.map((attributeName, attributeIndex) => {
                const attributeInfo = entityInfo.attributes[attributeName];
                initialAttrState[attributeName] = entityName === defaultEntityName;
            });
            initialFilterState[entityInfo.type] = initialAttrState;
        });

        return {
            ...state,
            filter: initialFilterState,
            activePreset: undefined
        }
    },
    [ProjectDbAction.setDynamicSelectState]: (state, action) =>({
        ...state,
        dynamicSelectState: action.payload
    })

});