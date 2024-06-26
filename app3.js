const tab = [];
let prompte = parseInt(prompt('entrez un nombre'));
for (let i = 0; i <= prompte; i++) {
  let nam = prompt(`entrez le nom ${i}`);
  localStorage.setItem('name', nam);
  localStorage.getItem('name');
  let nom = localStorage.getItem('name');

  let prenam = prompt(`entrez le prenom ${i}`);
  localStorage.setItem('prenom', prenam);
  localStorage.getItem('prenom');

  let prenon = localStorage.getItem('prenom');
  console.log(prenon);

  tab.push({ nom: nom, prenom: prenon, age: '', note: '', moy: '' });

  // affichage du tableau dans le dom inclus pagination
  let table = `<table><thead><tr><th>Nom</th><th>prenom</th><th>age</th><th>Note</th><th>Moyenne</th></tr></thead><tbody>`;
  for (let i = 0; i < tab.length; i++) {
    let tabs = tab[i];
    let row = [tabs]
      .map(
        (tab) =>
          `<tr>
        <td>${tab.nom}</td>
        <td>${tab.prenom}</td>
        <td>${tab.age}</td>
        <td>${tab.note}</td>
        <td>${tab.moy}</td>
      </tr>`
      )
      .join('');
    table += row;
  }
  table += '</tbody></table>';
  document.querySelector('.affichage').innerHTML = table;
}

function updateCards() {
  let nombreAge = tab.reduce((acc, cur) => acc + (cur.age ? 1 : 0), 0);
  let sommeAge = tab.reduce((acc, cur) => acc + (cur.age || 0), 0);
  let nombreNote = tab.reduce((acc, cur) => acc + (cur.note ? 1 : 0), 0);
  let sommeNote = tab.reduce((acc, cur) => acc + (cur.note || 0), 0);

  carteNombreAge.innerHTML = `Nombre d'âges : ${nombreAge}`;
  carteSommeAge.innerHTML = `Somme des âges : ${sommeAge}`;
  carteNombreNote.innerHTML = `Nombre de notes : ${nombreNote}`;
  carteSommeNote.innerHTML = `Somme des notes : ${sommeNote.toFixed(2)}`;
}
