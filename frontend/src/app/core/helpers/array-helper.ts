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
  static objectWithLevelToArray(objects: {level: number}[]) {
    const levelMap = new Map<number, any[]>();
    let currentLevel = 0;
    const treeCallback = (data: {level: number}) => {
      if (!levelMap.get(data.level)) {
        const newArray = [];
        levelMap.set(data.level, newArray);
        if (data.level > currentLevel) {
          levelMap.get(data.level - 1).push(newArray);
        }
      }
      const currentArray = levelMap.get(data.level);
      currentArray.push(data);
      currentLevel = data.level;
    };
    objects.forEach(treeCallback);
    return levelMap.get(0);
  }
}
