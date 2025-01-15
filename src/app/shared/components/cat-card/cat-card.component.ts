import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ICat} from "../../../../interfaces/icat";
import {FavoritesService} from "../../services/favorites.service";

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.scss']
})
export class CatCardComponent implements OnInit, AfterViewInit {
  @Input() cat!: ICat;
  isLiked: boolean = false;
  isMouseOver: boolean = false;
  isImageHovered: boolean = false;

  constructor(private favoriteService:FavoritesService) {
  }

  ngOnInit() {
    if (this.cat.like) {
      this.isLiked = true;
    }
  }

  ngAfterViewInit() {
    // console.log(this.cat);
  }

  onMouseEnter(): void {
    this.isImageHovered = true;
  }

  onMouseLeave(): void {
    this.isImageHovered = false;
  }

  toggleLike(): void {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.favoriteService.addFavorite(this.cat);
    } else {
      this.favoriteService.removeFromFavorites((this.cat.id))
    }
  }

}
