/*
  Name - Auth Service
  Functionality - Firebase Authentication (login, register, forget password)
  Author - Shantanu Kamdi
  Date - 08/06/2017
*/

import { Injectable } from '@angular/core';
/* Firebase Modules */
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

/* Logger Provider*/
import { Logger } from './logger';

@Injectable()
export class AuthProvider {

  constructor(private af: AngularFireAuth,
              private logger: Logger
  ) {}

  /* Register method
     params: user - fullName, emailId,phoneNumber, password, address, pincode, attemptNumber, attemptDate, dob
  */
  registerUser(user, password): firebase.Promise<any>{
    this.logger.log('registerUser()');
    this.logger.log('User in registerUser() '+user);

    let email = user.emailId;


    return this.af.auth.createUserWithEmailAndPassword(email, password).then(newUser => {
                  firebase.database()
                          .ref('/users')
                          .child(newUser.uid)
                          .set({
                            user : user
                          });
                  firebase.auth().currentUser.sendEmailVerification().then(() => {
                      console.log("Verification email sent");
                  }).catch((error) => {
                      console.log("Failed to send verification email");
                  });
    });
  }

  authenticateAndLogin(user){

    this.logger.log('authenticateAndLogin()');
    this.logger.log('User in authenticateAndLogin() '+user);

    let emailId = user.emailId;
    let password = user.password;

    return this.af.auth.signInWithEmailAndPassword(emailId, password);
  }

  forgotPassword(userEmailId): firebase.Promise<void> {

    let email = userEmailId.emailId;

    return firebase.auth().sendPasswordResetEmail(email);

  }

  logout(): firebase.Promise<any>{
    return this.af.auth.signOut();
  }

  getActiveUser(){
    return firebase.auth().currentUser;
  }
}
