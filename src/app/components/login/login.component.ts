import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (!this.email || !this.password) {
      alert('Please fill all fields.');
      return;
    }

    this.userService.login(this.email, this.password).subscribe(
      (users) => {
        if (users.length > 0) {
          const user = users[0];

          // Vérifiez si user.id est défini
          if (user.id) {
            this.authService.login(user.id.toString()); // Stocker l'ID dans le localStorage
            alert('Login successful!');
            this.router.navigate([`/candidate-space/${user.id}`]); // Rediriger avec l'ID dans l'URL
          } else {
            alert('User ID is missing!');
          }
        } else {
          alert('Invalid email or password!');
        }
      },
      (error) => {
        console.error(error);
        alert('Login failed!');
      }
    );
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
