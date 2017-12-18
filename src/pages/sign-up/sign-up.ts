import { MenuController } from "ionic-angular";
/*
  Name - Signup Component
  Functionality - For registering of users using firebase.
  Author - Shantanu Kamdi
  Date - 07/06/2017
*/
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
/* Forms module */
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
/* Logger Service */
import { Logger } from "../../providers/logger";
/* Auth Service */
import { AuthProvider } from "../../providers/auth";

import * as firebase from "firebase";

@IonicPage()
@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html"
})
export class SignUp {
  /* FormGroup which will be used in html */
  private form: FormGroup;

  fireStore = firebase.database().ref("/pushTokens");
  typeOfCourse = "";
  levels = [
    "CA Final",
    "CA Intermediate",
    "CA Foundation",
    "CS Professional",
    "CS Executive",
    "CS Foundation"
  ];
  caLevels = ["final", "intermediate", "foundation"];
  csLevels = ["professional", "executive", "foundation"];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private logger: Logger,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private _menu: MenuController
  ) {
    /* Creating form using formBuilder module and applying validations.*/
    this.form = formBuilder.group({
      fullName: [
        "",
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ],
      emailId: [
        "",
        Validators.compose([Validators.required, Validators.email])
      ],
      phoneNumber: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ])
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      confirmPassword: [
        "",
        Validators.required,
        this.validatePasswordConfirmation.bind(this)
      ],
      address: [""],
      pincode: [
        "",
        Validators.compose([Validators.minLength(6), Validators.maxLength(6)])
      ],
      attemptDate: [
        new Date().toISOString(),
        Validators.compose([Validators.required])
      ],
      dob: [""],
      gender: [""],
      typeOfCourse: ["", Validators.required]
    });
    _menu.swipeEnable(false);
  }

  ionViewDidLoad() {}

  /* Signup user method which is called in click */
  signupUser() {
    this.logger.log("signupUser() method");

    /* Creating user object using form values*/
    let userData = {
      fullName: this.form.value.fullName,
      emailId: this.form.value.emailId,
      phoneNumber: this.form.value.phoneNumber,
      address: this.form.value.address,
      pincode: this.form.value.pincode,
      attemptDate: this.form.value.attemptDate,
      dob: this.form.value.dob,
      favoriteVideos: [],
      gender: this.form.value.gender,
      typeOfCourse: this.form.value.typeOfCourse,
      timeOfCreation: Date.now()
    };

    let userPassword = this.form.value.password;

    /* Loader */
    let loader = this.loadingCtrl.create({
      content: "Registering User..."
    });

    loader.present();

    /* Auth service registerUser method */
    this.authProvider.registerUser(userData, userPassword).then(
      () => {
        const alert = this.alertCtrl.create({
          title: "Success",
          message: "Please validate your email address",
          buttons: ["Ok"]
        });
        alert.present();

        /* Resetting the form once everything is done */
        this.form.reset();
        /* Setting the stack root to login */
        this.navCtrl.setRoot("SignUpSuccessPage");
        /* Dismissing the loader */
        loader.dismiss();
      },
      error => {
        /* handle the errors in any */
        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: "Something went wrong!!",
          message: error.message,
          buttons: ["Ok"]
        });
        alert.present();
      }
    );
  }

  /* Navigate back to login */
  navigateToLogin() {
    this.logger.log("navigateToLogin() method");
    /* For avoiding the stacking of the same page again and again */
    this.navCtrl.setRoot("LoginWithEmailPage");
  }
  validatePasswordConfirmation(control: FormControl): any {
    if (this.form) {
      return Promise.resolve(
        control.value === this.form.get("password").value
          ? null
          : { notSame: true }
      );
    }
  }

}
