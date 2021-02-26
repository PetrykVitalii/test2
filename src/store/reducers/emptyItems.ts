/* eslint-disable no-param-reassign */
import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { v4 as uuidv4 } from 'uuid';
import { Unit } from './units';

export interface Item {
  id: string;
  title: string;
  name: string;
  unit: Unit;
  price: string;
  customUnit: string;
  code: string;
  description: string;
  images: string;
}

export interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: [],
};

export class EmptyItemsReducer extends ImmerReducer<ItemsState> {
  addEmptyItem() {
    this.draftState.items = [
      ...this.draftState.items,
      {
        id: uuidv4(),
        title: `${this.draftState.items.length + 1}`,
        name: '',
        unit: {
          name: '',
          id: 0,
        },
        price: '',
        customUnit: '',
        code: '',
        description: '',
        images: '',
      },
    ];
  }

  changeUnit(id: string, value: Unit) {
    this.draftState.items.forEach((item) => {
      if (item.id === id) item.unit = value;
    });
  }

  changeInfo(key: keyof Pick<Item, 'name' | 'code' | 'customUnit' | 'description' | 'images' | 'price' | 'id' >, id: string, value: string) {
    this.draftState.items.forEach((item) => {
      if (item.id === id) item[key] = value;
    });
  }

  deleteItem(idToDel: string) {
    this.draftState.items = this.draftState.items
      .filter((item) => item.id !== idToDel)
      .map((item, idx) => ({
        ...item,
        title: `${idx + 1}`,
      }));
  }

  clearItems() {
    this.draftState.items = [];
  }
}

export default createReducerFunction(EmptyItemsReducer, initialState);
