import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './components/mainsite/landing.component';
import {RegistrationComponent} from './components/mainsite/registration/registration.component';
import {GameComponent} from './components/game/game.component';
import {AuthGuard} from './guards/auth.guard';
import {AdventuresComponent} from './components/adventures/adventures.component';
import {AdventureCreatorComponent} from './components/adventures/adventure-creator/adventure-creator.component';
import {AdventureDetailsComponent} from './components/adventures/adventure-details/adventure-details.component';
import {AdventureExplorerComponent} from './components/adventures/adventure-explorer/adventure-explorer.component';
import {PERMISSION_ADVENTURE_EDIT, PermissionGuard} from './guards/permission.guard';
import {LoginFailedComponent} from './components/mainsite/login-failed/login-failed.component';
import {RegistrationVerifyComponent} from './components/mainsite/registration-verify/registration-verify.component';

const routes: Routes = [
  {
    path: 'adventure',
    component: AdventuresComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [PERMISSION_ADVENTURE_EDIT]
    }
  },
  {
    path: 'adventure-details/:adventureId/:location',
    component: AdventureDetailsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [PERMISSION_ADVENTURE_EDIT]
    }
  },
  {
    path: 'adventure-details/:adventureId',
    component: AdventureDetailsComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [PERMISSION_ADVENTURE_EDIT]
    }
  },
  {
    path: 'adventure-creator',
    component: AdventureCreatorComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [PERMISSION_ADVENTURE_EDIT]
    }
  },
  {
    path: 'adventure-explorer',
    component: AdventureExplorerComponent,
    canActivate: [AuthGuard]
  },
  { path: 'register', component: RegistrationComponent },
  { path: 'register-verify', component: RegistrationVerifyComponent },
  { path: 'signin-failed', component: LoginFailedComponent },
  { path: 'game/:adventure', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'game', component: GameComponent, canActivate: [AuthGuard] },
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
