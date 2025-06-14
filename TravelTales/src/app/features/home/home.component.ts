import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <h1>Welcome to Travel Tales</h1>
      <p>Your journey starts here!</p>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class HomeComponent {}