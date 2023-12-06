import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: localStorage.getItem('ziio-token') ? true : false,
});

export const loginModalState = atom({
  key: 'loginModalState',
  default: false,
});
