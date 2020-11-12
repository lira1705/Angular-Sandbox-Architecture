import { Pipe, PipeTransform } from '@angular/core';
import { gmtValues } from '../constants/gmt-values';

@Pipe({
  name: 'getFormattedGMT'
})
export class getFormattedGMTPipe implements PipeTransform {

  transform(value: string): string {
    if(gmtValues[value]) {
      return gmtValues[value];
    }
    return '';
  }
}