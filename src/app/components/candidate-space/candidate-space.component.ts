import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-space',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './candidate-space.component.html',
  styleUrls: ['./candidate-space.component.css']
})
export class CandidateSpaceComponent implements OnInit {
  candidateForm!: FormGroup;
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
    this.userId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.userId) {
      console.error('User ID is missing!');
      return;
    }

    // Initialisation du formulaire
    this.candidateForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    // Charger les données de l'utilisateur dans le formulaire
    this.userService.getUserById(this.userId).subscribe(
      (user) => {
        this.candidateForm.patchValue({
          name: user.name,
          email: user.email,
          password: user.password,
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations utilisateur', error);
      }
    );
  }

  updateCandidate(): void {
    if (this.candidateForm.invalid) {
      alert('Veuillez corriger les erreurs dans le formulaire.');
      return;
    }

    this.userService.updateUser(this.userId, this.candidateForm.value).subscribe(
      () => {
        alert('Informations de l\'utilisateur mises à jour avec succès!');
      },
      (error) => {
        console.error('Échec de la mise à jour de l\'utilisateur', error);
        alert('Échec de la mise à jour de l\'utilisateur.');
      }
    );
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
