import { ThunkAction } from 'redux-thunk';
import { CallHistoryMethodAction } from 'connected-react-router';
import { State, Actions, getApiArguments } from '@/store';

type HistoryActions = CallHistoryMethodAction<[string, unknown?]>;
type ExtraArguments = ReturnType<typeof getApiArguments>;

export type AsyncAction<R = void> = ThunkAction<R, State, ExtraArguments, Actions | HistoryActions>;
