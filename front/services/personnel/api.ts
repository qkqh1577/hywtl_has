import apiClient from 'services/common/api';
import Page from 'components/Page';
import {
  ListPersonnel,
  Personnel,
  PersonnelAcademic,
  PersonnelBasic,
  PersonnelCareer,
  PersonnelCompany,
  PersonnelJob,
  PersonnelLanguage,
  PersonnelLicense,
  PersonnelParameter,
  PersonnelQuery,
} from 'services/personnel';

export class PersonnelApi {
  async getPage(query: PersonnelQuery): Promise<Page<ListPersonnel>> {
    const { data } = await apiClient.get('/personnels', query);
    return data;
  }

  async getBasic(id: number): Promise<PersonnelBasic> {
    const { data } = await apiClient.get(`/personnels/${id}/basic`);
    return data;
  }

  async getCompany(id: number): Promise<PersonnelCompany> {
    const { data } = await apiClient.get(`/personnels/${id}/company`);
    return data;
  }

  async getJob(id: number): Promise<PersonnelJob> {
    const { data } = await apiClient.get(`/personnels/${id}/job`);
    return data;
  }

  async getJobList(id: number): Promise<PersonnelJob[]> {
    const { data } = await apiClient.get(`/personnels/${id}/job-list`);
    return data;
  }

  async getAcademicList(id: number): Promise<PersonnelAcademic[]> {
    const { data } = await apiClient.get(`/personnels/${id}/academic-list`);
    return data;
  }

  async getCareerList(id: number): Promise<PersonnelCareer[]> {
    const { data } = await apiClient.get(`/personnels/${id}/career-list`);
    return data;
  }

  async getLicenseList(id: number): Promise<PersonnelLicense[]> {
    const { data } = await apiClient.get(`/personnels/${id}/license-list`);
    return data;
  }

  async getLanguageList(id: number): Promise<PersonnelLanguage[]> {
    const { data } = await apiClient.get(`/personnels/${id}/language-list`);
    return data;
  }

  async update(params: PersonnelParameter): Promise<Personnel> {
    const {
      id,
      jobList,
      company,
      basic: { image, ...basicRest },
      academicList,
      careerList,
      licenseList,
      ...rest
    } = params;
    const form = new FormData();
    setFormData(rest, form);

    setFormData(basicRest, form, 'basic');
    if (image) {
      const fileItem: any = image;
      if (typeof fileItem.id !== 'undefined') form.append('basic.image.id', fileItem.id);
      if (typeof fileItem.requestDelete !== 'undefined') form.append('basic.image.requestDelete', fileItem.requestDelete);
      if (typeof fileItem.multipartFile !== 'undefined') form.append('basic.image.multipartFile', fileItem.multipartFile);
    }

    setFormData(company, form, 'company');

    jobList.forEach((item, i) => {
      setFormData(jobList[i], form, `jobList[${i}]`);
    });

    if (academicList) academicList.forEach((item, i) => {
      setFormData(academicList[i], form, `academicList[${i}]`);
    });

    if (careerList) careerList.forEach((item, i) => {
      setFormData(careerList[i], form, `careerList[${i}]`);
    });

    if (licenseList) licenseList.forEach((item, i) => {
      setFormData(licenseList[i], form, `licenseList[${i}]`);
    });


    const { data } = await apiClient.put(`/personnels/${id}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    return data;
  }
}

const setFormData = (obj: any, form: FormData, prefix?: string) => {
  Object.keys(obj).forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value === null || value === undefined || Number.isNaN(value)) {
        return;
      }
      if (typeof value !== 'object' && value !== '') {
        form.append(prefix ? `${prefix}.${key}` : key, value);
      }
    }
  });
};

const personnelApi = new PersonnelApi();
export default personnelApi;
