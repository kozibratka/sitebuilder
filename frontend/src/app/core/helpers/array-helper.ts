import * as _ from 'lodash';

export class ArrayHelper {

  static reinitArray(arrayToReinit: any[], newValues: any[]) {
    arrayToReinit.length = 0;
    arrayToReinit.push(...newValues);
  }

  static sortTree(data: {children: any[]}[], sortProperties = ['name']) {
    let sortFnc = (dataArray: any[]) => {
      let sorted = _.orderBy(dataArray, sortProperties, ['asc']);
      this.reinitArray(dataArray, sorted);
      dataArray.filter((value: any) => value.children ?? null).forEach(value => {
        sortFnc(value.children);
      })
    }
    sortFnc(data);
  }
  static objectWithLevelToNestedArray(objects: {level: number}[]) {
    const levelMap = new Map<number, any[]>();
    let currentLevel = -1;
    const treeCallback = (data: {level: number, children?: []}) => {
      data = {...data};
      if (!data.hasOwnProperty('children')) {
        data.children = [];
      }
      if (data.level > currentLevel) {
        if (!data.level) {
          levelMap.set(data.level, []);
        } else {
          const parentLevelArray = levelMap.get(data.level - 1);
          const lastInParentArray = parentLevelArray[parentLevelArray.length - 1];
          levelMap.set(data.level, lastInParentArray.children);
        }
      }
      const currentArray = levelMap.get(data.level);
      currentArray.push(data);
      currentLevel = data.level;
    };
    objects.forEach(treeCallback);
    return levelMap.get(0);
  }
  static recalculateNestedArrayObjectLevel(dataArray: {level: number}[], clearChildren = false) {
    const callback = (data: {level: number, children?: []}[], currentLevel = 0) => {
      for (const entry of data) {
        if (entry.children.length) {
          callback(entry.children, currentLevel + 1);
          if (clearChildren) {
            entry.children.length = 0;
          }
        } else {
          entry.level = currentLevel;
        }
      }
    };
    callback(dataArray);
  }

  static flatNestedArrayObject(dataArray: {children?: []}[]): any[] {
    const result = [];
    const callback = (data: {children?: []}[], currentLevel = 0) => {
      for (const entry of data) {
        const newData = {...entry};
        delete newData.children;
        result.push(newData);
        if (entry.children.length) {
          callback(entry.children, currentLevel + 1);
        }
      }
    };
    callback(dataArray);

    return result;
  }
}
