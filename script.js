'use strict';
// ASSignment 1
// document query
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
const healthyPetBtn = document.getElementById('healthy-btn');
const bmiCalBtn = document.getElementById('bmi-btn');
const navBar = document.getElementById('sidebar');

// saved array
let healthyPetArr = [];

console.log(petArr);

// localStorage.clear();
// function to clear data on submit click
function clearInput() {
  idInput.value = '';
  ageInput.value = '';
  nameInput.value = '';
  typeInput.value = 'Select Type';
  weightInput.value = '';
  lengthInput.value = '';
  breedInput.value = 'Select Breed';
  vaccinatedInput.checked = '';
  dewormedInput.checked = '';
  sterilizedInput.checked = '';
  colorInput.value = '#000000';
}

// function to add data to table
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
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${petArr[i].ID}')" >Delete</button></td>`;
    tableBodyEl.appendChild(row);
  }
}
renderTableData(petArr);
// function filter pet type
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

//  deletePet(pet) , dùng onclick để thay cho addeventlistener
const deletePet = function (petid) {
  if (confirm('Are you sure ?')) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].ID === petid) {
        petArr.splice(i, 1);
      }
    }
  }
  saveToStorage('petArr', petArr);
  renderTableData(petArr);
};
// submit button
submitBtn.addEventListener('click', function () {
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
  console.log(data);

  // valiation test
  let IsIDValiation = true;
  for (let a = 0; a < petArr.length; a++) {
    if (data.ID == petArr[a].ID) {
      alert('the ID must be unique!');
      IsIDValiation = false;
      break;
    } else {
      IsIDValiation = true;
    }
  }
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
  // console.log(IsValiation);
  //push data into object
  if (IsValiation && IsIDValiation) {
    petArr.push(data);
    renderTableData(petArr);
    saveToStorage('petArr', petArr);
    clearInput();
    console.log(petArr);
  }
});
// function kiểm tra độ khỏe mạnh của thú cưng
//  add data filter vào arr healthy pet
let healthyCheck = true;
healthyPetBtn.addEventListener('click', function () {
  // show all checked pet (vaccinated, dewormed,sertilized)
  //button change to 'show all pet'

  if (healthyCheck) {
    healthyPetArr = petArr.filter((pet) => {
      return pet.Vaccinated && pet.Dewormed && pet.Sterilized;
    });

    renderTableData(healthyPetArr);
    healthyPetBtn.innerHTML = 'Show all pet';
    console.log(healthyPetBtn.innerHTML);
    healthyCheck = false;
  } else {
    // return to petarr,
    // button change to Show Healthy Pet
    renderTableData(petArr);
    saveToStorage('petArr', petArr);
    healthyPetBtn.innerHTML = 'Show Healthy Pet';
    healthyCheck = true;
  }
});

navBar.addEventListener('click', function () {
  this.classList.toggle('active');
});
console.log(navBar);
