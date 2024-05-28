const tab = [
  { nom: 'Diallo', prenom: 'Bine', age: 13, note: 12.1, moy: 13 },
  { nom: 'Barry', prenom: 'maeiama', age: 14, note: 13.1, moy: 13 },
  { nom: 'Diallo', prenom: 'Ndeye', age: 12, note: 16.1, moy: 13 },
  { nom: 'Diallo', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'Diallo', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'Diallo', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'Diallo', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'Diallo', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'Diallo', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'Diallo', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'Dgh', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'Dia', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'Dio', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'Diallo', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'Diallbhko', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'Diallo', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'Diallhjhgjho', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'viallo', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
  { nom: 'Diallo', prenom: 'hawa', age: 16, note: 11.1, moy: 13 },
];
// variable pour la pagnination
let bNext = document.getElementsByClassName('next');
let bPrev = document.getElementsByClassName('prev');
let page = 5;
let stars = 0;
let actuelPage = 1;
let maxPage = Math.ceil(tab.length / page);

// affichage du tableau dans le dom inclus pagination
function showTab() {
  let table = `<table><thead><tr><th>Nom</th><th>prenom</th><th>age</th><th>Note</th><th>Moyenne</th></tr></thead><tbody>`;
  for (let i = stars; i < stars + page; i++) {
    if (i < tab.length) {
      table += `<tr><td>  ${tab[i].nom} </td><td>  ${tab[i].prenom} </td><td> ${tab[i].age} </td><td> ${tab[i].note} </td><td> ${tab[i].moy} </td></tr>`;
    }
  }
  table += '</tbody></table>';
  document.querySelector('.affichage').innerHTML = table;
  item();
}
showTab();

// Calcul moyenne
let sommeMoy = 0;
function lamoyenne() {
  for (let j = 0; j < tab.length; j++) {
    sommeMoy += tab[j].note / tab.length;
  }
  document.querySelector(
    '#moyenne'
  ).innerText = `la moyenne des etudiants est : ${sommeMoy}`;
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
  stars = maxPage * page - page;
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
  if (stars + page >= 0) {
    stars -= page;
    actuelPage--;
    showTab();
  }
}
// affichage page
function item() {
  let bItem = (document.getElementById(
    'item'
  ).innerHTML = ` page ${actuelPage} / ${maxPage} `);
}

// filtrer les elements du tableau____________

let filtre = document.getElementById('filtre');
filtre.addEventListener('keyup', function () {
  let keyword = this.value;
  keyword = keyword.toUpperCase();
  let table = document.querySelector('.affichage table');
  let tr = document.getElementsByTagName('tr');
  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName('td')[0];
    if (td) {
      let tdValue = td.innerText || td.textContent;
      tdValue = tdValue.toUpperCase();
      if (tdValue.indexOf(keyword) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
});
