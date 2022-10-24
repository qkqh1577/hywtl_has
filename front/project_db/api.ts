import {ProjectDbVO} from "./domain";
import apiClient from "../services/api";
import {ProjectDbQuery} from "./query";

class ProjectDbApi {

    async getList(): Promise<ProjectDbVO[]> {
        const query: ProjectDbQuery = {
            projectEstimate: true,
            projectBid: true,
            projectComplexSite: true,
            projectMemo: true
        };
        const {data} = await apiClient.get('/project/db', query);
        return data;
    }
}

export const projectDbApi = new ProjectDbApi();