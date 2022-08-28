'use strict';
const exportBtn = document.getElementById('export-btn');
const importBtn = document.getElementById('import-btn');
// export
exportBtn.addEventListener('click', function () {
  let pet = JSON.stringify(getFromStorage('petArr'));
  function exportpet() {
    if (petArr !== []) {
      let pet = JSON.stringify(getFromStorage('petArr'));

      return pet;
    }
  }

  var blob = new Blob([pet], {
    type: 'text/plain;charset=utf-8',
  });

  saveAs(blob, 'pet.JSON');
});
// import
importBtn.addEventListener('click', function () {
  var file = document.getElementById('input-file').files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = function (evt) {
      saveToStorage('petArr', JSON.parse(evt.target.result));
      alert('file imported');
    };
    reader.onerror = function (evt) {
      alert('file not uploaded');
    };
  }
});
console.log(petArr);
