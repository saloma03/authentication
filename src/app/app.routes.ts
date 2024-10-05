import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes =
[
  {path: '' , redirectTo:'login' ,pathMatch:'full'},
  {path: 'login' , component:LoginComponent , title:'login'},
  {path:'register' , component:RegisterComponent , title:'register'},
  {path:'**' ,component:NotFoundComponent , title:'nothing here !'}
];
