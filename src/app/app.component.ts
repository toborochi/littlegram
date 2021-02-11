
import {Component, OnInit, ViewEncapsulation,  AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class AppComponent implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }


}
