import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Please fill all fields.');
      return;
    }

    this.userService.login(this.email, this.password).subscribe(
      (users) => {
        if (users.length > 0) {
          alert('Login successful!');
          this.router.navigate(['/candidate-space']);
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
}
