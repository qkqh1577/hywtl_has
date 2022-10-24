import {ProjectVO} from "../project/domain";
import {ProjectEstimateVO} from "../project_estimate/domain";
import {ProjectComplexSiteVO} from "../project_complex/domain";
import {ProjectBidVO} from "../project_bid/domain";
import {ProjectMemoVO} from "../project_memo/domain";

export interface ProjectDbVO {
    project: ProjectVO,
    projectBid?: ProjectBidVO,
    projectComplexSite?: ProjectComplexSiteVO,
    projectEstimate?: ProjectEstimateVO,
    projectMemo?: ProjectMemoVO
}