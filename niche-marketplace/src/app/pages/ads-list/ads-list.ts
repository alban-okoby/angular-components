import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, debounceTime } from 'rxjs';
import { Ad, FilterOptions, AppState } from '../../core/models';
import { loadAds, setFilters } from '../../store/actions/ad.actions';
import { AppButton, AppInput, AppCard } from "../../ui";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ads-list',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppButton, AppInput, AppCard],
  templateUrl: './ads-list.html',
  styleUrl: './ads-list.scss',
})
export class AdsList implements OnInit, OnDestroy {
  ads$: Observable<Ad[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  filters$: Observable<FilterOptions>;
  
  filterForm: FormGroup;
  currentPage = 1;
  itemsPerPage = 12;
  
  private destroy$ = new Subject<void>();
  
  categoryOptions = [
    { value: 'electronics', label: 'Électronique' },
    { value: 'sports', label: 'Sports' },
    { value: 'home', label: 'Maison' },
    { value: 'fashion', label: 'Mode' }
  ];
  
  locationOptions = [
    { value: 'paris', label: 'Paris' },
    { value: 'lyon', label: 'Lyon' },
    { value: 'marseille', label: 'Marseille' },
    { value: 'bordeaux', label: 'Bordeaux' }
  ];
  
  conditionOptions = [
    { value: 'new', label: 'Neuf' },
    { value: 'like_new', label: 'Comme neuf' },
    { value: 'good', label: 'Bon état' },
    { value: 'fair', label: 'État correct' }
  ];

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.ads$ = this.store.select((state:any) => state.ads);
    this.loading$ = this.store.select((state:any) => state.loading);
    this.error$ = this.store.select((state:any) => state.error);
    this.filters$ = this.store.select((state:any) => state.filters);

    this.filterForm = this.fb.group({
      searchQuery: [''],
      category: [''],
      location: [''],
      minPrice: [''],
      maxPrice: [''],
      condition: [[]],
      sortBy: ['recent']
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadAds());
    
    // Synchroniser les filtres avec l'URL
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.filterForm.patchValue(params, { emitEvent: false });
      });
    
    // Débounce les changements de filtres
    this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(filters => {
        this.applyFilters(filters);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilters(filters: FilterOptions): void {
    // Mettre à jour l'URL
    this.router.navigate([], {
      queryParams: filters,
      queryParamsHandling: 'merge'
    });
    
    // Mettre à jour le store
    this.store.dispatch(setFilters({ filters }));
  }

  resetFilters(): void {
    this.filterForm.reset({
      searchQuery: '',
      category: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      condition: [],
      sortBy: 'recent'
    });
  }

  onSortChange(event: Event): void {
    const sortBy = (event.target as HTMLSelectElement).value as any;
    this.filterForm.get('sortBy')?.setValue(sortBy);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    this.currentPage++;
  }

  retry(): void {
    this.store.dispatch(loadAds());
  }
}
