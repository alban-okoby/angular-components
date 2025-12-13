import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, AppState } from './core/models';
import { Navbar } from "./components";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('niche-marketplace');
  user$: Observable<User | null>;
  
  constructor(private store: Store<AppState>) {
    this.user$ = store.select((state:any) => state?.user?.user);
  }
}
