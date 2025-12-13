import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Ad, AppState, Category } from '../../core/models';
import { Observable } from 'rxjs';
import { AppButton, AppCard } from "../../ui";
import { loadAds } from '../../store/actions/ad.actions';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, AppButton, AppCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  recentAds$: Observable<Ad[]>;
  loading$: Observable<boolean>;
  searchQuery = '';
  
  categories: Category[] = [
    { id: 'electronics', name: 'Électronique', slug: 'electronique', icon: '📱', adCount: 124 },
    { id: 'sports', name: 'Sports & Loisirs', slug: 'sports', icon: '⚽', adCount: 89 },
    { id: 'home', name: 'Maison & Jardin', slug: 'maison', icon: '🏠', adCount: 156 },
    { id: 'fashion', name: 'Mode & Accessoires', slug: 'mode', icon: '👕', adCount: 203 },
    { id: 'vehicles', name: 'Véhicules', slug: 'vehicules', icon: '🚗', adCount: 67 },
    { id: 'services', name: 'Services', slug: 'services', icon: '🔧', adCount: 45 }
  ];

  constructor(private store: Store<AppState>) {
    this.recentAds$ = store.select((state:any) => state.ads);
    this.loading$ = store.select((state:any) => state.loading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadAds());
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Navigation vers la page de recherche
    }
  }
}
