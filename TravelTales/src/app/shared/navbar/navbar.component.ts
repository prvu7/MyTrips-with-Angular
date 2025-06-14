import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { UserOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NzIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [
    { provide: NZ_ICONS, useValue: [UserOutline] }
  ]
})
export class NavbarComponent {
  
}