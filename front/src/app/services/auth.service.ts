import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, tap, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any | null>(this.getUserFromStorage());
  public user$: Observable<any | null> = this.userSubject.asObservable();

  constructor(private apiService: ApiService, private router: Router) {}

  private getUserFromStorage(): any | null {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  }
  
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  register(userData: any): Observable<any> {
    return this.apiService.post('register', userData).pipe(
      tap(response => this.handleAuth(response))
    );
  }

  login(credentials: any): Observable<any> {
    return this.apiService.post('login', credentials).pipe(
      tap(response => this.handleAuth(response))
    );
  }

  logout(): void {
    if (this.getToken()) {
        this.apiService.post('logout', {}).subscribe({
            next: () => this.clearLocalStorageAndNavigate(),
            error: () => this.clearLocalStorageAndNavigate() // حتی در صورت خطا هم کاربر را خارج کن
        });
    } else {
        this.clearLocalStorageAndNavigate();
    }
  }

  private clearLocalStorageAndNavigate(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  private handleAuth(response: any): void {
    if (response && response.access_token) {
      localStorage.setItem('auth_token', response.access_token);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
      this.userSubject.next(response.user);
    }
  }
}
