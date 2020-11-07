import { Injectable, Type } from '@angular/core';
import { EchoComponent } from '../components/console/echo/echo.component';
//import { AdventuresComponent } from '../components/adventures/adventures.component';
//import { OutputComponent } from '../components/console/output.component';

@Injectable({
  providedIn: 'root'
})

export class ConsoleService {
  //this will map commands to components
  constructor() { }

  getComponentForCommand(command : string) : Type<any> {
    if(command.toLowerCase() == "echo")
      return EchoComponent;
  }
}
