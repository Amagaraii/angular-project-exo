import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('User ID not found!');
    } else {
      console.log('User ID:', userId);
    }
  }


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


  // Récupérer les informations d'un utilisateur
  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }


  updateUser(userId: string, userData: any): Observable<any> {
    if (!userId) {
      console.error('User ID is missing!');
      return throwError(() => new Error('User ID is missing!'));
    }

    const url = `${this.apiUrl}/${userId}`; // Corriger l'URL pour que ce soit correct
    return this.http.put(url, userData).pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        return throwError(() => error);
      })
    );
  }


}

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

