import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  login() {
    this.router.navigate(['/login']); // Rediriger vers la page de connexion
  }

  register() {
    this.router.navigate(['/register']); // Rediriger vers la page d'enregistrement
  }

  logout() {
    this.authService.logout(); // Déconnecter l'utilisateur
    this.isLoggedIn = false; // Mettre à jour l'état de connexion
    this.router.navigate(['/']); // Rediriger vers la page d'accueil
  }
}
