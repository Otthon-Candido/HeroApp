import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {  catchError, map, retry, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FilterParams, Response, SuperPower } from './super-powers.model';

@Injectable({
  providedIn: 'root'
})
export class SuperPowerService {
  baseEndPoint = environment.apiBase + 'SuperPowers';

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getSuperPowerTable(fp: FilterParams = {}): Observable<Response> {
    let filterParam = new FilterParams(fp);
    let url = `${this.baseEndPoint}/GetSuperPowers`;
   
    return this.httpClient.get<Response>(url, this.httpOptions)
      .pipe(
        retry(2),
        take(1),
        map((response: Response) => {
          return response;
        }))
  }

  getSuperPowerById(id:string){
    let url = `${this.baseEndPoint}/GetSuperPower/${id}`;

    return this.httpClient.get<Response>(url, this.httpOptions)
    .pipe(
      retry(2),
      take(1),
      map((response: Response) => {
        return response;
      }))
  }

  updateSuperPower(superPower: SuperPower){
    let url = `${this.baseEndPoint}/UpdateSuperPower`;

    return this.httpClient.put<Response>(url, JSON.stringify(superPower),  this.httpOptions)
    .pipe(
      retry(2),
      take(1),
      map((response: Response) => {
        return response;
      }))
  }


  saveSuperPower(superPower: SuperPower){
    let url = `${this.baseEndPoint}/SaveSuperPower`;

    return this.httpClient.post<Response>(url, JSON.stringify(superPower),  this.httpOptions)
    .pipe(
      retry(2),
      take(1),
      map((response: Response) => {
        return response;
      }))
  }

  removeSuperPower(id:number){
    let url = `${this.baseEndPoint}/DeleteSuperPower/${id}`;

    return this.httpClient.delete<Response>(url, this.httpOptions)
    .pipe(
      retry(2),
      take(1),
      map((response: Response) => {
        return response;
      }))
  }
}
