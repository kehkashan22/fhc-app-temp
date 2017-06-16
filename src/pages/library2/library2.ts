import { Library } from './../../data/library.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-library2',
  templateUrl: 'library2.html',
})
export class Library2Page {

  libraryGroup: Library;
  show : string = '';
  libaryPage = 'LibraryPage';
  constructor(
    private navParams: NavParams) {}

  ngOnInit() {
    this.libraryGroup = this.navParams.data;
  }

//have to add an indicator icon when opening and closing
  toggleDetails(data : string) {
    if(this.show === data){
      this.show = '';
    }else{
          this.show = data;
    }

    // if (data.showDetails) {
    //     data.showDetails = false;
    //     data.icon = 'ios-add-circle-outline';
    // } else {
    //     data.showDetails = true;
    //     data.icon = 'ios-remove-circle-outline';
    // }
  }

}
