import { Pipe, PipeTransform } from '@angular/core';
import { hardcodedValues } from '../constants/hardcoded-values';

@Pipe({
  name: 'getHardCoded'
})
export class GetHardCodedPipe implements PipeTransform {

  transform(value: string): string|undefined {
    const stringArray: string[] = value.split('.');
    if(stringArray) {
      let hardcodedValue = hardcodedValues[stringArray.shift()];
      for (const string of stringArray) {
        hardcodedValue = hardcodedValue[string];
      }
      if (hardcodedValue) {
        return hardcodedValue;
      } else {
        console.error(
          `
          No properly value set for key '${value}'.
          Please, check available keys.
          Feel free to add new one if you need.
          `
        );
      }
    }
    return undefined;
  }
}