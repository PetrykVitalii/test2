// eslint-disable-next-line @typescript-eslint/no-unused-vars
import history from 'history';

declare module 'history' {
  interface Location {
    query: {
      [key: string]: string;
    };
  }
}
