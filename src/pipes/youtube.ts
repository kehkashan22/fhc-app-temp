import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtube',
})
export class YoutubePipe implements PipeTransform {

   constructor(private dom : DomSanitizer){}

  transform(value: string, ...args) {
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }
}
