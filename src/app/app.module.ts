//angular stuff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//material
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

//flex
import { FlexLayoutModule } from '@angular/flex-layout';

//main components
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { AdventuresComponent } from './components/adventures/adventures.component';
import { LandingComponent } from './components/mainsite/landing.component';

//console components
import { ConsoleComponent } from './components/console/console.component';
import { ComrespComponent } from './components/console/comresp/comresp.component';
import { EchoComponent } from './components/console/echo/echo.component';

//directives
import { FocusOnShowDirectiveDirective } from './directives/focus-on-show-directive.directive';
import { ConsoleOutputDirective } from './directives/consoleoutput.directive';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AdventuresComponent,
    ConsoleComponent,
    ComrespComponent,
    FocusOnShowDirectiveDirective,
    ConsoleOutputDirective,
    EchoComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
