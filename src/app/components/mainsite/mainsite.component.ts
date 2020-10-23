import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-mainsite',
  templateUrl: './mainsite.component.html',
  styleUrls: ['./mainsite.component.scss']
})
export class MainSiteComponent implements OnInit {
  email : string;

  constructor() { }

  ngOnInit(): void {
  }

  getStarted(): void {
    //check if we have an account for this email
    //if so go to a login screen
    //else go to a registration page
  }
}
