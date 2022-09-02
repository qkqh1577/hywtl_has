import axios from 'axios';
import queryString from 'qs';

const isFormData = (parameter: FormData | any | undefined): parameter is FormData => {
  return parameter && (parameter as FormData).append !== undefined;
};

type Parameter = {
  [key: string]: any;
}

export function toFormData(parameter: Parameter,
                           prefix?: string,
                           formData?: FormData
): FormData {
  const result = formData ?? new FormData();
  const keys = Object.keys(parameter);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = parameter[key];
    if (typeof value === 'undefined' || value === null || Number.isNaN(value) || value === '') {
      continue;
    }
    const name = prefix ? `${prefix}.${key}` : key;
    if (value instanceof File || value instanceof Blob) {
      result.append(name, value);
      continue;
    }
    if (typeof value === 'object') {
      console.log(name, value);
      toFormData(value, name, result);
      continue;
    }
    result.append(name, value);
  }
  return result;
}

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