import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Http, Response } from '@angular/http';  
// import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
// import { map, filter, switchMap } from 'rxjs/operators';
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public apiURL:string="http://localhost:64506/api/Customers";
  constructor(private httpClient:HttpClient) { }

  insertCustomer (customer:any)
  {
    return this.httpClient.post(this.apiURL,customer)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  updateCustomer (id:any, customer:any,)
  {
    return this.httpClient.put(this.apiURL+"/"+id,customer)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  GetAllCustomer ()
  {
    return this.httpClient.get(this.apiURL)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} 
}
