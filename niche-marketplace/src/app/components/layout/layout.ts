import { Component, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, AppState } from '../../core/models';
import { RouterOutlet } from "@angular/router";
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, Navbar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  protected readonly title = signal('niche-marketplace');
  user$: Observable<User | null>;
  
  constructor(private store: Store<AppState>) {
    this.user$ = store.select((state:any) => state?.user?.user);
  }
}
