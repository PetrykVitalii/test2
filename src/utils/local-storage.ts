import { LANGUAGES } from '@/store/reducers/language';
import { IUtm } from '@/store/actions/utm-tracking';

export enum LOCALS {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  LN = 'LN',
  UTM = 'UTM',
  PWA = 'pwa'
}

export default class LocalStorage {
  static transit() {
    this.transitHKtoZH();
  }

  static transitHKtoZH() {
    const currentLN = LocalStorage.getLn() as string;

    if (currentLN === 'HK') {
      LocalStorage.setLn(LANGUAGES.ZH);
    }
  }

  static getAccessToken() {
    const accessToken = window.localStorage.getItem(LOCALS.ACCESS_TOKEN);

    return accessToken;
  }

  static setAccessToken(accessToken: string) {
    window.localStorage.setItem(LOCALS.ACCESS_TOKEN, accessToken);
  }

  static getRefreshToken() {
    const refreshToken = window.localStorage.getItem(LOCALS.REFRESH_TOKEN);

    return refreshToken;
  }

  static setRefreshToken(refreshToken: string) {
    window.localStorage.setItem(LOCALS.REFRESH_TOKEN, refreshToken);
  }

  static getLn() {
    const ln = window.localStorage.getItem(LOCALS.LN);

    return ln as LANGUAGES | null;
  }

  static setLn(ln: LANGUAGES) {
    window.localStorage.setItem(LOCALS.LN, ln);
  }

  static getUTM() {
    const stringifiedUtms = window.localStorage.getItem(LOCALS.UTM);

    if (!stringifiedUtms) return null;

    const utms = JSON.parse(stringifiedUtms);

    return utms as IUtm;
  }

  static setUTM(utm: IUtm) {
    const stringifiedUtms = JSON.stringify(utm);

    window.localStorage.setItem(LOCALS.UTM, stringifiedUtms);
  }

  static getHasPwa() {
    const hasPwa = window.localStorage.getItem(LOCALS.PWA);

    return hasPwa === 'true';
  }

  static setHasPwa(hasPwa: boolean) {
    window.localStorage.setItem(LOCALS.PWA, String(hasPwa));
  }

  static clearByKey(key: LOCALS) {
    window.localStorage.removeItem(key);
  }
}
