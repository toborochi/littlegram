import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit,AfterViewInit {
  sala: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.sala = this.data.usuarios;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

}
