import * as _ from 'underscore';
import {List} from 'underscore';

export class ArrayHelper {

  static reinitArray(arrayToReinit: any[], newValues: any[]) {
    arrayToReinit.length = 0;
    arrayToReinit.push(...newValues);
  }

  static syncArrayOfObjects(fromArray: any[], toArray: any[], propertyName = 'id') {
    const array1 = _.flatten<List<{}>>(toArray);
    const array2 = _.flatten(fromArray);
    array1.forEach((value, index) => {
      if (value.hasOwnProperty(propertyName)) {
        array2[index][propertyName] = value[propertyName];
      }
    });
  }
}