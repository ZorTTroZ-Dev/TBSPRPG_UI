import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BaseService} from './base.service';

import {forkJoin, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AdventureObject, GENERIC_ADVENTURE_OBJECT_TYPE} from '../models/adventureObject';
import {NIL} from 'uuid';
import {FormControl, FormGroup} from '@angular/forms';
import {Location} from '../models/location';
import {SourcesService} from './sources.service';
import {SettingService} from './setting.service';
import {Source} from '../models/source';

@Injectable({
  providedIn: 'root'
})

export class AdventureObjectService extends BaseService {
  private adventureObjectsUrl: string;
  public nameSourceFormGroupName = 'nameSource';
  public descriptionSourceFormGroupName = 'descriptionSource';

  constructor(http: HttpClient,
              private sourcesService: SourcesService,
              private settingService: SettingService) {
    super(http);
    this.adventureObjectsUrl = this.getBaseUrl() + '/api/objects';
  }

  createNewAdventureObject(adventureId: string): AdventureObject {
    return {
      id: NIL,
      name: 'new object',
      description: 'object description',
      adventureId,
      type: GENERIC_ADVENTURE_OBJECT_TYPE,
      locations: [],
      nameSourceKey: NIL,
      descriptionSourceKey: NIL
    };
  }

  createAdventureObjectFormGroup(adventureObject: AdventureObject): FormGroup {
    const formGroup = new FormGroup( {
      id: new FormControl<string>(''),
      name: new FormControl<string>(''),
      adventureId: new FormControl<string>(''),
      description: new FormControl<string>(''),
      type: new FormControl<string>(''),
      locations: new FormControl<Location[]>([]),
      nameSourceKey: new FormControl<string>(adventureObject.nameSourceKey),
      descriptionSourceKey: new FormControl<string>(adventureObject.descriptionSourceKey),
    });
    formGroup.setValue(adventureObject);
    return formGroup;
  }

  createFormGroupForAdventureObjectWithSource(adventureObject: AdventureObject,
                                              nameSource: Source,
                                              descriptionSource: Source): FormGroup {
    return new FormGroup({
      adventureObject: this.createAdventureObjectFormGroup(adventureObject),
      [this.nameSourceFormGroupName]: this.sourcesService.createFormGroupForSource(nameSource),
      [this.descriptionSourceFormGroupName]: this.sourcesService.createFormGroupForSource(descriptionSource)
    });
  }

  createFormGroupForAdventureObjectObservable(adventureObject: AdventureObject,
                                              adventureId: string): Observable<FormGroup> {
    return new Observable<FormGroup>(subscriber => {
      const nameSourceRequest = this.sourcesService.getSourceForAdventureForKey(
        adventureId,
        adventureObject.nameSourceKey,
        this.settingService.getLanguage());
      const descriptionSourceRequest = this.sourcesService.getSourceForAdventureForKey(
        adventureId,
        adventureObject.descriptionSourceKey,
        this.settingService.getLanguage());
      forkJoin([nameSourceRequest, descriptionSourceRequest]).subscribe(results => {
        const formGroup = this.createFormGroupForAdventureObjectWithSource(adventureObject, results[0], results[1]);
        subscriber.next(formGroup);
        subscriber.complete();
      });
    });
  }

  getAdventureObjectsForAdventure(adventureId: string): Observable<AdventureObject[]> {
    return this.http.get<AdventureObject[]>(this.adventureObjectsUrl + '/adventure/' + adventureId)
      .pipe(
        catchError(this.handleError<AdventureObject[]>('getAdventureObjectsForAdventure', null))
      );
  }

  getAdventureObjectsForLocation(locationId: string): Observable<AdventureObject[]> {
    return this.http.get<AdventureObject[]>(this.adventureObjectsUrl + '/location/' + locationId)
      .pipe(
        catchError(this.handleError<AdventureObject[]>('getAdventureObjectsForLocation', null))
      );
  }

  updateAdventureObject(adventureObjectData: any): Observable<any> {
    return this.http.put<any>(this.adventureObjectsUrl, adventureObjectData).pipe(
      catchError(this.handleError<any>('updateAdventureObject', null))
    );
  }

  deleteAdventureObject(adventureObject: AdventureObject): Observable<any> {
    return this.http.delete(this.adventureObjectsUrl + '/' + adventureObject.id)
      .pipe(
        catchError(this.handleError<any>('deleteAdventureObject', null))
      );
  }
}
