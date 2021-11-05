// interceptors
import { httpInterceptorProviders } from './app.interceptors';

// angular stuff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';

// main components
import { AppComponent } from './app.component';
import { LandingComponent } from './components/mainsite/landing.component';
import { LoginComponent } from './components/mainsite/login/login.component';
import { RegistrationComponent } from './components/mainsite/registration/registration.component';
import { ToolbarComponent } from './components/mainsite/toolbar/toolbar.component';

// game components
import { GameComponent } from './components/game/game.component';
import { ContentComponent } from './components/game/content/content.component';
import { VerbsComponent } from './components/game/verbs/verbs.component';
import { MovementComponent } from './components/game/movement/movement.component';

// adventure components
import { AdventuresComponent } from './components/adventures/adventures.component';
import { AdventuresTableComponent } from './components/adventures/adventures-table/adventures-table.component';
import { AdSidebarComponent } from './components/adventures/adventure-details/ad-sidebar/ad-sidebar.component';
import { AdventureCreatorComponent } from './components/adventures/adventure-creator/adventure-creator.component';
import { AdventureCreatorSidebarComponent } from './components/adventures/adventure-creator/adventure-creator-sidebar/adventure-creator-sidebar.component';
import { AdventureDetailsComponent } from './components/adventures/adventure-details/adventure-details.component';
import { AdHomeComponent } from './components/adventures/adventure-details/ad-home/ad-home.component';
import { AdLocationsComponent } from './components/adventures/adventure-details/ad-locations/ad-locations.component';
import { AdLocationEditComponent } from './components/adventures/adventure-details/ad-location-edit/ad-location-edit.component';
import { AdBreadcrumbsComponent } from './components/adventures/adventure-details/ad-breadcrumbs/ad-breadcrumbs.component';
import { AdSourceEditComponent } from './components/adventures/adventure-details/ad-source-edit/ad-source-edit.component';

// directives
import { FocusOnShowDirectiveDirective } from './directives/focus-on-show-directive.directive';
import { InventoryComponent } from './components/game/inventory/inventory.component';
import { AdRoutesEditComponent } from './components/adventures/adventure-details/ad-routes-edit/ad-routes-edit.component';
import { AdRouteEditComponent } from './components/adventures/adventure-details/ad-route-edit/ad-route-edit.component';

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
    InventoryComponent,
    AdventuresTableComponent,
    AdSidebarComponent,
    AdventureCreatorComponent,
    AdventureCreatorSidebarComponent,
    AdventureDetailsComponent,
    AdHomeComponent,
    AdLocationsComponent,
    AdLocationEditComponent,
    AdBreadcrumbsComponent,
    AdSourceEditComponent,
    AdRoutesEditComponent,
    AdRouteEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DataTablesModule,
    ToastrModule.forRoot()
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
