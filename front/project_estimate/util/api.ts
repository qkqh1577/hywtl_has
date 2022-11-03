import { ProjectId } from 'project/domain';
import apiClient from 'services/api';

class DocumentDataApi{
  async getSequenceNumber(id: ProjectId): Promise<number> {
    const { data } = await apiClient.get(`/project/sales/${id}/sequence-number`);
    return data;
  }
}
export const documentDataApi = new DocumentDataApi();
