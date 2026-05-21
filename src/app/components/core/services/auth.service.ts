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
      
      if (token) this.loggedIn.next(true);
      if (email) this.userEmail.next(email);
    }
  }

  login(credentials: { email: string; password: string }) {
  return this.http.post(this.apiUrl, credentials).pipe(
    tap((res: any) => {
      this.saveToken(res.token);
      this.saveEmail(res.user.email); // save email
      this.saveUserId(res.user.id);   // save user ID
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

      this.loggedIn.next(false);
      this.userEmail.next(null);

      this.router.navigate(['/login']);
    }
  }

  hasToken(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }

  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:3000/auth/register', user);
  }
}
