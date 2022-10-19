import { ProjectId } from 'project/domain';
import apiClient from 'services/api';
import { RivalBidParameter } from 'rival_bid/parameter';
import {
  RivalBidId,
  RivalBidVO
} from 'rival_bid/domain';

class RivalBidApi {
  async getList(projectId: ProjectId): Promise<RivalBidVO[]> {
    const { data } = await apiClient.get(`/project/sales/${projectId}/rival-bid`);
    return data;
  }

  async push(projectId: ProjectId): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${projectId}/rival-bid`);
    return data;
  }

  async update(params: RivalBidParameter): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/rival-bid/${params.id}`, params);
    return data;
  }

  async deleteOne(id: RivalBidId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/rival-bid/${id}`);
    return data;
  }
}

export const rivalBidApi = new RivalBidApi();