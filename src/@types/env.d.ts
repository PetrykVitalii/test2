declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    API_URL: string;
    BASIN_URL: string;
    LANDING_PAGE_URL: string;
    PORT: string;
    LOG_ERROR_TO_SENTRY: '0' | '1';
  }
}
