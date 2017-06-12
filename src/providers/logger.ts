/*
  Name - Logger Service 
  Functionality - Logs Messages, Errors, and Information.
  Author - Shantanu Kamdi
  Date - 07/06/2017
*/
import { Injectable } from '@angular/core';

@Injectable()
export class Logger {

  /* Current Date */
  private currentDate: Date ;

  constructor() {
    console.log('Hello Logger Provider');
    // Setting the current date
    this.currentDate = new Date();

  }

  /* Logs a message in the console */
  log(message: String){
    console.log(new Date() + ' ' + message);
  }

  /* Logs an error in the console */
  error(message: String){
    console.error(new Date() + ' ' + message);
  }

  /* Logs an information message in the console */
  info(message: String){
    console.info(new Date() + ' ' + message);
  }
}