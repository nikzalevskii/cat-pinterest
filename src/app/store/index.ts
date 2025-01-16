import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {catsReducer, CatState} from "./cats/cats.reducer";
import {CATS_KEY} from "../shared/constants/app-constants";

export interface State {
  [CATS_KEY]: CatState;
}
export const reducers: ActionReducerMap<State> = {
  [CATS_KEY]: catsReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
