import axios from 'axios';
import queryString from 'qs';

const isFormData = (parameter: FormData | any | undefined): parameter is FormData => {
  return parameter && (parameter as FormData).append !== undefined;
};

export class HttpClient {

  private client;

  constructor() {
    this.client = axios.create({
      paramsSerializer: (parameter: any) =>
                          queryString.stringify(parameter, {
                            arrayFormat: 'brackets',
                            encode:      true,
                          })
    });
  }

  get = async (url: string,
               parameter?: any,
               config?: any
  ) => {
    return await this.client.get(url, {
      params: parameter,
      ...config,
    });
  };

  post = async (url: string,
                parameter?: FormData | any,
                config?: any
  ) => {
    const h = config && config.headers ? (config.headers as any) : undefined;
    const c = isFormData(parameter) ? {
      ...config,
      headers: {
        ...h,
        'Content-Type': 'multipart/form-data',
      },
    } : config;
    return await this.client.post(url, parameter, {
      ...c,
    });
  };

  put = async (url: string,
               parameter?: FormData | any,
               config?: any
  ) => {
    const h = config && config.headers ? (config.headers as any) : undefined;
    const c = isFormData(parameter) ? {
      ...config,
      headers: {
        ...h,
        'Content-Type': 'multipart/form-data',
      },
    } : config;
    return await this.client.put(url, parameter, {
      ...c,
    });
  };

  patch = async (url: string,
                 parameter?: FormData | any,
                 config?: any
  ) => {
    const h = config && config.headers ? (config.headers as any) : undefined;
    const c = isFormData(parameter) ? {
      ...config,
      headers: {
        ...h,
        'Content-Type': 'multipart/form-data',
      },
    } : config;
    return await this.client.patch(url, parameter, {
      ...c,
    });
  };

  delete = async (url: string,
                  parameter?: any,
                  config?: any
  ) => {
    return await this.client.delete(url, {
      params: parameter,
      ...config,
    });
  };
}

const apiClient = new HttpClient();
export default apiClient;