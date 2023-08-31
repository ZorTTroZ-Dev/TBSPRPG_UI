import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilitiesService {

  constructor() {}

  tryParseJSONObject(jsonString: string): any {
    try {
      const obj = JSON.parse(jsonString);
      JSON.stringify(obj);
      return obj;
    } catch (e: any) {
      return false;
    }
  }
}
