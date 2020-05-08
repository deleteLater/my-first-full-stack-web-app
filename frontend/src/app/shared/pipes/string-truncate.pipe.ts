import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'stringTruncate'
})
export class StringTruncatePipe implements PipeTransform {

  transform(value: string, maxLength = 25): string {
    return value.slice(0, maxLength) + '...';
  }

}
