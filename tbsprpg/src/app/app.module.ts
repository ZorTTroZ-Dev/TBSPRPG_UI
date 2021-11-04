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
import { AdventureEditComponent } from './components/adventures/adventure-details/adventure-edit/adventure-edit.component';
import { AdventuresTableComponent } from './components/adventures/adventures-table/adventures-table.component';
import { AdventureDetailsSidebarComponent } from './components/adventures/adventure-details/adventure-details-sidebar/adventure-details-sidebar.component';
import { AdventureCreatorComponent } from './components/adventures/adventure-creator/adventure-creator.component';
import { AdventureCreatorSidebarComponent } from './components/adventures/adventure-creator/adventure-creator-sidebar/adventure-creator-sidebar.component';
import { AdventureDetailsComponent } from './components/adventures/adventure-details/adventure-details.component';
import { AdventureDetailsHomeComponent } from './components/adventures/adventure-details/adventure-details-home/adventure-details-home.component';
import { AdventureDetailsLocationsComponent } from './components/adventures/adventure-details/adventure-details-locations/adventure-details-locations.component';
import { AdventureDetailsLocationEditComponent } from './components/adventures/adventure-details/adventure-details-location-edit/adventure-details-location-edit.component';
import { AdBreadcrumbsComponent } from './components/adventures/adventure-details/ad-breadcrumbs/ad-breadcrumbs.component';
import { AdventureDetailsSourceEditComponent } from './components/adventures/adventure-details/adventure-details-source-edit/adventure-details-source-edit.component';

// directives
import { FocusOnShowDirectiveDirective } from './directives/focus-on-show-directive.directive';
import { InventoryComponent } from './components/game/inventory/inventory.component';
import { AdventureDetailsRoutesEditComponent } from './components/adventures/adventure-details/adventure-details-routes-edit/adventure-details-routes-edit.component';

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
    AdventureEditComponent,
    AdventuresTableComponent,
    AdventureDetailsSidebarComponent,
    AdventureCreatorComponent,
    AdventureCreatorSidebarComponent,
    AdventureDetailsComponent,
    AdventureDetailsHomeComponent,
    AdventureDetailsLocationsComponent,
    AdventureDetailsLocationEditComponent,
    AdBreadcrumbsComponent,
    AdventureDetailsSourceEditComponent,
    AdventureDetailsRoutesEditComponent,
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
