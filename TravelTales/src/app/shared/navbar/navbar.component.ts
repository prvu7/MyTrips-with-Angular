import { Component,  OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../../services/auth/auth.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NzIconModule, NzButtonModule,NzDropDownModule,  NzMenuModule, NzAvatarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  initial: string = '';
   userData: any;
   name: string = '';
   color: string = '#1890ff';
  constructor(public authService: AuthService, private http: HttpClient) {}
  
ngOnInit() {
  this.http.get<any[]>('/assets/users.json').subscribe(users => {
    const userEmail = localStorage.getItem('userEmail');
    const user = users.find(u => u.email === userEmail);
    if (user && user.name) {
      this.name = user.name;
      this.color = user.color;
      this.initial = this.name
        .split(' ')
        .filter(word => word.length > 0)
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    } else {
      this.name = '';
      this.initial = '';
      this.color = '#1890ff';
    }
  });
}
menuOpen = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

logout() {
  this.authService.logout();
  this.menuOpen = false;
}
  
}