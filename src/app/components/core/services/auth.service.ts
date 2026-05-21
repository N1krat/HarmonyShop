import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/login';

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  private userEmail = new BehaviorSubject<string | null>(null);
  userEmail$ = this.userEmail.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    this.loggedIn.next(!!token); 
    if (email) this.userEmail.next(email);
  }
}


  login(credentials: { email: string; password: string }) {
  console.log('LOGIN REQUEST:', credentials);

  return this.http.post(this.apiUrl, credentials).pipe(
    tap({
      next: (res: any) => {
        console.log('LOGIN SUCCESS:', res);

        this.saveToken(res.token);
        this.saveEmail(res.user.email);
        this.saveUserId(res.user.id);
      },
      error: (err) => {
        console.error('LOGIN FAILED:', err);
        throw err; 
      }
    })
  );
}


  register(user: { email: string; password: string }): Observable<any> {
    console.log(' REGISTRATION REQUEST:', user);

    return this.http
      .post('http://localhost:3000/auth/register', user)
      .pipe(
        tap({
          next: (res: any) => {
            console.log(' REGISTRATION SUCCESS:', res);
          },
          error: (err) => {
            console.error('REGISTRATION FAILED:', err);
            throw err;
          }
        })
      );
  }


  saveUserId(id: number) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userId', id.toString());
    }
  }

  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? parseInt(id, 10) : null;
  }


  saveToken(token: string) {
    if (typeof window !== 'undefined' && token) {
      localStorage.setItem('token', token);
      this.loggedIn.next(true);
    }
  }


  saveEmail(email: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('email', email);
      this.userEmail.next(email);
    }
  }


  getUser() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

 
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('userId');

      this.loggedIn.next(false);
      this.userEmail.next(null);

      this.router.navigate(['/login']);

      console.log(' LOGOUT SUCCESS');
    }
  }


  hasToken(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }
}