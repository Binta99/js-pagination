import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDhrKez6N0Fks70xFD3mcXUGUn_a21cn7k',
  authDomain: 'tableau-etudiants-js.firebaseapp.com',
  projectId: 'tableau-etudiants-js',
  storageBucket: 'tableau-etudiants-js.appspot.com',
  messagingSenderId: '1001595403570',
  appId: '1:1001595403570:web:417a33a53b2113c035ab2b',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  let carteNombreAge = document.getElementById('carteNombreAge');
  let carteSommeAge = document.getElementById('carteSommeAge');
  let carteNombreNote = document.getElementById('carteNombreNote');
  let carteSommeNote = document.getElementById('carteSommeNote');

  let exampleModal = document.querySelector('#exampleModal');
  let forModal = document.querySelector('.forModal');
  let modalNom = document.getElementById('modalNom');
  let modalPrenom = document.getElementById('modalPrenom');
  let modalAge = document.querySelector('#modalAge');
  let modalNote = document.querySelector('#modalNote');
  let butonSave = document.querySelector('#butonSave');
  let idCounter = 0;

  const tab = [];
  let page = 5;
  let stars = 0;
  let actuelPage = 1;
  let maxPage = Math.ceil(tab.length / page);

  forModal.addEventListener('click', () => {
    $(exampleModal).modal('show');
  });

  butonSave.addEventListener('click', addNewEntry);

  async function addNewEntry() {
    let nom = modalNom.value;
    let prenom = modalPrenom.value;
    let age = parseInt(modalAge.value);
    let note = parseFloat(modalNote.value);
    let moy = parseFloat(modalNote.value);

    if (nom && prenom && !isNaN(age) && !isNaN(note)) {
      try {
        const docRef = await addDoc(collection(db, 'users'), {
          nom: nom,
          prenom: prenom,
          age: age,
          note: note,
          moy: moy,
        });
        tab.push({
          id: docRef.id,
          nom: nom,
          prenom: prenom,
          age: age,
          note: note,
          moy: moy,
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }

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

  async function fetchEntries() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      tab.push({ id: doc.id, ...doc.data() });
    });
    showTab();
    carte();
    lamoyenne();
  }

  async function updateEntry(id, updatedData) {
    const entryDoc = doc(db, 'users', id);
    await updateDoc(entryDoc, updatedData);
  }

  async function deleteEntry(id) {
    await deleteDoc(doc(db, 'users', id));
  }

  function showTab() {
    let table = `<table><thead><tr><th>Nom</th><th>Prénom</th><th>Âge</th><th>Note</th><th>Moyenne</th><th>Autres</th></tr></thead><tbody>`;
    for (let i = stars; i < stars + page && i < tab.length; i++) {
      let tabs = tab[i];
      let row = `
        <tr data-id="${tabs.id}">
          <td>${tabs.nom}</td>
          <td>${tabs.prenom}</td>
          <td>${tabs.age}</td>
          <td>${tabs.note}</td>
          <td>${tabs.moy}</td>
          <td>
            <button class="modif">Modifier</button>
            <button class="sup">Supprimer</button>
          </td>
        </tr>`;
      table += row;
    }
    table += '</tbody></table>';
    document.querySelector('.affichage').innerHTML = table;

    item();
    document.querySelectorAll('.sup').forEach((button) => {
      button.addEventListener('click', async function () {
        let row = button.closest('tr');
        let id = row.getAttribute('data-id');
        await deleteEntry(id);
        tab.splice(
          tab.findIndex((item) => item.id == id),
          1
        );
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
        butonSave.addEventListener('click', async function saveEdit() {
          entry.nom = modalNom.value;
          entry.prenom = modalPrenom.value;
          entry.age = parseInt(modalAge.value);
          entry.note = parseFloat(modalNote.value);
          entry.moy = parseFloat(modalNote.value);

          await updateEntry(id, {
            nom: entry.nom,
            prenom: entry.prenom,
            age: entry.age,
            note: entry.note,
            moy: entry.moy,
          });

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

  fetchEntries();

  function carte() {
    let NombreAge = 0;
    function cardNombreAge() {
      for (let i = 0; i < tab.length; i++) {
        NombreAge += tab[i].age;
      }
      carteSommeAge.innerHTML = NombreAge;
    }
    cardNombreAge();

    let SommeNote = 0;
    function cardSommeNote() {
      for (let i = 0; i < tab.length; i++) {
        SommeNote += tab[i].note;
      }
      carteSommeNote.innerHTML = SommeNote.toFixed(2);
    }
    cardSommeNote();

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

  function lamoyenne() {
    let sommeMoy = 0;
    for (let j = 0; j < tab.length; j++) {
      sommeMoy += tab[j].note / tab.length;
    }
    let somfixeTwo = sommeMoy.toFixed(2);
    document.querySelector(
      '#moyenne'
    ).innerText = `la moyenne des étudiants est : ${somfixeTwo}`;
  }

  lamoyenne();

  function first() {
    stars = 0;
    actuelPage = 1;
    showTab();
  }

  function end() {
    maxPage = Math.ceil(tab.length / page);
    stars = (maxPage - 1) * page;
    actuelPage = maxPage;
    showTab();
  }

  function next() {
    if (stars + page <= tab.length) {
      stars += page;
      actuelPage++;
      showTab();
    }
  }

  function prev() {
    if (stars - page >= 0) {
      stars -= page;
      actuelPage--;
      showTab();
    }
  }

  function item() {
    maxPage = Math.ceil(tab.length / page);
    document.getElementById(
      'item'
    ).innerHTML = ` page ${actuelPage} / ${maxPage} `;
  }

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
});
