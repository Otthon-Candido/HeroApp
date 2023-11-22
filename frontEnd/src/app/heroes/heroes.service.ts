import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  map, retry, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Heroes, Response } from './heroes.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  baseEndPoint = environment.apiBase + 'Heroes';

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getHeroesTable(): Observable<Response> {
    let url = `${this.baseEndPoint}/GetHeroes`;
   
    return this.httpClient.get<Response>(url, this.httpOptions)
      .pipe(
        retry(2),
        take(1),
        map((response: Response) => {
          return response;
        }))
  }

  getHeroById(id:string){
    let url = `${this.baseEndPoint}/GetHero/${id}`;

    return this.httpClient.get<Heroes>(url, this.httpOptions)
    .pipe(
      retry(2),
      take(1),
      map((response: Heroes) => {
        return response;
      }))
  }

  updateHero(heroes: Heroes){
    let url = `${this.baseEndPoint}/UpdateHero`;

    return this.httpClient.put<Response>(url, JSON.stringify(heroes),  this.httpOptions)
    .pipe(
      retry(2),
      take(1),
      map((response: Response) => {
        return response;
      }))
  }


  saveHero(heroes: Heroes){
    let url = `${this.baseEndPoint}/SaveHero`;

    return this.httpClient.post<Response>(url, JSON.stringify(heroes),  this.httpOptions)
    .pipe(
      retry(2),
      take(1),
      map((response: Response) => {
        return response;
      }))
  }

  removeHero(id:number){
    let url = `${this.baseEndPoint}/DeleteHero/${id}`;

    return this.httpClient.delete<Response>(url, this.httpOptions)
    .pipe(
      retry(2),
      take(1),
      map((response: Response) => {
        return response;
      }))
  }
}
