import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import firebase from 'firebase';
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  currentChat = this.socket.fromEvent<any>('new-message');

  constructor(private socket: Socket) { }

  leaveChat(room:string){
    this.socket.emit('leave-room',{
      diagrama_id:room
    });
  }

  sendMessage(user: User,room:string,message: string) {
    this.socket.emit('chat-message', {
      usuario: user,
      diagrama_id: room,
      mensaje: message
    });
  }

}
