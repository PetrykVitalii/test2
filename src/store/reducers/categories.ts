import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface IСategory {
  id: number;
  name: string;
  image_url: string;
  thumbnail_url: string;
}

export interface IСategoryState {
  categories: IСategory[];
  isLoading: boolean;
  isComming: boolean;
}

const initialState: IСategoryState = {
  categories: [],
  isLoading: false,
  isComming: false,
};

export class СategoryReducer extends ImmerReducer<IСategoryState> {
  setIsLoading(status: boolean) {
    this.draftState.isLoading = status;
  }

  setIsComming(isComming: boolean) {
    this.draftState.isComming = isComming;
  }

  setСategory(categories: IСategory[]) {
    this.draftState.categories = categories;
  }
}

export default createReducerFunction(СategoryReducer, initialState);
