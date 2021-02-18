/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import moment from 'moment';
import { FullItem } from './items';

export interface UserState {
  user: User;
  userItems: FullItem[];
  order: Order;
  isLoading: boolean;
}

export interface UserInfo {
  user: User;
  items: FullItem[] | null;
  catalogCode: string;
  notesOrder: string;
  notesQuote: string;
  deliveryDate: null | moment.Moment;
}

export interface User {
  fullName: string;
  phoneNumber: string;
  city: string;
  postCode: string;
  adress: string;
  businessName: string;
}

export interface Order {
  notesQuote: string;
  deliveryDate: null | moment.Moment;
  notesOrder: string;
}

const initialState: UserState = {
  user: {
    fullName: '',
    phoneNumber: '',
    city: '',
    postCode: '',
    adress: '',
    businessName: '',
  },
  order: {
    notesOrder: '',
    notesQuote: '',
    deliveryDate: null,
  },
  userItems: [],
  isLoading: false,
};

export class UserReducer extends ImmerReducer<UserState> {
  setOrder(order: Order) {
    this.draftState.order = order;
  }

  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }

  setUser(user: User) {
    this.draftState.user = user;
  }

  setUserInfo(
    businessName: string,
    fullName: string,
    city: string,
    postCode: string,
    adress: string,
  ) {
    this.draftState.user.businessName = businessName;
    this.draftState.user.fullName = fullName;
    this.draftState.user.city = city;
    this.draftState.user.postCode = postCode;
    this.draftState.user.adress = adress;
  }

  changeInfo(key: keyof User, value: string) {
    this.draftState.user[key] = value;
  }

  changeCity(value: string) {
    this.draftState.user.city = value;
  }

  deleteItem(id: number) {
    const index = this.draftState.userItems.findIndex((item) => item.id === id);
    this.draftState.userItems.splice(index, 1);
  }

  changeOrderDate(date: moment.Moment | null) {
    this.draftState.order.deliveryDate = date;
  }

  setNotesOrder(value: string) {
    this.draftState.order.notesOrder = value;
  }

  setNotesQuote(value: string) {
    this.draftState.order.notesQuote = value;
  }

  setUserItems(value: FullItem[]) {
    this.draftState.userItems = value;
  }

  counter(isStatus: boolean, id: number) {
    this.draftState.userItems.forEach((item: FullItem) => {
      if (item.id === id) {
        if (item.count !== undefined) {
          isStatus ? (item.count += 1) : (item.count -= 1);
        }
      }
    });
  }

  setCount(id: number, count: number) {
    this.draftState.userItems.forEach((item: FullItem) => {
      if (item.id === id) {
        if (item.count !== undefined) {
          item.count = +count;
        }
      }
    });
  }

  clearCounter() {
    this.draftState.userItems.forEach((item: FullItem) => {
      item.count = 1;
    });
  }

  clearAllUserInfo() {
    this.draftState = {
      user: {
        fullName: '',
        phoneNumber: '',
        city: '',
        postCode: '',
        adress: '',
        businessName: '',
      },
      order: {
        notesQuote: '',
        notesOrder: '',
        deliveryDate: null,
      },
      userItems: [],
      isLoading: false,
    };
  }
}

export default createReducerFunction(UserReducer, initialState);
