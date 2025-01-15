import {Component, HostListener, OnInit} from '@angular/core';
import {CatService} from "../../shared/services/cat.service";
import {map, switchMap} from "rxjs";
import {ICat} from "../../../interfaces/icat";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  cats:ICat[] = [];
  loading:boolean = false;
  page:number = 1;
  limit:number = 15;
  hasMore:boolean = true;

  constructor(private catService: CatService) {
  }

  ngOnInit(): void {
    const storedCats = JSON.parse(localStorage.getItem('cats') || '[]');
    if (storedCats.length > 0) {
      this.cats = storedCats;
    } else {
      this.fetchCats();
    }
    // console.log(this.cats);
  }

  fetchCats(): void {
    if (!this.hasMore || this.loading) return;

    this.loading = true;
    this.catService.getCats(this.page, this.limit)
      .pipe(
        map((newCats:ICat[]) => {
          this.page++;
          return newCats;
        })
      )
      .subscribe((newCats:ICat[]) => {
        if (newCats.length < this.limit) {
          this.hasMore = false;
        }
        const newCatsFiltered = newCats.filter(newCat => !this.cats.some(cat => cat.id === newCat.id));

        this.cats = [...this.cats, ...newCatsFiltered];
        this.loading = false;
        localStorage.setItem('cats', JSON.stringify(this.cats));
        console.log('Коты успешно загружены:', this.cats);
      })
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 10 && !this.loading) {
      this.fetchCats();
    }
  }


}
