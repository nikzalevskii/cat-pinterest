import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {
  debounceTime,
  filter, finalize, map,
  Observable,
  Subject,
  switchMap,
  take, takeUntil,
  tap
} from "rxjs";
import {ICat} from "../../../interfaces/icat";
import {selectAllCats, selectLoading} from "../../store/cats/cats.selectors";
import {loadCats, loadCatsSuccess, setCatsFromLocalStorage} from "../../store/cats/cats.actions";
import {DEBOUNCE_TIME, LOCALE_STORAGE_KEY, SCROLL_OFFSET} from "../../shared/constants/app-constants";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public cats$: Observable<ICat[]> = this.store.select(selectAllCats);
  public page: number = 1;
  public limit: number = 15;
  public isLoading: boolean = false;
  private _destroy$: Subject<void> = new Subject<void>();
  private _scrollSubject$:Subject<void> = new Subject<void>();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    const storedCats = this.loadCatsFromLocalStorage();
    if (storedCats && storedCats.length > 0) {
      this.store.dispatch(setCatsFromLocalStorage({ cats: storedCats }));
    } else {
      this.loadMoreCats();
    }
    this.handleScrollEvent();
  }

  ngOnDestroy():void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private loadCatsFromLocalStorage() {
    const storedCats = localStorage.getItem(LOCALE_STORAGE_KEY);
    return storedCats ? JSON.parse(storedCats) : [];
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition: number = window.scrollY + window.innerHeight;
    const pageHeight: number = document.documentElement.scrollHeight;
    if (scrollPosition >= pageHeight - SCROLL_OFFSET) {
      this._scrollSubject$.next();
    }
  }

  private handleScrollEvent(): void {
    this._scrollSubject$
      .pipe(
        takeUntil(this._destroy$),
        debounceTime(DEBOUNCE_TIME),
        filter(() => !this.isLoading),
        tap(() => ( this.isLoading = true)),
        switchMap(() => {
          return this.store.select(selectAllCats).pipe(
            take(1),
            tap(() => this.loadMoreCats()),
            tap(() => (this.isLoading = false))
          );
        })
      )
      .subscribe();
  }

  private loadMoreCats(): void {
    this.store.dispatch(loadCats({page: this.page, limit: this.limit}));
    this.page++;
  }


}
