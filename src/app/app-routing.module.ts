import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleComponent } from './components/console/console.component';
import { LandingComponent } from './components/mainsite/landing.component';
import { RegistrationComponent } from './components/mainsite/registration/registration.component';
import { LoginComponent } from './components/mainsite/login/login.component';

const routes: Routes = [
  { path: 'console', component: ConsoleComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
