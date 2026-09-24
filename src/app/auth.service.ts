import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './user.model';
import { UserDAO } from './user-dao.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionKey = 'yerbashop.session';
  private readonly userSubject = new BehaviorSubject<User | null>(this.readSession());
  readonly user$ = this.userSubject.asObservable();

  constructor(private userDAO: UserDAO, private http: HttpClient) {}

  me(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/me`).pipe(tap(user => this.userSubject.next({ ...user, wishlist: user.wishlist || [] })));
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  register(nombre: string, email: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, { nombre, email, password }).pipe(tap(response => this.setSession(response)), map(response => response.user));
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password }).pipe(tap(response => this.setSession(response)), map(response => response.user));
  }

  logout(): void {
    if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(this.sessionKey);
    this.userSubject.next(null);
  }

  updateUser(user: User): User {
    this.setSession({ token: this.readToken(), user });
    return user;
  }

  toggleWishlist(productId: string): void {
    const user = this.currentUser;
    if (!user) return;
    const wishlist = user.wishlist.includes(productId)
      ? user.wishlist.filter(id => id !== productId)
      : [...user.wishlist, productId];
    this.updateUser({ ...user, wishlist });
  }

  private setSession(response: any): void {
    const safeUser = { ...response.user, wishlist: response.user.wishlist || [] };
    delete safeUser.password;
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(this.sessionKey, JSON.stringify({ token: response.token, user: safeUser }));
    }
    this.userSubject.next(safeUser);
  }

  private readToken(): string {
    if (typeof sessionStorage === 'undefined') return '';
    try { return JSON.parse(sessionStorage.getItem(this.sessionKey) || '{}').token || ''; } catch { return ''; }
  }

  private readSession(): User | null {
    if (typeof sessionStorage === 'undefined') return null;
    try {
      return JSON.parse(sessionStorage.getItem(this.sessionKey) || 'null')?.user || null;
    } catch {
      return null;
    }
  }
}
