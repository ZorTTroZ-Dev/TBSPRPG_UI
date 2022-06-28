import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Adventure} from '../models/adventure';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Source} from '../models/source';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {SourcesService} from './sources.service';
import {NIL} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AdventureService extends BaseService{
  private adventuresUrl: string;

  constructor(http: HttpClient, private sourcesService: SourcesService) {
    super(http);
    this.adventuresUrl = this.getBaseUrl() + '/api/adventures';
  }

  createNewAdventure(): Adventure {
    return {
      id: NIL,
      name: 'new adventure',
      descriptionSourceKey: NIL,
      initialSourceKey: NIL,
      createdByUserId: NIL,
      publishDate: new Date(),
      initializationScriptId: null,
      terminationScriptId: null
    };
  }

  createFormGroupForAdventure(adventure: Adventure): UntypedFormGroup {
    const formGroup = new UntypedFormGroup({
      id: new UntypedFormControl(''),
      name: new UntypedFormControl(''),
      initialSourceKey: new UntypedFormControl(''),
      descriptionSourceKey: new UntypedFormControl(''),
      createdByUserId: new UntypedFormControl(''),
      publishDate: new UntypedFormControl(''),
      initializationScriptId: new UntypedFormControl(''),
      terminationScriptId: new UntypedFormControl('')
    });
    formGroup.setValue(adventure);
    // set the publishing date to the format that the html input is expecting
    formGroup.patchValue({publishDate: adventure.publishDate.toString().substring(0, 10)});
    return formGroup;
  }

  createAdventureFormGroupWithSource(adventure: Adventure, source: Source, descriptionSource: Source): UntypedFormGroup {
    return new UntypedFormGroup({
      adventure: this.createFormGroupForAdventure(adventure),
      initialSource: this.sourcesService.createFormGroupForSource(source),
      descriptionSource: this.sourcesService.createFormGroupForSource(descriptionSource)
    });
  }

  updateAdventure(adventureData: any): Observable<any> {
    return this.http.put<any>(this.adventuresUrl, adventureData).pipe(
      catchError(this.handleError<any>('updateLocation', null))
    );
  }

  getAdventures(): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(this.adventuresUrl)
    .pipe(
      catchError(this.handleError<Adventure[]>('getAdventures', []))
    );
  }

  getPublishedAdventures(): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(this.adventuresUrl + '/published')
      .pipe(
        catchError(this.handleError<Adventure[]>('getPublishedAdventures', []))
      );
  }

  getAdventureByName(name: string): Observable<Adventure> {
    return this.http.get<Adventure>(this.adventuresUrl + '/' + name)
    .pipe(
      catchError(this.handleError<Adventure>('getAdventureByName', null))
    );
  }

  getAdventureById(id: string): Observable<Adventure> {
    return this.http.get<Adventure>(this.adventuresUrl + '/' + id)
      .pipe(
        catchError(this.handleError<Adventure>('getAdventureByName', null))
      );
  }

  getAdventuresCreatedBy(userId: string): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(this.adventuresUrl + '?CreatedBy=' + userId)
      .pipe(
        catchError(this.handleError<Adventure[]>('getAdventuresCreatedBy', []))
      );
  }

  deleteAdventure(adventure: Adventure): Observable<any> {
    return this.http.delete(this.adventuresUrl + '/' + adventure.id)
      .pipe(
        catchError(this.handleError<any>('deleteAdventure', null))
      );
  }
}
