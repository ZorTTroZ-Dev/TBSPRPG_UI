import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleComponent } from './components/console/console.component';

const routes: Routes = [
  { path: 'console', component: ConsoleComponent },
  //{ path: '', redirectTo: '/console', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
