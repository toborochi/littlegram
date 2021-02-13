import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(private router: Router) { }

  isChecked = false;

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    pass: new FormControl('')
  });

  loginForm = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl('')
  });

  ngOnInit(): void {
  }

  goDashboard(){
    let x = Math.trunc(Math.random()*1000);
    localStorage.setItem('iden',x.toString());
    console.log(localStorage.getItem('iden'));
    this.router.navigateByUrl('/dashboard');
  }

  registrar(){
    console.log(this.registerForm.value);
    console.log(this.isChecked);
  }

  iniciar(){
    console.log(this.loginForm.value);
    console.log(this.isChecked);
  }

}
