import apiClient from 'services/api';
import {
  DocumentShort,
  DocumentVO
} from 'project/document/domain';
import { ProjectId } from 'project/domain';

class DocumentApi {

  async getList(projectId: ProjectId): Promise<DocumentShort>{
    const { data } = await apiClient.get(`/project/sales/${projectId}/document?type=`, 'received');
    return data;
  }

  async getOne(id: number): Promise<DocumentVO> {
    const { data } = await apiClient.get(`/project/sales/document/${id}`)
    return data;
  }

}

export const documentApi = new DocumentApi();
