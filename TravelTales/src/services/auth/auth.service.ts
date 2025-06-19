import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
   isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/login', { email, password });
  }
signup(email: string, password: string, otherFields?: any) {
  return this.http.post('http://localhost:3000/signup', {
    email,
    password,
    ...otherFields
  });
}
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

   logout() {
    localStorage.removeItem('token');
  }
}