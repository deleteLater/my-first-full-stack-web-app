import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'stringTruncate'
})
export class StringTruncatePipe implements PipeTransform {

  transform(value: string, maxLength = 25): string {

    if (value.length <= maxLength) {
      return value;
    }

    return value.slice(0, maxLength) + '...';
  }
}
