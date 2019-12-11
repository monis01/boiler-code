import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HTTPService {
    private baseUrl ;
    
    constructor(private http: HttpClient) {
        // this.baseUrl = environment.baseURL;
    }

    get(url, queryParams?,baseUrl?){
        let queryParamForUrl = '' ;
        if (queryParams) {
            queryParamForUrl = this.prepareTheQueryParams(queryParams);
        }
        url = this.baseUrl + url + queryParamForUrl;
        return  this.http.get(url).toPromise() ;
    }

    post(url, body, queryParams?,baseUrl?){
        const finalUrl = baseUrl ? baseUrl+url : this.generateURL(url) ;  
        return this.http.post(finalUrl, body).toPromise();
    }

    put(url, body, queryParams?,baseUrl?){
        const finalUrl  = this.generateURL(url)
        return this.http.put(finalUrl, body).toPromise() ;
    }

    delete(url, body,baseUrl?){
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body
          };
          return this.http.delete(this.generateURL(url), options).toPromise();
    }



    private prepareTheQueryParams(queryParamObject) {
        if (queryParamObject.constructor === Object) {
            return Object.keys(queryParamObject).reduce((accumulator, currentValue, currentIndex) => {
                return accumulator + ( currentIndex === 0 ? '' : '&') + currentValue + '=' + queryParamObject[currentValue];
            }, '?');
        }
        return '' ;
    }

    private generateURL(url: string) {
        return this.baseUrl + url ;
    }

}