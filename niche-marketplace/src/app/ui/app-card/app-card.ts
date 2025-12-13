import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ad } from '../../core/models';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './app-card.html',
  styleUrl: './app-card.scss',
})
export class AppCard {
  @Input() ad!: Ad;
  @Input() showViews = false;
  
  isFavorite = false;
  
  toggleFavorite(event: Event): void {
    event.stopPropagation();
    this.isFavorite = !this.isFavorite;
  }
}