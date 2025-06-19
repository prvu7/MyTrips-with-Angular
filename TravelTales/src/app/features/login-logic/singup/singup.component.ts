import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm, EmailValidator } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export class SignupComponent {
  fname: string = '';
  lname: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  emailError: boolean = false;
  emailTouched: boolean = false;
  passwordError: boolean = false;
  passwordTouched: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  validatePasswords(password: string, confirmPassword: string): boolean {
    return password === confirmPassword && password.length >= 6;
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

  onPasswordChange() {
    if (this.passwordTouched) {
      this.passwordError = !this.validatePasswords(this.password, this.confirmPassword);
    }
  }

  onPasswordBlur() {
    this.passwordTouched = true;
    this.passwordError = !this.validatePasswords(this.password, this.confirmPassword);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    this.auth.signup(this.email, this.password, { name:`${this.fname} ${this.lname}`})
      .subscribe({
        next: (response: any) => {
          console.log('Signup successful:', response);
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.error('Signup error:', error);
        }
      });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
} 
