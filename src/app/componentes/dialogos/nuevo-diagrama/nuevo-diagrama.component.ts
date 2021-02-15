import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Diagrama} from '../../../modelos/diagrama';
import {AuthService} from '../../../servicios/auth/auth.service';
import {DashboardService} from '../../../servicios/dashboard/dashboard.service';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
  selector: 'app-nuevo-diagrama',
  templateUrl: './nuevo-diagrama.component.html',
  styleUrls: ['./nuevo-diagrama.component.css']
})
export class NuevoDiagramaComponent implements OnInit {

  creating : boolean = false;

  createDiagramForm = new FormGroup({
    asignment: new FormControl(''),
    name: new FormControl('')
  });


  constructor(public dialog: MatDialog,
              private router: Router,
              private authService: AuthService,
              private dashboardService: DashboardService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.spinner.hide();
  }

  async goEditor()  {
    //this.dialog.closeAll();

    let diagrama : Diagrama = {
      data: null,
      asignment: this.createDiagramForm.value.asignment,
      date_closed: null,
      date_create:null,
      iden: null,
      name: this.createDiagramForm.value.name,
      owner: this.authService.user.uid
    };

    this.creating=true;
    console.log('Intentando crear: ',diagrama);
    this.spinner.show();
    let sr  = await this.dashboardService.createDiagram(diagrama).subscribe(value=>{
      console.log(value.data.diagram_id);
      this.creating=false;
      this.spinner.hide();
      //this.router.navigateByUrl(`/editor/${value.data.diagram_id}`);
    });


  }

}
