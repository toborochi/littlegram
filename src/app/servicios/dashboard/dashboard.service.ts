import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Diagrama} from '../../modelos/diagrama';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ServerResponse} from '../../modelos/server_response';

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

  listarDiagram(owner: string):Observable<ServerResponse> {
    return this.http.get<ServerResponse>(
      this.serverUrl+`/diagram/${owner}`
    );
  }
}
