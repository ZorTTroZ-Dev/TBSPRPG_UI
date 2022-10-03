import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  public LANGUAGE_ENGLISH = 'en';
  public LANGUAGE_SPANISH = 'esp';
  public LANGUAGE_DEFAULT = this.LANGUAGE_ENGLISH;

  constructor() { }

  getLanguage(): string {
    return this.LANGUAGE_DEFAULT;
  }

  getLanguages(): string[] {
    return [this.LANGUAGE_ENGLISH, this.LANGUAGE_SPANISH];
  }
}
