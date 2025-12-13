import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from '../../core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private mockUser: User = {
    id: 'user1',
    email: 'john@example.com',
    username: 'johndoe',
    fullName: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    phone: '+33123456789',
    location: 'Paris',
    rating: 4.8,
    memberSince: new Date('2023-01-15'),
    isAdmin: false
  };

  constructor(private router: Router) {
    // Simuler un utilisateur connecté
    setTimeout(() => {
      this.currentUserSubject.next(this.mockUser);
    }, 1000);
  }

  login(email: string, password: string): Observable<User> {
    // Simulation de login
    return of(this.mockUser).pipe(
      delay(1000),
      map(user => {
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  register(userData: Partial<User>): Observable<User> {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email!,
      username: userData.username!,
      fullName: userData.fullName!,
      avatar: userData.avatar,
      phone: userData.phone,
      location: userData.location || 'Paris',
      rating: 0,
      memberSince: new Date(),
      isAdmin: false
    };
    
    return of(newUser).pipe(
      delay(1000),
      map(user => {
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) {
      throw new Error('No user logged in');
    }
    
    const updatedUser = { ...currentUser, ...userData };
    this.currentUserSubject.next(updatedUser);
    
    return of(updatedUser).pipe(delay(500));
  }
}