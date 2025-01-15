import { Injectable } from '@angular/core';
import {ICat} from "../../../interfaces/icat";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoriteCats: ICat[] = [];
  private allCats: ICat[] = [];

  private storageKey = 'favoritesCats';
  constructor() {
    const storedFavorites = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const storedAllCats = JSON.parse(localStorage.getItem('cats') || '[]');
    if (storedFavorites.length > 0) {
      this.favoriteCats = storedFavorites;
    }
    this.allCats = storedAllCats;
  }

  addFavorite(cat:ICat):void {
    if (!this.isFavorite(cat)) {
      this.updateCatLike(cat.id, true);
      this.favoriteCats.push({...cat, like: true});
      this.syncToLocalStorage();
    }
  }

  removeFromFavorites(catId:string) {
    this.updateCatLike(catId, false);
    this.favoriteCats = this.favoriteCats.filter((cat:ICat) => cat.id !== catId)
    this.syncToLocalStorage();
  }

  updateCatLike(id: string, likeStatus: boolean): void {
    const catIndex = this.allCats.findIndex(cat => cat.id === id);
    if (catIndex !== -1) {
      this.allCats[catIndex].like = likeStatus;
      localStorage.setItem('cats', JSON.stringify(this.allCats));  // Обновляем localStorage
    }
  }

  isFavorite(cat: ICat): boolean {
    return this.favoriteCats.some((fav: ICat) => fav.id === cat.id && fav.like);
  }

  getFavoritesCats():ICat[] {
    return this.favoriteCats;
  }

  private syncToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.favoriteCats));
  }



}
