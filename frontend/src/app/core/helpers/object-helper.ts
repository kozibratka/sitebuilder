export class ObjectHelper {
  static reinitObject(target: {}, source: {}) {
    for (const key in target) {
      delete target[key];
    }
    Object.assign(target, source);
  }

  static copyToRaw(source: any) {
    return JSON.parse(JSON.stringify(source))
  }

  static toArray() {

  }
}
