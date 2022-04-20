import axios from 'axios';
import Personnel from 'services/personnel/entity';
import { PersonnelParameter } from 'services/personnel/parameter';

export class PersonnelApi {
  async getOne(id: number): Promise<Personnel> {
    const { data } = await axios.get(`/personnels/${id}`);
    return data;
  }

  async update(params: PersonnelParameter): Promise<Personnel> {
    const {
      id,
      jobList,
      company,
      basic: { image, ...basicRest },
      academicList,
      ...rest
    } = params;
    const form = new FormData();
    setFormData(rest, form);

    setFormData(basicRest, form, 'basic');
    if (image) setFormData(image, form, 'basic.image');

    setFormData(company, form, 'company');

    jobList.forEach((item, i) => {
      setFormData(jobList[i], form, `jobList[${i}]`);
    });

    if (academicList) academicList.forEach((item, i) => {
      setFormData(academicList[i], form, `academicList[${i}]`);
    });


    const { data } = await axios.put(`/personnels/${id}`, form, {
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
