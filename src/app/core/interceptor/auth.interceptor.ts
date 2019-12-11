// 1. Have to add header for token
// 2. store every request and empty that request when reponse comes
// 3. If any request comes up with 401 than first have to fetch the new token than re-hit the old api

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import {catchError, map, switchMap, filter, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private requestCounter : number = 0 ;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
 constructor(){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addToken(request,localStorage.getItem('anyNameYouWIsh'));
    this.requestCounter++;
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
      return event;
    }), catchError((error: any, caught: any) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return throwError(error);

        } else {
        return throwError(error);
      }
      }
    ));
  }
  private addToken(request: HttpRequest<any>, token: string){
    return request.clone({
      setHeaders:{
        'Authorization' : `${token}`
      }
    })

  }

}
