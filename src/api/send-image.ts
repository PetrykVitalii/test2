import HttpClient from './http-client';

export default class SendImage extends HttpClient {
  public constructor() {
    super('');
  }

  public sendImage(url: string, file: any) {
    return this.instance.put(url, file);
  }
}
