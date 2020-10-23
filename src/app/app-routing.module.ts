import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleComponent } from './components/console/console.component';
import { LandingComponent } from './components/mainsite/landing.component';

const routes: Routes = [
  { path: 'console', component: ConsoleComponent },
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
