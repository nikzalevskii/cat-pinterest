import {ICat} from "../../../interfaces/icat";
import {createReducer, on} from "@ngrx/store";
import {loadCats, loadCatsFailure, loadCatsSuccess, setCatsFromLocalStorage, toggleLike} from "./cats.actions";


export interface CatState {
  cats: ICat[],
  loading: boolean,
  error: any
}

export const initialState: CatState = {
  cats: [],
  loading: false,
  error: null
}

export const catsReducer = createReducer(
  initialState,
  on(loadCats, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(setCatsFromLocalStorage, (state, {cats}) => ({
    ...state,
    cats: [...cats],
    loading: false,
    error: null
  })),
  on(loadCatsSuccess, (state, {cats}) => ({
    ...state,
    cats: [...state.cats, ...cats],
    loading: false,
    error: null
  })),
  on(loadCatsFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error: true
  })),
  on(toggleLike, (state, { cat}) => ({
    ...state,
    cats: state.cats.map(c =>
      c.id === cat.id ? { ...c, like: !c.like } : c
    )
  }))
)
