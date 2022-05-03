import Company, {ListCompany} from "./entity";
import apiClient from "services/common/api";
import {CompanyQuery} from "./parameters";
import Page from "components/Page";

export class CompanyApi {
  async getPage(query: CompanyQuery): Promise<Page<ListCompany>> {
    const { data } = await apiClient.get('/companies', query);
    return data;
  }

  async getOne(id: number): Promise<Company> {
    const { data } = await apiClient.get(`/companies/${id}`);
    return data;
  }
}

const companyApi = new CompanyApi();
export default companyApi;