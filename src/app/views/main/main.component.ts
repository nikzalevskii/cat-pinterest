import {Component, HostListener, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {ICat} from "../../../interfaces/icat";
import {selectAllCats} from "../../store/cats/cats.selectors";
import {loadCats, setCatsFromLocalStorage} from "../../store/cats/cats.actions";
import {LOCALE_STORAGE_KEY} from "../../shared/constants/app-constants";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public cats: ICat[] = [];
  public loading: boolean = false;
  public cats$: Observable<ICat[]> = this.store.select(selectAllCats);

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    const storedCats = this.loadCatsFromLocalStorage();
    if (storedCats && storedCats.length > 0) {
      this.store.dispatch(setCatsFromLocalStorage({cats: storedCats}))
    } else {
      this.store.dispatch(loadCats());
    }
  }

  private loadCatsFromLocalStorage() {
    const storedCats = localStorage.getItem(LOCALE_STORAGE_KEY);
    return storedCats ? JSON.parse(storedCats) : [];
  }


  @HostListener('window:scroll', [])
  onScroll():void {
    const scrollPosition:number = window.scrollY + window.innerHeight;
    const pageHeight:number = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 10 && !this.loading) {
      this.store.dispatch(loadCats());
    }
  }


}
