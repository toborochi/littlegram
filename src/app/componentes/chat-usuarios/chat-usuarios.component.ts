import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {MatList, MatListItem} from '@angular/material/list';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import firebase from 'firebase';
import User = firebase.User;
import {ChatService} from '../../servicios/chat/chat.service';
import {Observable, Subscription} from 'rxjs';
const AVATAR_URL = 'https://pbs.twimg.com/profile_images/609439993094770690/MqfzEbtj.jpg';

@Component({
  selector: 'app-chat-usuarios',
  templateUrl: './chat-usuarios.component.html',
  styleUrls: ['./chat-usuarios.component.css']
})
export class ChatUsuariosComponent implements OnInit,AfterViewInit,OnDestroy {
  ngOnDestroy(): void {
    console.log('Cerrando Chat');
    //this.chat.unsubscribe();
    //this.chatService.leaveChat(this.room);
  }

  onSendMessage = new EventEmitter();

// getting a reference to the overall list, which is the parent container of the list items
  @ViewChild(MatList, { read: ElementRef, static: true }) matList: ElementRef;

  // getting a reference to the items/messages within the list
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  action = Action;
  messages: Message[] = [];
  messageContent: string;

  private initModel(): void {
  }



  public sendMessage(message: string): void {

    console.log(message);

    if (!message) {
      return;
    }

    this.onSendMessage.emit(this.messages);
    this.chatService.sendMessage(this.user,this.room,message);

    /*
    this.messages.push({
      from: this.user,
      action: undefined,
      content: message
    });*/

    this.messageContent = null;
  }

  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  user:User;
  room:string;
  chat : Subscription;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private chatService: ChatService) {
      this.user = data.user;
      this.room = data.room;
      this.messages=data.messages;
  }

  ngOnInit(): void {
    console.log('Iniciando Chat');
    /*
    this.chat = this.chatService.currentChat.subscribe(data=>{
      console.log('Recibiendo Mensajes ',data);
      this.messages.push({
        from: data.from,
        action: undefined,
        content: data.content
      });
      console.log(this.messages.length);
    });*/

    this.initModel();

  }

  ngAfterViewInit(): void {

    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  username(id:string,name:string){
    return (this.user.uid===id)?'Tú':name;
  }

}



export enum Action {
  JOINED,
  LEFT,
  RENAME
}


export interface Message {
  from?: User;
  content?: any;
  action?: Action;
}
