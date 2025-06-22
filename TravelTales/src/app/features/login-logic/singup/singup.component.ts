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
  signupError: string = '';
  
  emailError: boolean = false;
  emailTouched: boolean = false;
  passwordError: boolean = false;
  passwordTouched: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  duplicateEmailError: boolean = false;

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
    this.duplicateEmailError = false; 
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
generateRandomColor(): string {
  const hue = Math.floor(Math.random() * 360); // Nuanța: 0-359
  const saturation = Math.floor(Math.random() * 21) + 70; // Saturația: 70-90%
  const lightness = Math.floor(Math.random() * 16) + 25; // Luminozitatea: 25-40%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
    onSubmit() {
      this.signupError = '';
      this.duplicateEmailError = false; // <-- Adaugă această linie
      const color = this.generateRandomColor();
      this.auth.signup(this.email, this.password, { name:`${this.fname} ${this.lname}`, color })
        .subscribe({
          next: (response: any) => {
            console.log('Signup successful:', response);
            this.router.navigate(['/login']);
          },
          error: (error: any) => {
            if (error.status === 409) {
              this.duplicateEmailError = true; // <-- Modifică aici
            } else {
              this.signupError = 'A apărut o eroare. Vă rugăm să încercați din nou.';
            }
            console.error('Signup error:', error);
          }
        });
    }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
} 
