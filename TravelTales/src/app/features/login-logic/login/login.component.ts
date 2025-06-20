import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm, EmailValidator } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    }
  });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
} 
