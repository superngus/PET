'use strict';
const tableBodyEl = document.getElementById('tbody');
const findBtn = document.getElementById('find-btn');
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const typeInput = document.getElementById('input-type');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const petBr = getFromStorage('breedArr');
// rendertable
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
    `;
    tableBodyEl.appendChild(row);
  }
}
renderTableData(petArr);
// clear input
function clearInput() {
  nameInput.value = '';
  typeInput.value = 'Select Type';
  breedInput.value = 'Select Breed';
  vaccinatedInput.checked = '';
  dewormedInput.checked = '';
  sterilizedInput.checked = '';
}
clearInput();
// input Breed
const dogType = function (arr) {
  return arr.filter((item) => item.type === 'Dog');
};

const catType = function (arr) {
  return arr.filter((item) => item.type === 'Cat');
};
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
let searchArr = getFromStorage('petArr');

// find Item
findBtn.addEventListener('click', function () {
  if (idInput.value !== '') {
    searchArr = searchArr.filter((item) => item.ID.includes(idInput.value));
  }

  if (nameInput.value !== '') {
    searchArr = searchArr.filter((item) => item.Name.includes(nameInput.value));
  }

  if (typeInput.value !== 'Select Type')
    searchArr = searchArr.filter((item) => item.Type === typeInput.value);
  if (breedInput.value !== 'Select Breed')
    searchArr = searchArr.filter((item) => item.Breed === breedInput.value);

  if (vaccinatedInput.checked) {
    searchArr = searchArr.filter((item) => item.Vaccinated === true);
  }
  if (dewormedInput.checked) {
    searchArr = searchArr.filter((item) => item.Dewormed === true);
  }
  if (sterilizedInput.checked) {
    searchArr = searchArr.filter((item) => item.Sterilized === true);
  }

  renderTableData(searchArr);
  clearInput();
  // đẩy lại data để tiếp tục search
  searchArr = getFromStorage('petArr');
});
