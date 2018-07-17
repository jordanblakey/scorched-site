// MODULES /////////////////////////////////////////////////////////////////////
import './modules/firebase-init'
import './modules/macy'
import { getAuthStatus } from './modules/auth'

// COMPONENTS //////////////////////////////////////////////////////////////////
import renderEditor from './components/editor'
import './components/file-uploader'
import DBExplorer from './components/database-explorer'

import initTextarea from './components/steganography'
import Scorch from './components/scorch'

// HANDLE AUTH /////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
  let s = document.querySelector('#splash')
  s ? s.classList.add('hidden') : null
  getAuthStatus()
  sessionStorage.getItem('user') ? renderPage() : null
})

////////////////////////////////////////////////////////////////////////////////
// ALIASES
////////////////////////////////////////////////////////////////////////////////
document.qs = sel => document.querySelector(sel)
document.qsa = sel => document.querySelectorAll(sel)

////////////////////////////////////////////////////////////////////////////////
// RENDER PAGE
////////////////////////////////////////////////////////////////////////////////

export function renderPage() {
  let editorContainer = document.querySelector('#editor-container')
  renderEditor(editorContainer)

  DBExplorer.init()
  Scorch.init()
  initTextarea()

  // let saveNote
  // let noteContainer = document.querySelector('#noteContainer')
  // noteContainer.innerHTML = '<h2>All Notes</h2>'
  // renderNotes(noteContainer)

  // let stegoContainer = document.querySelector('#stegoContainer')
  // renderSteganography(stegoContainer)

  // let extrasContainer = document.querySelector('#extrasContainer')
  // extrasContainer.innerHTML = '<h2>Unfinished Features</h2>'
  // fileUploader(extrasContainer)
  // scratchPad(extrasContainer)
  // renderRealtimeDatabaseExplorer(extrasContainer)
  // renderScorch(extrasContainer)
}

////////////////////////////////////////////////////////////////////////////////
// RENDER NOTES
////////////////////////////////////////////////////////////////////////////////

// async function renderNotes(targetElem) {
//   let docList = []
//   let ref = firebase.firestore().collection('notes')

//   await ref.get().then(snap => snap.docs.forEach(doc => docList.push(doc.id)))
//   await docList.forEach(async doc => {
//     ref
//       .doc(doc)
//       .get()
//       .then(snap => {
//         targetElem.innerHTML += `
//           <div class="note" id="${doc}">
//             <div class="noteHeader">
//               <h1 class="title" contenteditable="true" onblur="console.log(this.innerHTML)">${
//                 snap.data().title
//               }</h1>
//               <div>
//                 <button class="noteButton" onclick="updateNote('${doc}')">🖉</button>
//                 <button class="noteButton delete" onclick="deleteNote('${doc}')">🗑️</button>
//               </div>
//             </div>

//             <p class="body" contenteditable="true" onblur="console.log(this.innerHTML)">${
//               snap.data().body
//             }</p>
//             <code class="createdAt">${snap.data().createdAt}</code>
//           </div>
//         `
//       })
//   })
// }

// ////////////////////////////////////////////////////////////////////////////////
// // UPDATE NOTE
// ////////////////////////////////////////////////////////////////////////////////

// function updateNote(docId) {
//   let elem = document.querySelector('.updateForm.' + docId)
//   if (elem !== null) {
//     elem.parentNode.removeChild(elem)
//   } else {
//     document.querySelector('#' + docId).innerHTML += `
//       <div class="updateForm ${docId}">
//         <input class="${docId} updateTitle" type="text" placeholder="Update note title">
//         <input class="${docId} updateBody" type="text" placeholder="Update note body">
//         <button class="${docId} updateCreatedAt" type="text">Update timestamp</button>
//       </div>
//     `

//     let Note = firebase
//       .firestore()
//       .collection('notes')
//       .doc(docId)

//     document.querySelector('.updateTitle.' + docId).onkeyup = e =>
//       Note.update({ title: e.target.value })
//     document.querySelector('.updateBody.' + docId).onkeyup = e =>
//       Note.update({ body: e.target.value })
//     document.querySelector('.updateCreatedAt.' + docId).onclick = () =>
//       Note.update({ createdAt: Date(Date.now()).toString() })

//     Note.onSnapshot(doc => {
//       let data = doc.data()
//       document.querySelector('#' + docId + ' .title').innerHTML = data.title
//       document.querySelector('#' + docId + ' .body').innerHTML = data.body
//       document.querySelector('#' + docId + ' .createdAt').innerHTML =
//         data.createdAt
//     })
//   }
// }

// ////////////////////////////////////////////////////////////////////////////////
// // DELETE NOTE
// ////////////////////////////////////////////////////////////////////////////////

// function deleteNote(docId) {
//   let elem = document.querySelector('#' + docId)
//   elem.parentNode.removeChild(elem)
//   console.log(elem, ' was not removed from Firestore...yet.')

//   let Note = firebase
//     .firestore()
//     .collection('notes')
//     .doc(docId)

//   Note.delete()
//     .then(function() {
//       console.log('Document successfully deleted!')
//     })
//     .catch(function(error) {
//       console.error('Error removing document: ', error)
//     })
// }
