import { DefaultValue, AtomEffect } from 'recoil';

import _ from 'lodash';

export const localStorageEffect: <T>(key: string, defaultValue: any) => AtomEffect<T> =
  (key: string, defaultValue?) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    console.log(key);
    console.log(savedValue);
    if (
      !_.isNull(savedValue)
      // 계속 확인해야될 값들이 있는 key값을 아래 작성할 것
      // _.has(defaultValue, 'tableColumn') &&
      // _.has(JSON.parse(savedValue), 'tableColumn') &&
      // !_.isEqual(defaultValue.tableColumn.length, JSON.parse(savedValue).tableColumn.length)
    ) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    } else if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };
