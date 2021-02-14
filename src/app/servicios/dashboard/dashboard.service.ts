import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Diagrama} from '../../modelos/diagrama';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private serverUrl = environment.api_url;

  constructor(private http:HttpClient) { }


  createDiagram(data: Diagrama):Observable<any> {
    console.log(data);
    return this.http.post<any>(this.serverUrl+'/diagram',data);
  }
}
