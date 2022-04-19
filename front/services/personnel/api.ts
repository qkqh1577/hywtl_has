import axios from 'axios';
import Personnel from 'services/personnel/entity';
import { PersonnelParameter } from 'services/personnel/parameter';

export class PersonnelApi {
  async getOne(id: number): Promise<Personnel> {
    const { data } = await axios.get(`/personnels/${id}`);
    return data;
  }

  async update(params: PersonnelParameter): Promise<Personnel> {
    const { id, ...rest } = params;
    const form = new FormData();
    const basic: any = rest.basic as any;
    if (basic.engName) form.append('basic.engName', basic.engName);
    if (basic.birthDate) form.append('basic.birthDate', basic.birthDate);
    if (basic.sex) form.append('basic.sex', basic.sex);
    if (basic.image?.id) form.append('basic.image.id', basic.image.id);
    if (basic.image?.requestDelete) form.append('basic.image.requestDelete', basic.image.requestDelete);
    if (basic.image?.multipartFile) form.append('basic.image.multipartFile', basic.image.multipartFile as Blob);
    if (basic.address) form.append('basic.address', basic.address);
    if (basic.phone) form.append('basic.phone', basic.phone);
    if (basic.emergencyPhone) form.append('basic.emergencyPhone', basic.emergencyPhone);
    if (basic.relationship) form.append('basic.relationship', basic.relationship);
    if (basic.personalEmail) form.append('basic.personalEmail', basic.personalEmail);

    const { data } = await axios.put(`/personnels/${id}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    return data;
  }
}

const personnelApi = new PersonnelApi();
export default personnelApi;
