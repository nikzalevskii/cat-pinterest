import {Component, OnInit} from '@angular/core';
import {FavoritesService} from "../../shared/services/favorites.service";
import {ICat} from "../../../interfaces/icat";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit{
  favoritesCats: ICat[] = [];
  constructor(private favoriteService:FavoritesService) {
  }

  ngOnInit() {
    this.favoritesCats = this.favoriteService.getFavoritesCats();
    // console.log(this.favoritesCats);
  }


}
