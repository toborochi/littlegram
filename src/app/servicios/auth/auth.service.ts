
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
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password)
    await this.router.navigateByUrl('/dashboard');
  }

  async register(name: string, email: string, password: string,spinner : NgxSpinnerService) {
    spinner.show()
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password).then(
      userData=>{
        userData.user.updateProfile({
          displayName: name,
          photoURL: ''
        });

      }
    );
    await this.sendEmailVerification(spinner);
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
}
