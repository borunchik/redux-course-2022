import {applyMiddleware, createStore, compose} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import {rootReducer} from './redux/rootReducer'
import {asyncIncrement, changeTheme, decrement, increment} from './redux/actions'
import './styles.css'


import {globalStore} from "./components/store.js"

/* custom components */
import {WordsEditor} from "./components/wordsEditor.js";
window.customElements.define("words-editor", WordsEditor);

import {ItemsList} from "./components/itemsList.js";
window.customElements.define("items-list", ItemsList);



document.addEventListener("DOMContentLoaded", () => {
  const wordsEditor = document.querySelector("words-editor");
  wordsEditor.store = globalStore;


  const wordsList = document.querySelector("items-list#wordsList1");
  wordsList.store = globalStore;

  const wordsList2 = document.querySelector("items-list#wordsList2");
  wordsList2.store = globalStore;

});





const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

// function logger(state) {
//   return function(next) {
//     return function(action) {
//       console.log('Prev State', state.getState())
//       console.log('Action', action)
//       const newState = next(action)
//       console.log('New State', newState)
//       return newState
//     }
//   }
// }

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk, logger),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// )

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
)

addBtn.addEventListener('click', () => {
  store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
  store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
  store.dispatch(asyncIncrement())
})

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light')
    ? 'dark'
    : 'light'
  store.dispatch(changeTheme(newTheme))
})


store.subscribe(() => {
  const state = store.getState()

  counter.textContent = state.counter
  document.body.className = state.theme.value;

  [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
    btn.disabled = state.theme.disabled
  })
})

store.dispatch({ type: 'INIT_APPLICATION' })
