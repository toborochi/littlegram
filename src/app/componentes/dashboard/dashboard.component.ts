import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NuevoDiagramaComponent} from '../dialogos/nuevo-diagrama/nuevo-diagrama.component';
import {MatButtonToggleAppearance} from '@angular/material/button-toggle';
import { faDownload,faEye } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../servicios/auth/auth.service';
import {Diagram, IExportOptions} from '@syncfusion/ej2-angular-diagrams';
import {DashboardService} from '../../servicios/dashboard/dashboard.service';
import {Diagrama} from '../../modelos/diagrama';
import firebase from 'firebase';
import User = firebase.User;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {

  u : User = JSON.parse(localStorage.getItem('user'));

  ngAfterViewInit(): void {
    this.dashboardService.listarDiagram(this.u.uid).subscribe(d=> {
      this.folders = d.data.lista;
    });
  }

  download_icon= faDownload;
  eye_icon= faEye;
  folders: Diagrama[] = [];

  disabled = false;
  appearance: MatButtonToggleAppearance = 'standard';
  constructor(public dialog: MatDialog,
              private dashboardService: DashboardService,
              private authService :AuthService) {
  }

  ngOnInit(): void {
    this.u  = JSON.parse(localStorage.getItem('user'));

  }


  get photoUrl() :string{

    return ((this.u)?this.u.photoURL : "");
  }

  getUserName():string{
    if(this.u){
      return " "+this.u.displayName;
    }
    return "";
  }

  openDialog(){
    this.dialog.open(NuevoDiagramaComponent).afterClosed().subscribe(()=>{
      //console.log('CERRADO');
      this.dashboardService.listarDiagram(this.u.uid).subscribe(d=> {
        this.folders = d.data.lista;
      });
    });


  }

  downloadImage(data:string){
    console.log(data);
    if(data){
    let dc = new Diagram();
    let x : IExportOptions = {
      format: 'PNG',
      fileName: 'imagen',

    };
    dc.exportDiagram(x);
    }
  }

  closeSesion(){
    this.authService.logout();
  }

}
