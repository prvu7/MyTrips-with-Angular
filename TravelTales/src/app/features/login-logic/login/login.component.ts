import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm, EmailValidator } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth/auth.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NzButtonModule, NzIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailError: boolean = false;
  emailTouched: boolean = false;
  showPassword: boolean = false;
  loginError: string = '';
  emailNotFoundError: boolean = false;
  incorrectPasswordError: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.logout(); 
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  onEmailChange() {
    if (this.emailTouched) {
      this.emailError = !this.validateEmail(this.email);
    }
  }

      onPasswordChange() {
        this.incorrectPasswordError = false;
    }

  onEmailBlur() {
    this.emailTouched = true;
    this.emailError = !this.validateEmail(this.email);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
  this.authService.login(this.email, this.password).subscribe({
    next: (response: any) => {
      console.log('Login successful:', response);
      if (response.token) {
        this.authService.setToken(response.token);
      } else {
        this.authService.setToken('true'); 
      }
      localStorage.setItem('userEmail', this.email);
      this.router.navigate(['home']);
    },
    error: (error: any) => {
      console.error('Login error:', error);

      if (error.status === 404) {
        this.emailNotFoundError = true;
      } 
      else if (error.status === 401) {
        this.incorrectPasswordError = true;
      } 
      else {
        this.loginError = 'Eroare la autentificare. Te rugăm să încerci din nou.';
      }
    }
  });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
} 
