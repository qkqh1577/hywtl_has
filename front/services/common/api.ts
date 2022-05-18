import axios from 'axios';
import queryString from 'qs';

export class HttpClient {

  private client;

  constructor() {
    this.client = axios.create({
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        })
    });
  }

  get = async (url: string, params?: any, config?: any) => {
    return await this.client.get(url, {
      params,
      ...config,
    });
  };

  post = async (url: string, params?: FormData | any, config?: any) => {
    return await this.client.post(url, params, {
      ...config,
    });
  };

  put = async (url: string, params?: FormData | any, config?: any) => {
    return await this.client.put(url, params, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        }),
      ...config,
    });
  };

  patch = async (url: string, params?: FormData | any, config?: any) => {
    return await this.client.patch(url, params, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        }),
      ...config,

    });
  };

  delete = async (url: string, params?: any, config?: any) => {
    return await this.client.delete(url, {
      params: params,
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        }),
      ...config,
    });
  };
}

const apiClient = new HttpClient();
export default apiClient;