import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  folders: any[] = [
    {
      name: 'Estructuras de Datos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Estructuras de Datos',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Introducción a la Informática',
      updated: new Date('1/28/16'),
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
