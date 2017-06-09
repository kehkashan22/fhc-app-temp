import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

/* Forms module */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* Logger Service */
import { Logger } from '../../providers/logger';
/* Auth Service */
import { AuthProvider } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  private forgotPasswordForm: FormGroup;

  /* For Validation purposes */
  private submitAttempt: boolean = false;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private _auth: AuthProvider,
              private _logger: Logger,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController            
  ) {
    this.forgotPasswordForm = formBuilder.group({
      emailId: [ '', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  resetPassword(){
    let loader = this.loadingCtrl.create({
      content: 'Checking Email and Sending Mail'
    });

    loader.present();

    let userEmailId = {
      emailId: this.forgotPasswordForm.value.emailId
    }

    this._auth.forgotPassword(userEmailId).then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Email containing reset password link sent successfully',
        buttons: ['Ok']
      });

      alert.present();
      loader.dismiss();
      this.navCtrl.pop();
    }, (error) => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: error.message,
        buttons: ['Ok']
      });

      alert.present();
      loader.dismiss();
      
    });
  }

  navigateToLogin(){
    this.navCtrl.setRoot('LoginWithEmailPage');
  }
}
