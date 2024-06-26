let carteNombreAge = document.getElementById('carteNombreAge');
let carteSommeAge = document.getElementById('carteSommeAge');
let carteNombreNote = document.getElementById('carteNombreNote');
let carteSommeNote = document.getElementById('carteSommeNote');

// ___________modalDeclaration
let exampleModal = document.querySelector('#exampleModal');
let forModal = document.querySelector('.forModal');
let modalNom = document.getElementById('modalNom');
let modalPrenom = document.getElementById('modalPrenom');
let modalAge = document.querySelector('#modalAge');
let modalNote = document.querySelector('#modalNote');
let butonSave = document.querySelector('#butonSave');
let idCounter = 0; // Nouvelle variable pour générer des identifiants uniques

// Effacer les données stockées dans le localStorage à chaque actualisation de la page
localStorage.removeItem('tab');
// creation du tableau
const tab = [];
// variable pour la pagnination
let bNext = document.getElementsByClassName('next');
let bPrev = document.getElementsByClassName('prev');
let page = 5; // nombre delement par page
let stars = 0; // debut de l'element du tableau
let actuelPage = 1;
let maxPage = Math.ceil(tab.length / page);
// variable input
// ___________OuvertureModalClickButon

forModal.addEventListener('click', function () {
  $(exampleModal).modal('show');
});

butonSave.addEventListener('click', addNewEntry);

function addNewEntry() {
  let nom = modalNom.value;
  let prenom = modalPrenom.value;
  let age = parseInt(modalAge.value);
  let note = parseFloat(modalNote.value);
  let moy = parseFloat(modalNote.value);

  if (nom && prenom && !isNaN(age) && !isNaN(note)) {
    tab.push({
      id: idCounter++,
      nom: nom,
      prenom: prenom,
      age: age,
      note: note,
      moy: moy,
    });
    localStorage.setItem('tab', JSON.stringify(tab));

    $(exampleModal).modal('hide');
    showTab();
    carte();
    lamoyenne();

    modalAge.value = '';
    modalNote.value = '';
    modalNom.value = '';
    modalPrenom.value = '';
  } else {
    alert('Veuillez remplir tous les champs correctement.');
  }
}

// affichage du tableau dans le dom inclus pagination
function showTab() {
  let table = `<table><thead><tr><th>Nom</th><th>Prenom</th><th>Age</th><th>Note</th><th>Moyenne</th><th>Autres</th></tr></thead><tbody>`;
  for (let i = stars; i < stars + page && i < tab.length; i++) {
    let tabs = tab[i];
    let row = [tabs]
      .map(
        (tab) =>
          `<tr data-id="${tab.id}">
        <td>${tab.nom}</td>
        <td>${tab.prenom}</td>
        <td>${tab.age}</td>
        <td>${tab.note}</td>
        <td>${tab.moy}</td>
        <td><button class="modif">Modifier</button><button class="sup">Supprimer</button></td>
      </tr>`
      )
      .join('');
    table += row;
  }
  table += '</tbody></table>';
  document.querySelector('.affichage').innerHTML = table;

  item();
  // creation des buttons
  document.querySelectorAll('.sup').forEach((button) => {
    button.addEventListener('click', function () {
      let row = button.closest('tr');
      let id = row.getAttribute('data-id');
      tab.splice(
        tab.findIndex((item) => item.id == id),
        1
      );
      localStorage.setItem('tab', JSON.stringify(tab));
      row.remove();
      showTab();
      carte();
      lamoyenne();
    });
  });

  document.querySelectorAll('.modif').forEach((button) => {
    button.addEventListener('click', function () {
      let row = button.closest('tr');
      let id = row.getAttribute('data-id');
      let entry = tab.find((item) => item.id == id);
      modalNom.value = entry.nom;
      modalPrenom.value = entry.prenom;
      modalAge.value = entry.age;
      modalNote.value = entry.note;

      $(exampleModal).modal('show');

      butonSave.removeEventListener('click', addNewEntry);
      butonSave.addEventListener('click', function saveEdit() {
        entry.nom = modalNom.value;
        entry.prenom = modalPrenom.value;
        entry.age = parseInt(modalAge.value);
        entry.note = parseFloat(modalNote.value);
        entry.moy = parseFloat(modalNote.value);

        localStorage.setItem('tab', JSON.stringify(tab));
        $(exampleModal).modal('hide');
        showTab();
        carte();
        lamoyenne();

        modalAge.value = '';
        modalNote.value = '';
        modalNom.value = '';
        modalPrenom.value = '';
        butonSave.removeEventListener('click', saveEdit);
        butonSave.addEventListener('click', addNewEntry);
      });
    });
  });
}
showTab();

