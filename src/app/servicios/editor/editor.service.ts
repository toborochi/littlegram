import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import firebase from 'firebase';
import User = firebase.User;
import {Diagrama} from '../../modelos/diagrama';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  currentDiagram = this.socket.fromEvent<any>('update-diagram');
  listaParticipantes = this.socket.fromEvent<any>('list-participants');
  permiso = this.socket.fromEvent<any>('permission-updated');
  firstDiagram = this.socket.fromEvent<any>('get-diagram');


  private serverUrl = environment.api_url;

  constructor(private socket: Socket,private http:HttpClient) { }

  participantes(id:string){
    this.socket.emit('get-participants',{
      diagrama_id:id
    })
  }

  permisoAsignar(user: User,id:string){
    this.socket.emit('permission-change',{
        diagrama_id: id,
        usuario: user
    });
  }

  editDiagram(user: User,id:string,diagram_data: any) {
    this.socket.emit('edit-diagram', {
      usuario: user,
      diagrama_id: id,
      data:diagram_data
    });
  }

  initConnection(user: User,id:string) {
    this.socket.emit('enter-room', {
      usuario: user,
      diagrama_id : id
    });
  }


  updateDiagram(diagrama_id:string,doc: string,o:string):Observable<any> {
    console.log(`Actualizando ${diagrama_id}`);
    return this.http.post<any>(this.serverUrl+'/diagupdate',{
        id: diagrama_id,
        data : doc,
        owner: o
    });
  }
}
