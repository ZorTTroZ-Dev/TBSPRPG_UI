import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor() { }

  getContents() {
    //gets all content from this session, content gets cleared when session ended
  }

  getLatestContent() {
    //gets the text content from the latest update
  }
}