// fonction carte_______________________
function carte() {
  let NombreAge = 0;
  function cardNombreAge() {
    for (let i = 0; i < tab.length; i++) {
      NombreAge += tab[i].age;
    }
    carteSommeAge.innerHTML = NombreAge;
  }
  cardNombreAge();

  // la somme des notes________________________
  let SommeNote = 0;
  function cardSommeNote() {
    for (let i = 0; i < tab.length; i++) {
      SommeNote += tab[i].note;
    }
    carteSommeNote.innerHTML = SommeNote.toFixed(2);
  }
  cardSommeNote();

  // nombre de note_____________________
  let Nbrnote = 0;
  function NombreNote() {
    for (let i = 0; i < tab.length; i++) {
      if (typeof tab[i].note === 'number') {
        Nbrnote += 1;
      } else {
        console.log(
          "L'objet à l'index " + i + " n'a pas de propriété 'note' valide."
        );
      }
    }
    carteNombreNote.innerHTML = Nbrnote;
  }
  NombreNote();

  // nombre de age_______________________
  let NbrAge = 0;
  function NbreAge() {
    for (let i = 0; i < tab.length; i++) {
      if (typeof tab[i].age === 'number') {
        NbrAge += 1;
      }
    }
    carteNombreAge.innerHTML = NbrAge;
  }
  NbreAge();
}

// local storage

// Calcul moyenne
function lamoyenne() {
  let sommeMoy = 0;
  for (let j = 0; j < tab.length; j++) {
    sommeMoy += tab[j].note / tab.length;
  }
  let somfixeTwo = sommeMoy.toFixed(2);
  document.querySelector(
    '#moyenne'
  ).innerText = `la moyenne des etudiants est : ${somfixeTwo}`;
}

lamoyenne();

//  fonction de pagination

// buton first
function first() {
  stars = 0;
  actuelPage = 1;
  showTab();
}
// buton end
function end() {
  maxPage = Math.ceil(tab.length / page); // Mise à jour de maxPage avant d'afficher la dernière page
  stars = (maxPage - 1) * page;
  actuelPage = maxPage;
  showTab();
}
// buton next
function next() {
  if (stars + page <= tab.length) {
    stars += page;
    actuelPage++;
    showTab();
  }
}
// buton prev
function prev() {
  if (stars - page >= 0) {
    stars -= page;
    actuelPage--;
    showTab();
  }
}
// affichage page
function item() {
  maxPage = Math.ceil(tab.length / page); // Mise à jour de maxPage

  document.getElementById(
    'item'
  ).innerHTML = ` page ${actuelPage} / ${maxPage} `;
}

// filtrage des elements du tableau____________

let filtre = document.getElementById('filtre');
filtre.addEventListener('keyup', function () {
  let keyword = this.value.toUpperCase();
  let table = document.querySelector('.affichage table');
  let tr = table.getElementsByTagName('tr');
  for (let i = 1; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName('td')[0];
    if (td) {
      let tdValue = td.innerText || td.textContent;
      if (tdValue.toUpperCase().indexOf(keyword) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
});
