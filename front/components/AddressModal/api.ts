import axios from 'axios';
import { AddressQuery } from 'components/AddressModal/query';
import {
  API_KEY,
  COUNT_PER_PAGE,
  URL
} from 'components/AddressModal/domain';

class AddressModalApi {
  async searchAddress(query: AddressQuery): Promise<void> {
    const { data } = await axios.post(
      `${URL}?confmKey=${API_KEY}&currentPage=${query.page}&countPerPage=${COUNT_PER_PAGE}&resultType=json&keyword=${query.keyword}`);

    return data;
  }
}

export const addressModalApi = new AddressModalApi();
