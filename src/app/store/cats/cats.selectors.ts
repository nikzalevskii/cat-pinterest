import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CatState} from "./cats.reducer";
import {ICat} from "../../../interfaces/icat";
import {CATS_KEY} from "../../shared/constants/app-constants";

export const selectCatFeature = createFeatureSelector<CatState>(CATS_KEY);


export const selectAllCats = createSelector(
  selectCatFeature,
  state => state.cats.filter((cat, index, self) =>
    self.findIndex(c => c.id === cat.id) === index
  )
);
export const selectCatsSuccess = createSelector(
  selectCatFeature,
  (state:CatState) => state.cats
)

export const selectCatsWithLikes = createSelector(
  selectAllCats,
  (cats: ICat[]) => cats.filter(cat => cat.like)
);

export const selectLoading  = createSelector(
  selectCatFeature,
  (state: CatState) => state.loading
)
export const selectError  = createSelector(
  selectCatFeature,
  (state: CatState) => state.error
)
