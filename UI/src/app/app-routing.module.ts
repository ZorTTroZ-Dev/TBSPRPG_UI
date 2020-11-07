import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleComponent } from './components/console/console.component';
import { LandingComponent } from './components/mainsite/landing.component';
import { RegistrationComponent } from './components/mainsite/registration/registration.component';
import { LoginComponent } from './components/mainsite/login/login.component';
import { GameComponent } from './components/game/game.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'console', component: ConsoleComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'game/:adventure', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'game', component: GameComponent, canActivate: [AuthGuard] },
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
