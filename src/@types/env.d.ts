declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    API_URL: string;
    SELL_APP_URL: string;
    PORT: string;
  }
}
