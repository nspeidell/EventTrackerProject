import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Spotting } from '../models/spotting';

@Injectable({
  providedIn: 'root',
})
export class SpottingService {
  url: string = environment.baseUrl + 'api/spotting';

  constructor(private http: HttpClient) {}

  index(): Observable<Spotting[]> {
    return this.http.get<Spotting[]>(this.url).pipe(
      catchError((err: any) => {
        console.error('error getting spottings');
        return throwError(
          () =>
            new Error(
              'SpottingService.index(): error retrieving spottings: ' + err
            )
        );
      })
    );
  }
  create(spotting: Spotting): Observable<Spotting> {
    spotting.id = 0;
    console.log(spotting)
   return this.http.post<Spotting>(this.url, spotting).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('spottingService.index(): error retrieving spotting: ' + err)
       );
     })
   );
   }
   public update(spotting: Spotting): Observable<Spotting> {
    return this.http.put<Spotting>(this.url + '/' + spotting.id, spotting).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('SpottingService.index(): error retrieving spotting: ' + err)
        );
      })
    );
    }
    destroy(id: number): Observable<void> {
      return this.http.delete<void>(`${this.url}/${id}`).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('SpottingService.index(): error deleting spotting: ' + err)
          );
        })
      );
      }
      public show(spottingId: number): Observable<Spotting> {
        return this.http.get<Spotting>(this.url + '/' + spottingId).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('SpottingService.show(): error retrieving spotting: ' + err)
          );
        })
      );
      }
}
