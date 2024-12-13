import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CandidateSpaceComponent } from './components/candidate-space/candidate-space.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from '../app/components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import("../app/components/home/home.component")
      .then(m => HomeComponent)
  },
  {
    path: 'register',
    loadComponent: () => import("../app/components/register/register.component")
      .then(m => RegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () => import("../app/components/login/login.component")
      .then(m => LoginComponent),
  },
  {
    path: 'candidate-space',
    loadComponent: () => import("../app/components/candidate-space/candidate-space.component")
      .then(m => CandidateSpaceComponent),
  },
  { path: 'candidate-space/:id', component: CandidateSpaceComponent },
  { path: '**', component: PageNotFoundComponent }, // Page 404

];
