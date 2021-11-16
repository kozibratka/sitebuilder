import {TrackByFunction} from '@angular/core';

export class Helper {

  static getTrackByFunction<T>(propertyName: string = 'id'): TrackByFunction<T> {
    return (index: number, obj) => {
      return obj[propertyName];
    };
  }
}
