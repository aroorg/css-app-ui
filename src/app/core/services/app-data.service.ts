import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor(private httpClient: HttpClient) { }

  getDataFromService(url: string, headers:HttpHeaders, params: HttpParams){
   return  this.httpClient.get(url, {headers : headers , params : params})
  }

  sendPostRequest(url: string, body:any, options: any){
    return this.httpClient.post(url, body, options);
  }
}
