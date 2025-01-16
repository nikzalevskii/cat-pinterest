import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ICat} from "../../../../interfaces/icat";
import {Store} from "@ngrx/store";
import {toggleLike} from "../../../store/cats/cats.actions";
import {selectCatsWithLikes} from "../../../store/cats/cats.selectors";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.scss']
})
export class CatCardComponent implements OnInit, OnDestroy {
  @Input() cat!: ICat;
  public isLiked: boolean = false;
  public isImageHovered: boolean = false;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(selectCatsWithLikes)
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(
        (cats: ICat[]) => {
          const currentCat = cats.find(c => c.id === this.cat.id);
          if (currentCat) {
            this.isLiked = currentCat.like !== undefined ? currentCat.like : false;
          }
        },
        error => {
          console.error('Ошибка при получении данных:', error);
        }
      )
  }

  ngOnDestroy():void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onMouseEnter(): void {
    this.isImageHovered = true;
  }

  onMouseLeave(): void {
    this.isImageHovered = false;
  }

  toggleLike(): void {
    this.store.dispatch(toggleLike({cat: this.cat}));
  }

}
