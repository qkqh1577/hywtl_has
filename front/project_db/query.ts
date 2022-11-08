import {ProjectDbSearchItems} from "./view/Page/form";

export interface ProjectDbQuery {
    projectBid?: boolean,
    projectComplexSite?: boolean,
    projectEstimate?: boolean,
    projectMemo?: boolean,
    search?: ProjectDbSearchItems,
    keys?: any,
    values?: any
}