import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Vérifier si un utilisateur est authentifié en vérifiant le localStorage
  isAuthenticated(): boolean {
    return !!localStorage.getItem('userId');
  }

  // Stocker l'ID de l'utilisateur après la connexion
  login(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  // Déconnecter l'utilisateur en supprimant l'ID du localStorage
  logout(): void {
    localStorage.removeItem('userId');
  }

  // Récupérer l'ID de l'utilisateur
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
