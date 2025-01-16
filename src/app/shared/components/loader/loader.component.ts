import {Component, OnInit} from '@angular/core';
import {LoaderService} from "../../services/loader.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnInit {
  public isShowed: boolean = false;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.loaderService.isShowed$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((isShowed: boolean) => {
        this.isShowed = isShowed;
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
