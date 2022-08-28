'use strict';

const saveToStorage = function saveToStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
};
function getFromStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

const breedArr = getFromStorage('breedArr');
//
const petArr = getFromStorage('petArr');
console.log(petArr);
