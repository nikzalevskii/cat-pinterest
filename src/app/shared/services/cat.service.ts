import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";
import {ICat} from "../../../interfaces/icat";

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private _apiUrl:string = environment.apiUrl;
  private _apiKey :string = environment.apiKey;
  constructor(private http: HttpClient) { }

  fetchCats(page:number, limit: number):Observable<ICat[]> {
    const headers = {'x-api-key': this._apiKey}
    return this.http.get<ICat[]>(`${this._apiUrl}?page=${page}&limit=${limit}`, {headers})
  }

}
