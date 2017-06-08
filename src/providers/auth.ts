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
  ) {
    console.log('Hello AuthProvider Provider');
  }

  /* Register method 
     params: user - fullName, emailId,phoneNumber, password, address, pincode, attemptNumber, attemptDate, dob
  */
  registerUser(user): firebase.Promise<any>{
    this.logger.log('registerUser()');
    this.logger.log('User in registerUser() '+user);

    let email = user.emailId;
    let password = user.password;

    return this.af.auth.createUserWithEmailAndPassword(email, password).then(newUser => {
                  firebase.database()
                          .ref('/users')
                          .child(newUser.uid)
                          .set({
                            user: user
                          });
    });
  }

  authenticateAndLogin(){}

  forgetPassword(){}

}
