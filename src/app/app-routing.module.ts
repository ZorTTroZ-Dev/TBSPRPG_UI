import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleComponent } from './components/console/console.component';
import { MainSiteComponent } from './components/mainsite/mainsite.component';

const routes: Routes = [
  { path: 'console', component: ConsoleComponent },
  { path: '', component: MainSiteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
