import axios from 'axios';
import queryString from 'qs';

const isFormData = (params: FormData | any | undefined): params is FormData => {
  return params && (params as FormData).append !== undefined;
};

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
    const h = config && config.headers ? (config.headers as any) : undefined;
    const c = isFormData(params) ? {
      ...config,
      headers: {
        ...h,
        'Content-Type': 'multipart/form-data',
      },
    } : config;
    return await this.client.post(url, params, {
      ...c,
    });
  };

  put = async (url: string, params?: FormData | any, config?: any) => {
    const h = config && config.headers ? (config.headers as any) : undefined;
    const c = isFormData(params) ? {
      ...config,
      headers: {
        ...h,
        'Content-Type': 'multipart/form-data',
      },
    } : config;
    return await this.client.put(url, params, {
      ...c,
    });
  };

  patch = async (url: string, params?: FormData | any, config?: any) => {
    const h = config && config.headers ? (config.headers as any) : undefined;
    const c = isFormData(params) ? {
      ...config,
      headers: {
        ...h,
        'Content-Type': 'multipart/form-data',
      },
    } : config;
    return await this.client.patch(url, params, {
      ...c,
    });
  };

  delete = async (url: string, params?: any, config?: any) => {
    return await this.client.delete(url, {
      params: params,
      ...config,
    });
  };
}

const apiClient = new HttpClient();
export default apiClient;