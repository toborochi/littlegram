import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  message : string;
  private messageSource = new  BehaviorSubject(this.message);
  currentMessage = this.messageSource.asObservable();

  constructor() { }
}
