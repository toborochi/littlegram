import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NuevoDiagramaComponent} from '../dialogos/nuevo-diagrama/nuevo-diagrama.component';

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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    this.dialog.open(NuevoDiagramaComponent);


  }

}
