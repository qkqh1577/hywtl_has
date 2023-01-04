import {ProjectDbPreset, ProjectDbSchemaVO, ProjectDbVO} from "./domain";
import apiClient from "../services/api";
import {ProjectDbQuery} from "./query";
import {ProjectDbSearch} from "./reducer";


interface ProjectDbPresetRawVO {
    id: number,
    name: string,
    preset: string
}

class ProjectDbApi {

    async getList(searchState: ProjectDbSearch): Promise<ProjectDbVO[]> {
        const keys = {};
        const values = {};

        searchState.condition && Object.keys(searchState.condition).forEach(entityName => {
            if(!keys[entityName]) keys[entityName] = [];
            if(!values[entityName]) values[entityName] = [];

            searchState.condition[entityName].forEach(value => {
                keys[entityName].push(value.key);
                values[entityName].push(value.value);
            });
        });

        const query: ProjectDbQuery = {
            projectEstimate: true,
            projectBid: true,
            projectComplexSite: true,
            projectContract: true,
            projectMemo: false,
            search: searchState.condition,
            searchFrom: searchState.from?.format("YYYY-MM-DD"),
            searchTo: searchState.to?.format("YYYY-MM-DD"),
            keys: keys,
            values: values
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
        const presetRaw: ProjectDbPresetRawVO = {
            id: preset.id,
            name: preset.name,
            preset: JSON.stringify(preset.filter)
        };
        const {data} = await apiClient.post('/project/db/preset', presetRaw);
        return data;
    }

    async removePreset(presetId: number): Promise<void> {
        const {data} = await apiClient.delete(`/project/db/preset/${presetId}`);
        return data;
    }

}

export const projectDbApi = new ProjectDbApi();