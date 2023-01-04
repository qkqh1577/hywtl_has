import {ProjectDbSearchCondition} from "./reducer";

export interface ProjectDbQuery {
    projectBid?: boolean,
    projectComplexSite?: boolean,
    projectEstimate?: boolean,
    projectMemo?: boolean,
    projectContract?: boolean,
    search?: ProjectDbSearchCondition,
    searchFrom?: string,
    searchTo?: string,
    keys?: any,
    values?: any
}