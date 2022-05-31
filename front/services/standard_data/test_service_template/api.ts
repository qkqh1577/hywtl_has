import apiClient from 'services/common/api';
import {
  TestServiceTemplate,
  TestServiceTemplateChangeSeqParameter,
  TestServiceTemplateParameter,
  TestServiceTemplateQuery,
  TestServiceTemplateShort,
} from 'services/standard_data/test_service_template';

class TestServiceTemplateApi {
  async getList(query: TestServiceTemplateQuery): Promise<TestServiceTemplateShort[]> {
    const { data } = await apiClient.get('/standard-data/test-service-templates', query);
    return data;
  }

  async getOne(id: number): Promise<TestServiceTemplate> {
    const { data } = await apiClient.get(`/standard-data/test-service-templates/${id}`);
    return data;
  }

  async add(params: TestServiceTemplateParameter): Promise<TestServiceTemplate> {
    const { data } = await apiClient.post('/standard-data/test-service-templates', params);
    return data;
  }

  async change(id: number, params: TestServiceTemplateParameter): Promise<void> {
    const { data } = await apiClient.patch(`/standard-data/test-service-templates/${id}`, params);
    return data;
  }

  async changeSeq(params: TestServiceTemplateChangeSeqParameter): Promise<void> {
    const { data } = await apiClient.post('/standard-data/test-service-templates/seq/change', params);
    return data;
  }

  async getSeqList(): Promise<TestServiceTemplateShort[]> {
    const { data } = await apiClient.get('/standard-data/test-service-templates');
    return data;
  }

  async getFullList(query: TestServiceTemplateQuery): Promise<TestServiceTemplate[]> {
    const { data } = await apiClient.get('/standard-data/test-service-templates', {
      type: 'list',
      ...query,
    });
    return data;
  }
}

const testServiceTemplateApi = new TestServiceTemplateApi();
export default testServiceTemplateApi;