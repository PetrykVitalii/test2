import { FullItem } from '@/store/reducers/items';
import { LANGUAGES } from '@/store/reducers/language';
import { User, UserInfo, Order } from '@/store/reducers/user';
import { Moment } from 'moment';

enum LOCALS {
  LN = 'LN',
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  PHONE_NUMBER = 'phone_number',
  USER_INFO = 'user_info',
  ORDER = 'order',
  USER_ITEMS = 'user_items',
  CATALOG = 'catalog'
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

  static getLn() {
    const ln = window.localStorage.getItem(LOCALS.LN);

    return ln as LANGUAGES | null;
  }

  static setLn(ln: LANGUAGES) {
    window.localStorage.setItem(LOCALS.LN, ln);
  }

  static clear() {
    window.localStorage.clear();
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

  static getPhoneNumber() {
    const userInfo = this.getUserInfo();
    if (userInfo) {
      const { phoneNumber } = userInfo.user;

      return phoneNumber;
    }
    return null;
  }

  static setPhoneNumber(phoneNumber: string) {
    this.setUserInfo('user', 'phoneNumber', phoneNumber);
  }

  static getUserItems() {
    const user = window.localStorage.getItem(LOCALS.ORDER);

    return user ? JSON.parse(user).items : null;
  }

  static setUserItems(userItems: FullItem[] | null) {
    this.setOrderInfo('items', userItems);
  }

  static setUserItemCount(id: number, count: number) {
    const items = this.getUserItems();
    const newCountItems = items.map((item: FullItem) => {
      const newItem = { ...item };
      if (newItem.id === id) {
        newItem.count = count;
      }
      return newItem;
    });
    this.setOrderInfo('items', newCountItems);
  }

  static setDeleteItem(id: number) {
    const items = this.getUserItems();
    const newCountItems = items.filter((item: FullItem) => +item.id !== id);
    this.setOrderInfo('items', newCountItems);
  }

  static setDeliveryDate(deliveryDate: Moment | null) {
    this.setOrderInfo('deliveryDate', deliveryDate);
  }

  static getDeliveryDate() {
    const user = window.localStorage.getItem(LOCALS.ORDER);

    return user ? JSON.parse(user).deliveryDate : null;
  }

  static setNotesOrder(notes: string) {
    this.setOrderInfo('notesOrder', notes);
  }

  static getNotesOrder() {
    const user = window.localStorage.getItem(LOCALS.ORDER);

    return user ? JSON.parse(user).notesOrder : null;
  }

  static setNotesQuote(notes: string) {
    this.setOrderInfo('notesQuote', notes);
  }

  static getNotesQuote() {
    const user = window.localStorage.getItem(LOCALS.ORDER);

    return user ? JSON.parse(user).notesQuote : null;
  }

  static setCatalogCode(catalogCode: string) {
    this.setOrderInfo('catalogCode', catalogCode);
  }

  static getCatalogCode() {
    const user = window.localStorage.getItem(LOCALS.ORDER);

    return user ? JSON.parse(user).catalogCode : null;
  }

  static getUserInfo() {
    const userInfo = window.localStorage.getItem(LOCALS.ORDER);

    return userInfo ? JSON.parse(userInfo) : null;
  }

  static setOrderInfo(
    mainKey: keyof UserInfo,
    value: string | Moment | null | FullItem[],
  ) {
    const userInfo = this.getUserInfo();

    if (userInfo) {
      userInfo[mainKey] = value;
    }

    window.localStorage.setItem(LOCALS.ORDER, JSON.stringify(userInfo));
  }

  static setUserInfo(
    mainKey: keyof UserInfo,
    key: keyof User | keyof Order,
    value: string | null,
  ) {
    const userInfo = this.getUserInfo();

    if (userInfo) {
      userInfo[mainKey][key] = value;
    }

    window.localStorage.setItem(LOCALS.ORDER, JSON.stringify(userInfo));
  }

  static clearAllOrderInfo() {
    const order = {
      user: {
        adress: '',
        businessName: '',
        city: '',
        fullName: '',
        phoneNumber: '',
        postCode: '',
      },
      items: null,
      catalogCode: '',
      deliveryDate: null,
      notesOrder: '',
      notesQuote: '',
    };
    window.localStorage.setItem(LOCALS.ORDER, JSON.stringify(order));
  }
}
