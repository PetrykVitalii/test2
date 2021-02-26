import { AxiosRequestConfig } from 'axios';
import LocalStorage from '@/utils/local-storage';
import HttpClient from './http-client';

export default abstract class HttpClientProtected extends HttpClient {
  public constructor(baseURL: string) {
    super(baseURL);

    this.initializeRequestInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest);
  };

  private handleRequest = (config: AxiosRequestConfig) => {
    const token = LocalStorage.getAccessToken();

    const modifiedConfig = config;

    modifiedConfig.headers.Authorization = token;

    return config;
  };
}
