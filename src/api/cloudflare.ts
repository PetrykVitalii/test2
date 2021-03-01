import HttpClient from './http-client';

export default class CloudflareApi extends HttpClient {
  public constructor() {
    super('https://cloudflare.com/');
  }

  public trace = () => this.instance.get<string>('/cdn-cgi/trace');
}
