import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, shareReplay} from 'rxjs/operators';
import { IUser } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService{
  private usersUrl = 'https://reqres.in/api/users';
  private userUrl = 'https://reqres.in/api/users/';
  //private usersUrl = 'api/users/users.json';

  constructor(private http: HttpClient){

  }
    getUsers(): Observable<IUser[]>{
        return this.http.get<IUser[]>(this.usersUrl).pipe(
          map((response : any) => response.data),
          shareReplay({ bufferSize: 2, refCount: true }),
          //tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

    getUser(id : number): Observable<IUser>{
      return this.http.get<IUser>(this.userUrl + id).pipe(
        map((response : any) => response.data),
        shareReplay({ bufferSize: 2, refCount: true }),
        //tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

    private handleError(err: HttpErrorResponse){
      let errorMessage ='';
      if(err.error instanceof ErrorEvent){
        errorMessage = `An error occurred: ${err.error.message}`;
      }else{
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.log(errorMessage);

      return throwError(errorMessage);
    }
}