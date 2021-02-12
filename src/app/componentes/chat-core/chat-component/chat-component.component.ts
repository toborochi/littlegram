import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatList, MatListItem} from '@angular/material/list';
import {getSortHeaderNotContainedWithinSortError} from '@angular/material/sort/sort-errors';

const AVATAR_URL = 'https://pbs.twimg.com/profile_images/609439993094770690/MqfzEbtj.jpg';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})
export class ChatComponentComponent implements OnInit, AfterViewInit {

  // getting a reference to the overall list, which is the parent container of the list items
  @ViewChild(MatList, { read: ElementRef, static: true }) matList: ElementRef;

  // getting a reference to the items/messages within the list
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string;

  storedUserName: string;


  constructor() { }

  ngOnInit(): void {
    this.initModel();
  }

  ngAfterViewInit(): void {
    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  private initModel(): void {
    const randomId = 45;
    this.user = {
      id: randomId,
      avatar: `${AVATAR_URL}/${randomId}.png`
    };
  }



  public sendMessage(message: string): void {

    console.log(message);

    if (!message) {
      return;
    }

    let usr : string = 'Leonardo Añez';
    let splitted = usr.split(" ", 2);

    this.messages.push({
      from: {
        name: 'Leonardo Añez',
        id: 45,
        avatar: `https://avatar.oxro.io/avatar.svg?name=${splitted[0]}`
      },
      action: undefined,
      content: message
    });

    this.messageContent = null;
  }

  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

}


export enum Action {
  JOINED,
  LEFT,
  RENAME
}

export interface User {
  id?: number;
  name?: string;
  avatar?: string;
}

export interface Message {
  from?: User;
  content?: any;
  action?: Action;
}
