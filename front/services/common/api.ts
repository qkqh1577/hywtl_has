import axios from 'axios';
import queryString from 'qs';

export class HttpClient {

  get = async function (url: string, params?: any, config?: any) {
    return await axios.get(url, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        }),
      params,
      ...config,
    });
  };

  post = async function (url: string, params?: FormData | any, config?: any) {
    return await axios.post(url, params, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        }),
      ...config,
    });
  };

  put = async function (url: string, params?: FormData | any, config?: any) {
    return await axios.put(url, params, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        }),
      ...config,
    });
  };

  patch = async function (url: string, params?: FormData | any, config?: any) {
    return await axios.patch(url, params, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        }),
      ...config,

    });
  };

  delete = async function (url: string, params?: any, config?: any) {
    return await axios.patch(url, params, {
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