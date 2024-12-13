import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Enregistrer un utilisateur
  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Authentifier un utilisateur
  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}?email=${email}&password=${password}`
    );
  }
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

