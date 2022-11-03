import {ProjectDbPreset, ProjectDbSchemaVO, ProjectDbVO} from "./domain";
import apiClient from "../services/api";
import {ProjectDbQuery} from "./query";
import {ProjectDbFilter} from "./reducer";

interface ProjectDbPresetRawVO {
    id: number,
    name: string,
    preset: string
}

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

    async getPresetList(): Promise<ProjectDbPreset[]> {
        const {data} = await apiClient.get('/project/db/preset');
        const result: ProjectDbPreset[] = [];
        data && data.map(rawPreset => {
            const preset: ProjectDbPreset = {
                id: rawPreset.id,
                name: rawPreset.name,
                filter: JSON.parse(rawPreset.preset)
            }
            result.push(preset);
        });
        return result;
    }

    async savePreset(preset: ProjectDbPreset): Promise<void> {
        console.debug(preset);
        const presetRaw: ProjectDbPresetRawVO = {
            id: preset.id,
            name: preset.name,
            preset: JSON.stringify(preset.filter)
        };
        const {data} = await apiClient.post('/project/db/preset', presetRaw);
        console.debug(data);
        return data;
    }

    async removePreset(presetId: number): Promise<void> {
        const {data} = await apiClient.delete(`/project/db/preset/${presetId}`);
        return data;
    }

}

export const projectDbApi = new ProjectDbApi();