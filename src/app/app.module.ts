import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdventuresComponent } from './components/adventures/adventures.component';
import { HttpClientModule } from '@angular/common/http';
import { ConsoleComponent } from './components/console/console.component';
import { ComrespComponent } from './components/console/comresp/comresp.component';
import { FocusOnShowDirectiveDirective } from './directives/focus-on-show-directive.directive';
import { ConsoleOutputDirective } from './directives/consoleoutput.directive';
import { EchoComponent } from './components/console/echo/echo.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AdventuresComponent,
    ConsoleComponent,
    ComrespComponent,
    FocusOnShowDirectiveDirective,
    ConsoleOutputDirective,
    EchoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
