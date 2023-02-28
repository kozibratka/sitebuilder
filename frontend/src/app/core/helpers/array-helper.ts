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
  static objectWithLevelToNestedArray(objects: {level: number}[]) {
    const levelMap = new Map<number, any[]>();
    let currentLevel = -1;
    const treeCallback = (data: {level: number}) => {
      if (data.level > currentLevel) {
        if (!data.level) {
          levelMap.set(data.level, []);
        } else {
          const newArray = [];
          levelMap.get(data.level - 1).push(newArray);
          levelMap.set(data.level, newArray);
        }
      }
      const currentArray = levelMap.get(data.level);
      currentArray.push(data);
      currentLevel = data.level;
    };
    objects.forEach(treeCallback);
    return levelMap.get(0);
  }
  static recalculateNestedArrayObjectLevel(dataArray: {level: number}[]) {
    const callback = (data: {level: number}[], currentLevel = 0) => {
      for (const entry of data) {
        if (Array.isArray(entry)) {
          callback(entry, currentLevel + 1);
        } else {
          entry.level = currentLevel;
        }
      }
    };
    callback(dataArray);
  }
}
