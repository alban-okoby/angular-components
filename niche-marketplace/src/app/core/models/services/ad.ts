import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Ad, FilterOptions } from '..';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private mockAds: Ad[] = [
    {
      id: '1',
      title: 'Vélo de course professionnel',
      description: 'Vélo de course en excellent état, peu utilisé.',
      price: 850,
      categoryId: 'sports',
      userId: 'user1',
      location: 'Paris',
      coordinates: { lat: 48.8566, lng: 2.3522 },
      images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400'],
      isBoosted: true,
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      viewCount: 245,
      condition: 'good'
    },
    // Ajouter plus d'annonces mockées...
  ];

  constructor(private http: HttpClient) {}

  getAds(filters?: FilterOptions): Observable<Ad[]> {
    let filteredAds = [...this.mockAds];
    
    if (filters?.category) {
      filteredAds = filteredAds.filter(ad => ad.categoryId === filters.category);
    }
    
    if (filters?.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredAds = filteredAds.filter(ad => 
        ad.title.toLowerCase().includes(query) || 
        ad.description.toLowerCase().includes(query)
      );
    }
    
    if (filters?.minPrice) {
      filteredAds = filteredAds.filter(ad => ad.price >= filters.minPrice!);
    }
    
    if (filters?.maxPrice) {
      filteredAds = filteredAds.filter(ad => ad.price <= filters.maxPrice!);
    }
    
    // Tri
    switch (filters?.sortBy) {
      case 'price_asc':
        filteredAds.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredAds.sort((a, b) => b.price - a.price);
        break;
      case 'recent':
        filteredAds.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }
    
    return of(filteredAds).pipe(delay(500)); // Simuler latence réseau
  }

  getAdById(id: string): Observable<Ad> {
    const ad = this.mockAds.find(a => a.id === id);
    if (!ad) {
      throw new Error('Ad not found');
    }
    return of(ad).pipe(delay(300));
  }

  createAd(ad: Partial<Ad>): Observable<Ad> {
    const newAd: Ad = {
      ...ad as Ad,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
      viewCount: 0,
      isActive: true,
      images: ad.images || []
    };
    
    this.mockAds.push(newAd);
    return of(newAd).pipe(delay(500));
  }

  updateAd(ad: Ad): Observable<Ad> {
    const index = this.mockAds.findIndex(a => a.id === ad.id);
    if (index === -1) {
      throw new Error('Ad not found');
    }
    
    this.mockAds[index] = {
      ...ad,
      updatedAt: new Date()
    };
    
    return of(this.mockAds[index]).pipe(delay(500));
  }

  deleteAd(id: string): Observable<void> {
    const index = this.mockAds.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Ad not found');
    }
    
    this.mockAds.splice(index, 1);
    return of(undefined).pipe(delay(300));
  }
}