import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/mainsite/landing.component';
import { RegistrationComponent } from './components/mainsite/registration/registration.component';
import { LoginComponent } from './components/mainsite/login/login.component';
import { GameComponent } from './components/game/game.component';
import { AuthGuard } from './guards/auth.guard';
import {AdventuresComponent} from './components/adventures/adventures.component';
import {AdventureCreatorComponent} from './components/adventures/adventure-creator/adventure-creator.component';
import {AdventureDetailsComponent} from './components/adventures/adventure-details/adventure-details.component';

const routes: Routes = [
  { path: 'adventure', component: AdventuresComponent, canActivate: [AuthGuard] },
  { path: 'adventure-details/:adventureId/:location', component: AdventureDetailsComponent, canActivate: [AuthGuard] },
  { path: 'adventure-details/:adventureId', component: AdventureDetailsComponent, canActivate: [AuthGuard] },
  { path: 'adventure-creator', component: AdventureCreatorComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'game/:adventure', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'game', component: GameComponent, canActivate: [AuthGuard] },
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
