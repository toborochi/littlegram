import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../servicios/auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(private router: Router,
              private  authService:  AuthService,
              private spinner: NgxSpinnerService) { }

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



  registrar(){
    console.log(this.registerForm.value);
    console.log(this.isChecked);

    this.authService.register(
      this.registerForm.value.name,
      this.registerForm.value.email.split(" ", 1)[0],
      this.registerForm.value.pass,
      this.spinner
      );

  }

  iniciar(){
    console.log(this.loginForm.value);
    console.log(this.isChecked);
    this.authService.login(
      this.loginForm.value.email.split(" ", 1)[0],
      this.loginForm.value.pass,
      this.spinner
    );
  }

}
