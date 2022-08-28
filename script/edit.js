'use strict';
const submitBtn = document.getElementById('submit-btn');
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const tableBodyEl = document.getElementById('tbody');
const editForm = document.getElementById('container-form');
const editBtn = document.querySelectorAll('#edit-btn');
const petBr = getFromStorage('breedArr');
function renderTableData(petArr) {
  tableBodyEl.innerHTML = '';
  for (let i = 0; i < petArr.length; i++) {
    let IsVaccinated = petArr[i].Vaccinated ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill';
    let IsDewormed = petArr[i].Dewormed ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill';
    let IsSterilized = petArr[i].Sterilized ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill';
    const row = document.createElement('tr');
    row.innerHTML = `
    <th scope="row">${petArr[i].ID}</th>
    <td>${petArr[i].Name}</td>
    <td>${petArr[i].Age}</td>
    <td>${petArr[i].Type}</td>
    <td>${petArr[i].Weight}</td>
    <td>${petArr[i].lengths}</td>
    <td>${petArr[i].Breed}</td>
    <td><i class="bi bi-square-fill" style="color:${petArr[i].Color} "></i></td>
    <td><i class="${IsVaccinated}"></i></td>
    <td><i class="${IsDewormed}"></i></td>
    <td><i class="${IsSterilized}"></i></td>
    
    <td>${petArr[i].date}</td>
    <button type="button" class="btn btn-warning" id="edit-btn" onclick="addToInput('${petArr[i].ID}')">
    Edit 
  </button>`;
    tableBodyEl.appendChild(row);
  }
}
renderTableData(petArr);
//  get Breed from Breed sheet
const dogType = function (arr) {
  return arr.filter((item) => item.type === 'Dog');
};

const catType = function (arr) {
  return arr.filter((item) => item.type === 'Cat');
};
// filter breed after type
function renderBreed(typeArr) {
  breedInput.innerHTML = '';
  for (let i = 0; i < typeArr.length; i++) {
    const option = document.createElement('option');
    option.innerHTML = `
  <option>${typeArr[i].name}</option>
`;

    breedInput.appendChild(option);
  }
}

typeInput.onchange = () => {
  if (typeInput.value === 'Dog') renderBreed(dogType(getFromStorage('breedArr')));
  if (typeInput.value === 'Cat') renderBreed(catType(getFromStorage('breedArr')));
  if (typeInput.value === 'Select Type') renderBreed([]);
};
renderBreed(petBr);
// function edit() {
//   editForm.classList.toggle('hide');
// }

// add to input
function addToInput(pet) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].ID === pet) {
      editForm.classList.remove('hide');
      idInput.value = `${petArr[i].ID}`;
      nameInput.value = `${petArr[i].Name}`;
      ageInput.value = `${petArr[i].Age}`;
      typeInput.value = `${petArr[i].Type}`;
      weightInput.value = `${petArr[i].Weight}`;
      lengthInput.value = `${petArr[i].lengths}`;
      breedInput.value = `${petArr[i].Breed}`;
      colorInput.value = `${petArr[i].Color}`;

      vaccinatedInput.checked = petArr[i].Vaccinated;
      dewormedInput.checked = petArr[i].Dewormed;
      sterilizedInput.checked = petArr[i].Sterilized;
    }
  }
}
// submit edit input by using input data to the petArr
function editData() {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].ID === idInput.value) {
      editForm.classList.remove('hide');
      petArr[i].ID = `${idInput.value}`;
      petArr[i].Name = `${nameInput.value}`;
      petArr[i].Age = `${ageInput.value}`;
      petArr[i].Type = `${typeInput.value}`;
      petArr[i].Weight = `${weightInput.value}`;
      petArr[i].lengths = `${lengthInput.value}`;
      petArr[i].Breed = `${breedInput.value}`;
      petArr[i].Color = ` ${colorInput.value}`;

      petArr[i].Vaccinated = vaccinatedInput.checked;
      petArr[i].Dewormed = dewormedInput.checked;
      petArr[i].Sterilized = sterilizedInput.checked;
    }
  }
}

submitBtn.addEventListener('click', function () {
  // check valiation
  const data = {
    ID: idInput.value,
    Name: nameInput.value,
    Age: ageInput.value,
    Type: typeInput.value,
    Weight: Number(weightInput.value),
    lengths: Number(lengthInput.value),
    Breed: breedInput.value,
    Color: colorInput.value,
    Vaccinated: vaccinatedInput.checked,
    Dewormed: dewormedInput.checked,
    Sterilized: sterilizedInput.checked,
    date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
  };
  let IsValiation = true;
  if (data.ID.trim() === '') {
    alert('please Insert ID');
    IsValiation = false;
  } else if (data.Name === '') {
    alert('please insert Name');
    IsValiation = false;
  } else if (data.Age < 1 || data.Age > 15 || '') {
    alert('the age number must be between 1 and 15!');
    IsValiation = false;
  } else if (data.Type == 'Select Type') {
    alert('please select type!');
    IsValiation = false;
  } else if (data.Weight < 1 || data.Weight > 15 || '') {
    alert('the weight must be between 1 and 15!');
    IsValiation = false;
  } else if (data.lengths < 1 || data.lengths > 100 || '') {
    alert('the length must be between 1 and 100!');
    IsValiation = false;
  } else if (data.Breed == 'Select Breed') {
    alert('please select Breed!');
    IsValiation = false;
  } else {
    IsValiation = true;
  }
  if (IsValiation) {
    for (let i = 0; i < petArr.length; i++) {
      editData();
    }
    saveToStorage('petArr', petArr);
    renderTableData(petArr);
    editForm.classList.toggle('hide');
    console.log(petArr);
  }
});
