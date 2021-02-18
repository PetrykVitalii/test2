import HttpClientSecret from './http-client-secret';

export default class MainSecret extends HttpClientSecret {
  public constructor() {
    super(process.env.API_URL);
  }

  public sendSecretPhone(phone_number: string, ln?: string) {
    const params = { ln: ln?.toLowerCase() };
    return this.instance.post('/buyer/otp/validate-secret', { phone_number }, { params });
  }
}
