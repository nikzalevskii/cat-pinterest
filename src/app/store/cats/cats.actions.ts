import {createAction, props} from "@ngrx/store";
import {ICat} from "../../../interfaces/icat";

export const loadCats = createAction(
  '[CAT] Load Cats',
  props<{ page:number, limit:number }>()
);
export const loadCatsSuccess= createAction('[CAT] Load Cats Success', props<{cats: ICat[]}>());
export const loadCatsFailure = createAction('[CAT] Load Cats Failure', props<{error: any}>());
export const toggleLike = createAction('[Cats] Toggle Like', props<{ cat: ICat }>());
export const setCatsFromLocalStorage = createAction(
  '[Cats] Set Cats From Local Storage',
  props<{ cats: ICat[] }>()
);
