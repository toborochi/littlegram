import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import firebase from 'firebase';
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  currentDiagram = this.socket.fromEvent<any>('update-diagram');
  firstDiagram = this.socket.fromEvent<any>('get-diagram');

  constructor(private socket: Socket) { }

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




}
