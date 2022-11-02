import {ProjectDbSchemaVO, ProjectDbVO} from "./domain";
import apiClient from "../services/api";
import {ProjectDbQuery} from "./query";

class ProjectDbApi {

    async getList(): Promise<ProjectDbVO[]> {
        const query: ProjectDbQuery = {
            projectEstimate: true,
            projectBid: true,
            projectComplexSite: true,
            projectMemo: false
        };
        const {data} = await apiClient.get('/project/db', query);
        return data;
    }

    async getSchema(): Promise<ProjectDbSchemaVO[]> {
        const {data} = await apiClient.get('/project/db/schema');
        return data['entities'];
    }

}

export const projectDbApi = new ProjectDbApi();