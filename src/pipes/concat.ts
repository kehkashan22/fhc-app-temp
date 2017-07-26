import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concat',
})
export class ConcatPipe implements PipeTransform {
  transform(value: string, ...args) {
    return "https://i3.ytimg.com/vi/"+value+"/0.jpg";
  }
}
