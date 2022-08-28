'use strict';

const breedTableEL = document.querySelector('#tbody');
// const typeOption = document.querySelector('#inputType');
const submitBtn = document.getElementById('submit-btn');
const idInput = document.getElementById('input-breed');
const typeInput = document.getElementById('input-type');

console.log(breedTableEL);
// Danh sách các Breed được lưu trữ ở trong LocalStorage.
// Mỗi Breed sẽ có: Tên Breed, Breed đó thuộc cho loài nào (Chó hoặc Mèo).
// Có thể thêm/xóa được các Breed.

function renderTableBreed(breedArr) {
  breedTableEL.innerHTML = '';
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <th scope = "row">${i + 1}</td>
        <td>${breedArr[i].name}</td>
        <td>${breedArr[i].type}</td>
        <td>
    <button class="btn btn-danger" onclick="deleteBreed('${breedArr[i].name}')">Delete</button>
  </td>  `;
    breedTableEL.appendChild(row);
  }
}
renderTableBreed(breedArr);
// clear data
function clearInput() {
  idInput.value = '';
  typeInput.value = 'select Type';
}
// delete breedData;
const deleteBreed = function (petid) {
  if (confirm('Are you sure ?')) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breedArr[i].name === petid) {
        breedArr.splice(i, 1);
        saveToStorage('breedArr', breedArr);
        renderTableBreed(breedArr);
      }
      console.log(breedArr);
    }
  }
};

submitBtn.addEventListener(
  'click',
  function () {
    const breedData = {
      name: idInput.value,
      type: typeInput.value,
    };

    let isValiation = true;
    // for (let a = 0; a < breedArr.length; a++) {
    //   if (breedData.name == breedArr[a].name) {
    //     alert('the ID must be unique!');
    //     isValiation = false;
    //     break;
    //   } else {
    //     isValiation = true;
    //   }

    if (breedData.name == '') {
      alert('please input name');
      isValiation = false;
    }
    if (breedData.type == 'Select Type') {
      alert('please choose type !');
      isValiation = false;
    }

    console.log(isValiation);
    if (isValiation) {
      breedArr.push(breedData);
      saveToStorage('breedArr', breedArr);
      renderTableBreed(breedArr);

      clearInput();
      console.log(breedArr);
      console.log(isValiation);
    }
  }
  // }
);
