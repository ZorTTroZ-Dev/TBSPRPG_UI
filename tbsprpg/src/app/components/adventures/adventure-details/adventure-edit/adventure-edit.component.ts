import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-adventure-edit',
  templateUrl: './adventure-edit.component.html',
  styleUrls: ['./adventure-edit.component.scss']
})
export class AdventureEditComponent implements OnInit {
  adventureForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

}
