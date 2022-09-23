import {
  PersonnelAcademicVO,
  PersonnelBasicVO,
  PersonnelCareerVO,
  PersonnelCompanyVO,
  PersonnelId,
  PersonnelJobVO,
  PersonnelLanguageVO,
  PersonnelLicenseVO,
  PersonnelShortVO,
} from 'personnel/domain';
import apiClient, { toFormData } from 'services/api';
import { PersonnelQuery } from 'personnel/query';
import Page from 'type/Page';
import { PersonnelParameter } from 'personnel/parameter';

class PersonnelApi {
  async getPage(query: PersonnelQuery): Promise<Page<PersonnelShortVO>> {
    const { data } = await apiClient.get('/personnels', query);
    return data;
  }

  async getBasic(id: PersonnelId): Promise<PersonnelBasicVO> {
    const { data } = await apiClient.get(`/personnels/${id}/basic`);
    return data;
  }

  async getCompany(id: PersonnelId): Promise<PersonnelCompanyVO> {
    const { data } = await apiClient.get(`/personnels/${id}/company`);
    return data;
  }

  async getJobList(id: PersonnelId): Promise<PersonnelJobVO[]> {
    const { data } = await apiClient.get(`/personnels/${id}/job-list`);
    return data;
  }

  async getAcademicList(id: PersonnelId): Promise<PersonnelAcademicVO[]> {
    const { data } = await apiClient.get(`/personnels/${id}/academic-list`);
    return data;
  }

  async getCareerList(id: PersonnelId): Promise<PersonnelCareerVO[]> {
    const { data } = await apiClient.get(`/personnels/${id}/career-list`);
    return data;
  }

  async getLicenseList(id: PersonnelId): Promise<PersonnelLicenseVO[]> {
    const { data } = await apiClient.get(`/personnels/${id}/license-list`);
    return data;
  }

  async getLanguageList(id: PersonnelId): Promise<PersonnelLanguageVO[]> {
    const { data } = await apiClient.get(`/personnels/${id}/language-list`);
    return data;
  }

  async update(params: PersonnelParameter): Promise<void> {
    const formData = toFormData(params)
    const { data } = await apiClient.put(`/personnels/${params.id}`, formData);
    return data;
  }
}

export const personnelApi = new PersonnelApi();
