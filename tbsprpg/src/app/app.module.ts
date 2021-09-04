// interceptors
import { httpInterceptorProviders } from './app.interceptors';

// angular stuff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// main components
import { AppComponent } from './app.component';
import { AdventuresComponent } from './components/adventures/adventures.component';
import { LandingComponent } from './components/mainsite/landing.component';
import { LoginComponent } from './components/mainsite/login/login.component';
import { RegistrationComponent } from './components/mainsite/registration/registration.component';
import { ToolbarComponent } from './components/mainsite/toolbar/toolbar.component';

// game components
import { GameComponent } from './components/game/game.component';
import { ContentComponent } from './components/game/content/content.component';
import { VerbsComponent } from './components/game/verbs/verbs.component';
import { MovementComponent } from './components/game/movement/movement.component';

// directives
import { FocusOnShowDirectiveDirective } from './directives/focus-on-show-directive.directive';
import { InventoryComponent } from './components/game/inventory/inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AdventuresComponent,
    FocusOnShowDirectiveDirective,
    LandingComponent,
    LoginComponent,
    RegistrationComponent,
    ToolbarComponent,
    ContentComponent,
    VerbsComponent,
    MovementComponent,
    InventoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
