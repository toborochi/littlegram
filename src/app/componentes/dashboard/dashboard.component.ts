import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NuevoDiagramaComponent} from '../dialogos/nuevo-diagrama/nuevo-diagrama.component';
import {MatButtonToggleAppearance} from '@angular/material/button-toggle';
import { faDownload,faEye } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../servicios/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  download_icon= faDownload;
  eye_icon= faEye;
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
    },
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
    },
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

  disabled = false;
  appearance: MatButtonToggleAppearance = 'standard';
  constructor(public dialog: MatDialog,
              private  authService:  AuthService) { }

  ngOnInit(): void {
  }

  openDialog(){
    this.dialog.open(NuevoDiagramaComponent);


  }

  closeSesion(){
    this.authService.logout();
  }

}
