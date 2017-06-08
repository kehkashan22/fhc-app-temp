import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { Logger } from './logger';

@Injectable()
export class AuthProvider {

  constructor(private af: AngularFireAuth,
              private logger: Logger      
  ) {
    console.log('Hello AuthProvider Provider');
  }

  registerUser(user): firebase.Promise<any>{
    this.logger.log('registerUser()');
    this.logger.log('User in registerUser() '+user);

    let email = user.emailId;
    let password = user.password;

    console.log(user);

    return this.af.auth.createUserWithEmailAndPassword(email, password).then(newUser => {
                  firebase.database()
                          .ref('/users')
                          .child(newUser.uid)
                          .set({
                            user: user
                          })
    });

  }

}
