import { Pipe, PipeTransform } from '@angular/core';
import { hardcodedValues } from '../constants/hardcoded-values';

@Pipe({
  name: 'getHardCoded'
})
export class GetHardCodedPipe implements PipeTransform {

  transform(value: string): string|undefined {
    if(value) {
      const stringArray: string[] = value.split('.');
      if(stringArray) {
        let hardcodedValue = hardcodedValues[stringArray.shift()];
        for (const string of stringArray) {
          hardcodedValue = hardcodedValue[string];
        }
        if (hardcodedValue) {
          return hardcodedValue;
        }
      }
    }
    return undefined;
  }
}