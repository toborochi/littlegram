
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import User = firebase.User;
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from  "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public  afAuth:  AngularFireAuth , public  router:  Router) {

    this.afAuth.authState.subscribe(user => {
      if (user){

        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  get currentUser(){
    return this.afAuth.authState;
  }


  async login(email: string, password: string,spinner : NgxSpinnerService) {
    spinner.show();
    var result = await this.afAuth.signInWithEmailAndPassword(email, password).then(
      (c)=>{
        localStorage.setItem('user', JSON.stringify(c.user));
        this.router.navigateByUrl('/dashboard');
        spinner.hide();
      },
      ()=>{
        spinner.hide();
      }
    );
  }

  async register(name: string, email: string, password: string,spinner : NgxSpinnerService) {

    let splitted = name.split(" ", 1);

    spinner.show()
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password).then(
      userData=>{
        userData.user.updateProfile({
          displayName: name,
          photoURL: `https://avatar.oxro.io/avatar.svg?name=${splitted[0]}`
        });

        console.log(name,'-');
        let s : string =  JSON.stringify(userData.user);
        let u : User = JSON.parse(s);
        u.displayName=name;
        u.photoURL = `https://avatar.oxro.io/avatar.svg?name=${splitted[0]}`;
        localStorage.setItem('user', JSON.stringify(u));
        this.user = u;
        this.sendEmailVerification(spinner);
      },
      ()=>{
        spinner.hide();
      }
    );
  }

  async sendEmailVerification(spinner : NgxSpinnerService) {
    await this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then((data) => {
        spinner.hide();
        this.router.navigateByUrl('/dashboard');
      });
  }

  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    await this.router.navigateByUrl('');
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  async isVerified(){
  }

}
