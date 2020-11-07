import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //going to connect to the api to get a list of adventures

  constructor(private router: Router  ) {}

  ngOnInit(): void {
    //check if the user is logged in, look in local storage if so, take them to the console
    //if not logged in they will automatically go to the main page
    //this.router.navigate(['/console', {}]);
  }
}
