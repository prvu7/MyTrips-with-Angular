import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'trips',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/trips/trips/trips.component').then(m => m.TripsComponent)
    },
    {
        path: 'map',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/map/map.component').then(m => m.TripsComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login-logic/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'signup',
        loadComponent: () => import('./features/login-logic/singup/singup.component').then(m => m.SignupComponent)
    }
];
