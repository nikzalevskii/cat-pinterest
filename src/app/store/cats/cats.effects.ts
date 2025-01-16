import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CatService} from "../../shared/services/cat.service";
import {loadCats, loadCatsFailure, loadCatsSuccess, toggleLike} from "./cats.actions";
import {catchError, map, mergeMap, Observable, of, tap} from "rxjs";
import {Action} from "@ngrx/store";
import {ICat} from "../../../interfaces/icat";
import {LOCALE_STORAGE_KEY} from "../../shared/constants/app-constants";

@Injectable()
export class CatsEffects {
  public page: number = 1;
  public limit: number = 15;

  constructor(private action$: Actions, private catService: CatService) {
  }

  loadCats$ = createEffect((): Observable<Action> => {
    return this.action$.pipe(
      ofType(loadCats),
      mergeMap(() =>
        this.catService.fetchCats(this.page, this.limit).pipe(
          map((cats: ICat[]) => {
            const storedCats = JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY) || '[]');
            const updatedCats: ICat[] = [...storedCats, ...cats];
            localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(updatedCats))
            return loadCatsSuccess({cats: updatedCats})
          }),
          catchError(error => of(loadCatsFailure({error})))
        )
      )
    )
  })

  toggleLike$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(toggleLike),
        tap(({cat}) => {
          const currentCats = JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY) || '[]');
          const updateCats = currentCats.map((c:ICat) =>
          c.id === cat.id ? {...c, like: !c.like} : c
          );
         localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(updateCats));
        })
      ),
    {dispatch : false})


}
