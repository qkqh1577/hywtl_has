import {ProjectDbPreset, ProjectDbSchemaVO, ProjectDbVO} from "./domain";
import {createReducer} from "typesafe-actions";
import {ProjectDbAction} from "./action";
import {Dayjs} from "dayjs";

export interface ProjectDbState {
    list: ProjectDbVO[],
    loading: boolean,
    schema: ProjectDbSchemaVO[],
    filter: ProjectDbFilter,
    search?: ProjectDbSearch,
    preset: ProjectDbPreset[],
    activePreset?: ProjectDbPreset,
    dynamicSelectState?:{}
}

export interface ProjectDbSearch {
    condition: ProjectDbSearchCondition,
    from?: Dayjs,
    to?: Dayjs,
}

export interface ProjectDbSearchCondition {
    [any: string]: ProjectSearchKV[]
};

export interface ProjectSearchKV {
    key: string,
    value: string | number | boolean,
}

export interface ProjectDbFilter {
    [entity: string]:  {
        [attr: string]: boolean
    }
}

const initialState: ProjectDbState = {
    list: [],
    loading: false,
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
    [ProjectDbAction.setLoading]: (state, action) => ({
        ...state,
        loading: action.payload
    }),
    [ProjectDbAction.setSchema]: (state, action) => ({
        ...state,
        schema: action.payload
    }),
    [ProjectDbAction.setFilter]: (state, action) => ({
        ...state,
        filter: action.payload
    }),
    [ProjectDbAction.setSearch]: (state, action) => ({
        ...state,
        search: action.payload
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