import { createAction, props } from '@ngrx/store';
import { Ad, FilterOptions } from '../../core/models';

// Charger les annonces
export const loadAds = createAction('[Ads] Load Ads');
export const loadAdsSuccess = createAction(
  '[Ads] Load Ads Success',
  props<{ ads: Ad[] }>()
);
export const loadAdsFailure = createAction(
  '[Ads] Load Ads Failure',
  props<{ error: string }>()
);

// Filtres
export const setFilters = createAction(
  '[Ads] Set Filters',
  props<{ filters: FilterOptions }>()
);
export const clearFilters = createAction('[Ads] Clear Filters');

// Annonce sélectionnée
export const selectAd = createAction(
  '[Ads] Select Ad',
  props<{ adId: string }>()
);
export const selectAdSuccess = createAction(
  '[Ads] Select Ad Success',
  props<{ ad: Ad }>()
);

// Créer une annonce
export const createAd = createAction(
  '[Ads] Create Ad',
  props<{ ad: Partial<Ad> }>()
);
export const createAdSuccess = createAction(
  '[Ads] Create Ad Success',
  props<{ ad: Ad }>()
);

// Mettre à jour une annonce
export const updateAd = createAction(
  '[Ads] Update Ad',
  props<{ ad: Ad }>()
);
export const updateAdSuccess = createAction(
  '[Ads] Update Ad Success',
  props<{ ad: Ad }>()
);

// Supprimer une annonce
export const deleteAd = createAction(
  '[Ads] Delete Ad',
  props<{ adId: string }>()
);
export const deleteAdSuccess = createAction(
  '[Ads] Delete Ad Success',
  props<{ adId: string }>()
);