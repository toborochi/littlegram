import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goDashboard(){
    let x = Math.trunc(Math.random()*1000);
    localStorage.setItem('iden',x.toString());
    console.log(localStorage.getItem('iden'));
    this.router.navigateByUrl('/dashboard');
  }

}
