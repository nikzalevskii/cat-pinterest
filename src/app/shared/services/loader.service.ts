import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isShowed$:Subject<boolean> = new Subject<boolean>();


  show() {
    this.isShowed$.next(true);
  }
  hide() {
    this.isShowed$.next(false);
  }
}
