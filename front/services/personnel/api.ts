import axios from 'axios';
import Personnel from 'services/personnel/entity';
import { PersonnelAddParameter, PersonnelChangeParameter } from 'services/personnel/parameter';
import queryString from 'qs';

const append = (params: any, form: FormData, prefix?: string) => {
  Object.keys(params).forEach((key) => {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      if (typeof value !== 'undefined' && value !== null) {
        form.append(prefix ? `${prefix}.${key}` : key, value);
      }
    }
  });
};

export class PersonnelApi {
  async getOne(id: number): Promise<Personnel> {
    const { data } = await axios.get(`/personnels/${id}`);
    return data;
  }

  async add(params: PersonnelAddParameter): Promise<Personnel> {

    const form = new FormData();
    form.append('userId', `${params.userId}`);
    append(params.basic as any, form, 'basic');
    const { data } = await axios.post('personnels', form, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        })
    });
    return data;
  }

  async change(params: PersonnelChangeParameter): Promise<Personnel> {
    const { id, ...rest } = params;
    const form = new FormData();
    append(rest, form, 'basic');
    const { data } = await axios.patch(`personnels/${id}`, form, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        })
    });
    return data;
  }
}

const personnelApi = new PersonnelApi();
export default personnelApi;
