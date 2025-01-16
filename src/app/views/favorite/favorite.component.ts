import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICat} from "../../../interfaces/icat";
import {Store} from "@ngrx/store";
import {selectCatsWithLikes} from "../../store/cats/cats.selectors";
import {setCatsFromLocalStorage} from "../../store/cats/cats.actions";
import {Subject, takeUntil} from "rxjs";
import {LOCALE_STORAGE_KEY} from "../../shared/constants/app-constants";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit, OnDestroy {
  public favoritesCats: ICat[] = [];
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store) {
  }

  ngOnInit():void {
    const storedCats:ICat[] = this.loadCatsFromLocalStorage();

    if (storedCats.length > 0) {
      this.store.dispatch(setCatsFromLocalStorage({cats: storedCats}));
    }

    this.store.select(selectCatsWithLikes)
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(
        (cats: ICat[] ):void => {
          this.favoritesCats = cats;
        },
        error => {
          console.error('Ошибка при получении данных:', error);
        }
      );
  }

  ngOnDestroy():void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private loadCatsFromLocalStorage(): ICat[] {
    const storedCats = localStorage.getItem(LOCALE_STORAGE_KEY);
    return storedCats ? JSON.parse(storedCats) : [];
  }

}
