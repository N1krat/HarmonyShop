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
  console.log('🔐 LOGIN REQUEST:', credentials);
  console.log('🔐 Request headers will include Content-Type: application/json');

  return this.http.post(this.apiUrl, credentials).pipe(
    tap({
      next: (res: any) => {
        console.log('✅ LOGIN SUCCESS:', res);
        console.log('✅ Token:', res.token);
        console.log('✅ User:', res.user);
        console.log('✅ User role:', res.user?.role || 'no role provided');

        this.saveToken(res.token);
        this.saveEmail(res.user.email);
        this.saveUserId(res.user.id);
        
        // Only save role if it exists
        if (res.user.role) {
          this.saveUserRole(res.user.role);
          console.log('✅ Saved role:', res.user.role);
        } else {
          // Default to 'user' if no role is provided
          this.saveUserRole('user');
          console.log('✅ No role in response, defaulting to "user"');
        }
      },
      error: (err: any) => {
        console.error('❌ LOGIN FAILED:', err);
        console.error('❌ Status:', err.status);
        console.error('❌ Status text:', err.statusText);
        console.error('❌ Error message:', err.error);
        console.error('❌ Full error:', err);
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

  saveUserRole(role: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', role);
    }
  }

  getUserRole(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userRole');
    }
    return null;
  }

  isAdmin(): boolean {
    const role = this.getUserRole();
    // Check if role is admin OR if email is admin@example.com (for testing)
    const email = localStorage.getItem('email');
    const isAdminRole = role === 'admin';
    const isAdminEmail = email === 'admin@example.com' || email === 'admin';
    console.log('🔐 Admin check - role:', role, 'email:', email, 'isAdmin:', isAdminRole || isAdminEmail);
    return isAdminRole || isAdminEmail;
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
      localStorage.removeItem('userRole');

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