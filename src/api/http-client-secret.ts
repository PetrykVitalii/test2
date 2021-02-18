import { AxiosRequestConfig } from 'axios';
import { CreateHeader, CreateKey } from '@/utils/secret';
import HttpClient from './http-client';

export default abstract class HttpClientSecret extends HttpClient {
  public constructor(baseURL: string) {
    super(baseURL);

    this.initializeRequestInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest);
  };

  private handleRequest = (config: AxiosRequestConfig) => {
    const modifiedConfig = config;

    modifiedConfig.headers[CreateKey()] = CreateHeader();

    return config;
  };
}
