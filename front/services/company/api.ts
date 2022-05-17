import apiClient from 'services/common/api';
import Page from 'components/Page';
import {
  Company,
  CompanyAddParameter,
  CompanyChangeParameter,
  CompanyDetail,
  CompanyList,
  CompanyQuery,
  CompanyQueryForModal,
} from 'services/company';

export class CompanyApi {
  async getPage(query: CompanyQuery): Promise<Page<CompanyList>> {
    const { data } = await apiClient.get('/companies', query);
    return data;
  }

  async getOne(id: number): Promise<CompanyDetail> {
    const { data } = await apiClient.get(`/companies/${id}`);
    return data;
  }

  async getAll(query: CompanyQueryForModal): Promise<Company[]> {
    const { data } = await apiClient.get('/companies/all', query);
    return data;
  }

  async add(params: CompanyAddParameter): Promise<Company> {
    const { data } = await apiClient.post('/companies', params);
    return data;
  }

  async change(params: CompanyChangeParameter): Promise<Company> {
    const { id, ...rest } = params;
    const { data } = await apiClient.patch(`/companies/${id}`, rest);
    return data;
  }
}

const companyApi = new CompanyApi();
export default companyApi;