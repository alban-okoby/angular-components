import { createReducer, on } from '@ngrx/store';
import * as AdActions from '../actions/ad.actions';
import { Ad, FilterOptions } from '../../core/models';

export const initialAdState:  any = {
  ads: [],
  selectedAd: null,
  filters: {
    sortBy: 'recent'
  },
  loading: false,
  error: null
};

export const adReducer = createReducer(
  initialAdState,
  
  on(AdActions.loadAds, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(AdActions.loadAdsSuccess, (state, { ads }) => ({
    ...state,
    ads,
    loading: false
  })),
  
  on(AdActions.loadAdsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  on(AdActions.setFilters, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters }
  })),
  
  on(AdActions.clearFilters, state => ({
    ...state,
    filters: { sortBy: 'recent' }
  })),
  
  on(AdActions.selectAdSuccess, (state, { ad }) => ({
    ...state,
    selectedAd: ad
  })),
  
  on(AdActions.createAdSuccess, (state, { ad }) => ({
    ...state,
    ads: [...state.ads, ad]
  })),
  
  on(AdActions.updateAdSuccess, (state, { ad }) => ({
    ...state,
    ads: state.ads.map((a:any) => a.id === ad.id ? ad : a),
    selectedAd: state.selectedAd?.id === ad.id ? ad : state.selectedAd
  })),
  
  on(AdActions.deleteAdSuccess, (state, { adId }) => ({
    ...state,
    ads: state.ads.filter((ad:any) => ad.id !== adId),
    selectedAd: state.selectedAd?.id === adId ? null : state.selectedAd
  }))
);