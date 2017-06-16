import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoaderProvider {

  constructor(private loader : LoadingController) {}

  loading(content: string, timeout: number){

  }

}
