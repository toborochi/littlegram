import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  currentDiagram = this.socket.fromEvent<any>('diagram-edit');

  constructor(private socket: Socket) { }

  editDiagram(document: any,user:string) {
    this.socket.emit('edit', {
      usuario: user,
      data: document
    });
  }

  initConnection(user: string) {
    this.socket.emit('entrante', {
      usuario: user,
    });
  }




}
