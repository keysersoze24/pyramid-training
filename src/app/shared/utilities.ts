import { LocalStorageKeyEnum } from "./constants";

export class Utilities {
    static newGuid(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    static getLocalStorageItem(localStorageKey: LocalStorageKeyEnum): any {
      const stringifyObj: string = window.localStorage.getItem(localStorageKey);
      const result = JSON.parse(stringifyObj);
      return result;
    }

    static setLocalStorageItem(localStorageKey: LocalStorageKeyEnum, item: any): void {
      const stringifyObj = JSON.stringify(item);
      window.localStorage.setItem(localStorageKey, stringifyObj);
    }

    static removeLocalStorageItem(localStorageKey: LocalStorageKeyEnum): void {
      window.localStorage.removeItem(localStorageKey);
    }
}
