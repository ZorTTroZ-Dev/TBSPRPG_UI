import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private sourceUrl = '/api/contents';

  constructor(protected http: HttpClient, ) { }


  //
  // protected lookupSourceKeys(gameId: string): <T>(source: Observable<T>) => Observable<T> {
  //   return <T>(source: Observable<T>): Observable<T> => new Observable(subscriber => {
  //     const subscription = source.subscribe({
  //       next(value): void {
  //         if (value === null || value === undefined) {
  //           subscriber.next(value);
  //           return;
  //         }
  //         // collect all of the source keys that need to be looked up
  //         if (SOURCE_KEYS in value) {
  //           const sources = value[SOURCE_KEYS];
  //           // iterate over each source key and look it up in the service
  //           for (const sourceKey of sources) {
  //             console.log(sourceKey);
  //           }
  //         } else if (SOURCE_KEY in value) {
  //           console.log(value[SOURCE_KEY]);
  //         }
  //         subscriber.next(value);
  //       },
  //       error(error): void {
  //         subscriber.error(error);
  //       },
  //       complete(): void {
  //         subscriber.complete();
  //       }
  //     });
  //
  //     return () => subscription.unsubscribe();
  //   });
  // }

  protected handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
