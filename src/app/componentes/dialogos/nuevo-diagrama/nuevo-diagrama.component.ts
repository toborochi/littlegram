import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-nuevo-diagrama',
  templateUrl: './nuevo-diagrama.component.html',
  styleUrls: ['./nuevo-diagrama.component.css']
})
export class NuevoDiagramaComponent implements OnInit {



  constructor(public dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
  }

  goEditor(){
    this.dialog.closeAll();
    this.router.navigateByUrl('/editor/');
  }

}
